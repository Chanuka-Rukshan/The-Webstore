package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Address;
import hibernate.HibernateUtil;
import hibernate.Status;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "DeleteAddress", urlPatterns = {"/DeleteAddress"})
public class DeleteAddress extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resJsonObject = gson.fromJson(request.getReader(), JsonObject.class);

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        int addressId = resJsonObject.get("addressId").getAsInt();

        System.out.println(addressId);

        Address a = (Address) s.get(Address.class, addressId);

        Status status = (Status) s.get(Status.class, 2);
        a.setStatus(status);

        s.update(a);
        s.beginTransaction().commit();

        responseObject.addProperty("status", true);
        responseObject.addProperty("message", "Address Detete Successfull!");

        s.close();

        String responseText = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(responseText);

    }

}
