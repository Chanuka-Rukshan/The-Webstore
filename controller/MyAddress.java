package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Address;
import hibernate.City;
import hibernate.Country;
import hibernate.HibernateUtil;
import hibernate.Status;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "MyAddress", urlPatterns = {"/MyAddress"})
public class MyAddress extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject addressData = gson.fromJson(request.getReader(), JsonObject.class);

        String address = addressData.get("address").getAsString();
        String postalCode = addressData.get("postalCode").getAsString();
        String country = addressData.get("country").getAsString();
        String city = addressData.get("city").getAsString();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        if (request.getSession().getAttribute("user") == null) {
            responseObject.addProperty("message", "Please sign in!");
        } else if (address.isEmpty()) {
            responseObject.addProperty("message", "address can not be empty!");
        } else if (postalCode.isEmpty()) {
            responseObject.addProperty("message", "postal code can not be empty!");
        } else if (!Util.isInteger(postalCode)) {
            responseObject.addProperty("message", "Invalid postal code!");
        } else if (!Util.isInteger(country)) {
            responseObject.addProperty("message", "Invalid country!");
        } else if (Integer.parseInt(country) == 0) {
            responseObject.addProperty("message", "Please select a valid country");
        } else if (!Util.isInteger(city)) {
            responseObject.addProperty("message", "Invalid city!");
        } else if (Integer.parseInt(city) == 0) {
            responseObject.addProperty("message", "Please select a valid city");
        } else {

            User user = (User) request.getSession().getAttribute("user");
            Criteria c12 = s.createCriteria(Address.class);
            c12.add(Restrictions.eq("user", user));
            c12.add(Restrictions.eq("address", address));

            if (c12.list().isEmpty()) {
                Address a = new Address();
                a.setAddress(address);
                a.setPostalCode(postalCode);
                
                Country countryId = (Country) s.get(Country.class, Integer.parseInt(country));
                a.setCountry(countryId);
                City cityId = (City) s.get(City.class, Integer.parseInt(city));
                a.setCity(cityId);
                
                Status status = (Status)s.get(Status.class, 1);
                a.setStatus(status);
                

                Criteria c1 = s.createCriteria(User.class);
                c1.add(Restrictions.eq("email", user.getEmail()));
                User u1 = (User) c1.uniqueResult();

                a.setUser(u1);
                s.save(a);
                s.beginTransaction().commit();

                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "User profile details update successfully!");
                s.close();
            } else {
                responseObject.addProperty("message", "Address has Alrady added!");
            }

        }
        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);

    }

}
