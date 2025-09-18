package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Gender;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "MyProfileDetails", urlPatterns = {"/MyProfileDetails"})
public class MyProfileDetails extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession ses = request.getSession(false);

        if (ses != null && ses.getAttribute("user") != null) {

            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();

            User user = (User) ses.getAttribute("user");

            User freshUser = (User) s.get(User.class, user.getId());

            ses.setAttribute("user", freshUser);

            JsonObject responseObject = new JsonObject();
            responseObject.addProperty("fname", user.getFname());
            responseObject.addProperty("lname", user.getLname());
            responseObject.addProperty("email", user.getEmail());
            responseObject.addProperty("mobile", user.getMobile());

            if (freshUser.getGender() != null) {
                responseObject.addProperty("selectedGenderId", freshUser.getGender().getId());
            } else {
                responseObject.addProperty("selectedGenderId", 0); // or any fallback
            }

            Gson gson = new Gson();
            String toJson = gson.toJson(responseObject);

            response.setContentType("application/json");
            response.getWriter().write(toJson);

        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject userData = gson.fromJson(request.getReader(), JsonObject.class);

        String fname = userData.get("fname").getAsString();
        String lname = userData.get("lname").getAsString();
        String email = userData.get("email").getAsString();
        String mobile = userData.get("mobile").getAsString();
        int genderId = userData.get("gender").getAsInt();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (fname.isEmpty()) {
            responseObject.addProperty("message", "First name cannot be empty!");

        } else if (fname.length() > 20) {
            responseObject.addProperty("message", "First name cannot be longer than 20 characters!");

        } else if (lname.isEmpty()) {
            responseObject.addProperty("message", "Last name cannot be empty!");

        } else if (lname.length() > 20) {
            responseObject.addProperty("message", "Last name cannot be longer than 20 characters!");

        } else if (email.isEmpty()) {
            responseObject.addProperty("message", "Email cannot be empty!");

        } else if (!Util.isEmailValid(email)) {
            responseObject.addProperty("message", "Email is not valid!");

        } else if (mobile.isEmpty()) {
            responseObject.addProperty("message", "Mobile number cannot be empty!");

        } else if (!Util.isMobileValidate(mobile)) {
            responseObject.addProperty("message", "Mobile number is not valid!");

        } else if (genderId == 0) {
            responseObject.addProperty("message", "Select Your Gender");
        } else {
            HttpSession ses = request.getSession();

            if (ses.getAttribute("user") != null) {
                User u = (User) ses.getAttribute("user");

                SessionFactory sf = HibernateUtil.getSessionFactory();
                Session s = sf.openSession();

                Criteria c = s.createCriteria(User.class);
                c.add(Restrictions.eq("email", u.getEmail()));

                if (!c.list().isEmpty()) {
                    User u1 = (User) c.list().get(0); //db user

                    u1.setFname(fname);
                    u1.setLname(lname);
                    u1.setMobile(mobile);

                    Gender gender = (Gender) s.load(Gender.class, genderId);

                    u1.setGender(gender);

                    ses.setAttribute("user", u1);

                    s.update(u1);

                    s.beginTransaction().commit();
                    responseObject.addProperty("status", true);
                    responseObject.addProperty("message", "User profile details update successfully!");
                    s.close();
                }
            }
        }

        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);

    }

}
