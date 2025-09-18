package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Address;
import hibernate.Cart;
import hibernate.HibernateUtil;
import hibernate.OrderItems;
import hibernate.Orders;
import hibernate.Product;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import javax.json.Json;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.PayHere;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "CheckOutProcess", urlPatterns = {"/CheckOutProcess"})
public class CheckOutProcess extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject reqJsonObject = gson.fromJson(request.getReader(), JsonObject.class);
        String fname = reqJsonObject.get("fname").getAsString();
        String lname = reqJsonObject.get("lname").getAsString();
        String mobile = reqJsonObject.get("mobile").getAsString();
        String city = reqJsonObject.get("city").getAsString();

        String postalCode = reqJsonObject.get("postalCode").getAsString();
        String subTotal = reqJsonObject.get("subTotal").getAsString();
        String addressId = reqJsonObject.get("address").getAsString();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        User user = (User) request.getSession().getAttribute("user");

        if (user == null) {
            responseObject.addProperty("message", "Session expired! Please log in again");
        } else {
            Criteria c1 = s.createCriteria(Address.class);
            c1.add(Restrictions.eq("user", user));
            c1.addOrder(Order.desc("id"));

            if (c1.list().isEmpty()) {
                responseObject.addProperty("message",
                        "You current address is not found. Please add a new address");
            } else {
                System.out.println("hello");
                Address address = (Address) c1.list().get(0);
                processCheckout(s, user, address, responseObject, subTotal);
            }
        }

        System.out.println(fname);
        System.out.println(lname);
        System.out.println(mobile);
        System.out.println(city);
        System.out.println(postalCode);
        System.out.println(subTotal);
        System.out.println(addressId);

        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }

    private void processCheckout(Session s,
            User user,
            Address address,
            JsonObject responseObject,
            String subTotal) {
        
        Transaction tr = null;
        try {
            
            tr = s.beginTransaction();
            
            System.out.println("AWooo");
            Orders orders = new Orders();
            orders.setAddress(address);
            orders.setDate(new Date());
            orders.setUser(user);
            orders.setAmount(Double.parseDouble(subTotal));

            int orderId = (int) s.save(orders);

            Criteria c1 = s.createCriteria(Cart.class);
            c1.add(Restrictions.eq("user", user));
            List<Cart> cartList = c1.list();

            String items = "";

            for (Cart cart : cartList) {

                OrderItems orderItems = new OrderItems();
                items += cart.getProduct().getTitle() + " x " + cart.getQty() + ", ";
                Product product = cart.getProduct();

                orderItems.setOrder(orders);
                orderItems.setProduct(product);
                orderItems.setQty(cart.getQty());

                s.save(orderItems);

                product.setQty(product.getQty() - cart.getQty());
                s.update(product);

                s.delete(cart);

            }
            tr.commit();

            //PayHere process
            String merahantID = "1224090";
            String merchantSecret = "MTMxNDU0NDYxMzI2ODM2OTY4MzUwNTE4NTM3MDY3ODc5MzMyMw==";

            String orderID = "#000" + orderId;
            String currency = "LKR";
            String formattedAmount = new DecimalFormat("0.00").format(Double.parseDouble(subTotal));
            String merchantSecretMD5 = PayHere.generateMD5(merchantSecret);

            String hash = PayHere.generateMD5(merahantID + orderID + formattedAmount + currency + merchantSecretMD5);

            JsonObject payHereJson = new JsonObject();
            payHereJson.addProperty("sandbox", true);
            payHereJson.addProperty("merchant_id", merahantID);

            payHereJson.addProperty("return_url", "");
            payHereJson.addProperty("cancel_url", "");
            payHereJson.addProperty("notify_url", "https://73dd4014681e.ngrok-free.app/WebViva/VerifyPayments");

            payHereJson.addProperty("order_id", orderID);
            payHereJson.addProperty("items", items);
            payHereJson.addProperty("amount", formattedAmount);
            payHereJson.addProperty("currency", currency);
            payHereJson.addProperty("hash", hash);

            payHereJson.addProperty("first_name", user.getFname());
            payHereJson.addProperty("last_name", user.getLname());
            payHereJson.addProperty("email", user.getEmail());

            payHereJson.addProperty("phone", user.getMobile());
            payHereJson.addProperty("address", address.getAddress());
            payHereJson.addProperty("city", address.getCity().getName());
            payHereJson.addProperty("country", "Sri Lanka");

            responseObject.addProperty("status", true);
            responseObject.addProperty("message", "Cechkout completed");
            responseObject.add("payhereJson", new Gson().toJsonTree(payHereJson));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
