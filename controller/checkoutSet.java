package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "checkoutSet", urlPatterns = {"/checkoutSet"})
public class checkoutSet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject checkOut = gson.fromJson(request.getReader(), JsonObject.class);

        String order_total = checkOut.get("order_total").getAsString();
        String order_shipping = checkOut.get("order_shipping").getAsString();
        String order_subtotal = checkOut.get("order_subtotal").getAsString();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        HttpSession session = request.getSession();

        User user = (User) session.getAttribute("user");
        final String email = user.getEmail();

        session.setAttribute("email", email);
        session.setAttribute("order_total", order_total);
        session.setAttribute("order_shipping", order_shipping);
        session.setAttribute("order_subtotal", order_subtotal);

        responseObject.addProperty("status", true);

        String responseText = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(responseText);

    }

}
