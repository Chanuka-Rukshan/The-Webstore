package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Address;
import hibernate.Cart;
import hibernate.HibernateUtil;
import hibernate.Status;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadShippingAddress", urlPatterns = {"/LoadShippingAddress"})
public class LoadShippingAddress extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        User user = (User) request.getSession().getAttribute("user");
        if (user != null) {
            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
            
            Status status = (Status) s.get(Status.class, 1);

            Criteria c1 = s.createCriteria(Address.class);
            c1.add(Restrictions.eq("user", user));
            c1.add(Restrictions.eq("status", status));
            List<Address> addressList = c1.list();

            Criteria c2 = s.createCriteria(Cart.class);
            c2.add(Restrictions.eq("user", user));
            List<Cart> cartList = c2.list();
            if (cartList.isEmpty()) {
                responseObject.addProperty("message", "empty-cart");
            } else {
                for (Cart cart : cartList) {
                    cart.setUser(null);
                    cart.getProduct().setUser(null);
                }
                responseObject.add("cartList", gson.toJsonTree(cartList));
                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "Cart successfully loaded");
            }

            if (addressList.isEmpty()) {
                responseObject.addProperty("message", "Your Shipping Address is empty...");
            } else {
                for (Address address : addressList) {
                    address.setUser(user);
                }
                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "Shipping Address successfully loded");
                responseObject.add("addressItems", gson.toJsonTree(addressList));
            }
        } else {
            ArrayList<Address> sessionAddresses = (ArrayList<Address>) request.getSession().getAttribute("sessionAddress");

            if (sessionAddresses != null) {
                if (sessionAddresses.isEmpty()) {
                    responseObject.addProperty("message", "Your Shipping Address is empty...");
                } else {
                    for (Address sessionAddress : sessionAddresses) {
                        sessionAddress.setUser(null); // avoid circular reference
                    }
                    responseObject.addProperty("status", true);
                    responseObject.addProperty("message", "Shipping addresses successfully loaded");
                    responseObject.add("addresses", gson.toJsonTree(sessionAddresses));
                }
            } else {
                responseObject.addProperty("message", "Your Shipping Address is empty...");
            }

        }
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }

}
