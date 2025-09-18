package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "setOrderPrice", urlPatterns = {"/setOrderPrice"})
public class setOrderPrice extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        HttpSession ses = request.getSession();

        if (ses.getAttribute("email") == null) {
            responseObject.addProperty("message", "1");
        } else {

            String order_total = ses.getAttribute("order_total").toString();
            String order_shipping = ses.getAttribute("order_shipping").toString();
            String order_subtotal = ses.getAttribute("order_subtotal").toString();
            responseObject.addProperty("order_total", order_total); 
            responseObject.addProperty("order_shipping", order_shipping); 
            responseObject.addProperty("order_subtotal", order_subtotal); 
            responseObject.addProperty("status", true);
        }

        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);
    }

}
