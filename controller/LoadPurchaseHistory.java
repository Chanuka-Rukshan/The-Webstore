package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.OrderItems;
import hibernate.Orders;
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

@WebServlet(name = "LoadPurchaseHistory", urlPatterns = {"/LoadPurchaseHistory"})
public class LoadPurchaseHistory extends HttpServlet {

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

            Criteria c1 = s.createCriteria(Orders.class);
            c1.add(Restrictions.eq("user", user));
            List<Orders> ordersList = c1.list();

            List<OrderItems> allOrderItems = new ArrayList<>();

            for (Orders order : ordersList) {
                Criteria c2 = s.createCriteria(OrderItems.class);
                c2.add(Restrictions.eq("order", order));
                List<OrderItems> items = c2.list();
                allOrderItems.addAll(items);
            }

            JsonObject data = new JsonObject();
            data.add("orders", gson.toJsonTree(ordersList));
            data.add("orderItems", gson.toJsonTree(allOrderItems));

            responseObject.add("data", data);
            responseObject.addProperty("status", true);

        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
}
