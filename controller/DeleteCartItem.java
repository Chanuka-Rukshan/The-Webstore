package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Cart;
import hibernate.HibernateUtil;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

@WebServlet(name = "DeleteCartItem", urlPatterns = {"/DeleteCartItem"})
public class DeleteCartItem extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resJsonObject = gson.fromJson(request.getReader(), JsonObject.class);


        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        int cartId = resJsonObject.get("cartId").getAsInt();
        
        Cart c = new Cart();
        c.setId(cartId);
        
        s.delete(c);
        s.beginTransaction().commit();
        
        
        
        responseObject.addProperty("status", true);
        responseObject.addProperty("message", "Cart Item Delete Successfull");

        s.close();

        String responseText = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(responseText);
    }

}
