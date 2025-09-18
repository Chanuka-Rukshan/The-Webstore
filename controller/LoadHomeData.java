package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.Product;
import hibernate.Quality;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadHomeData", urlPatterns = {"/LoadHomeData"})
public class LoadHomeData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        Criteria c1 = s.createCriteria(Product.class);
        c1.addOrder(Order.desc("id"));
        c1.setFirstResult(0);
        c1.setMaxResults(5);

        Criteria c2 = s.createCriteria(Quality.class);
        c2.add(Restrictions.eq("name", "Brand New"));
        Quality quality = (Quality) c2.uniqueResult();

        c1.add(Restrictions.eq("quality", quality));

        Criteria c3 = s.createCriteria(Product.class);
        c3.addOrder(Order.desc("id"));
        c3.add(Restrictions.eq("sShipping", "0"));
        c3.setFirstResult(0);
        c3.setMaxResults(5);

        Criteria c4 = s.createCriteria(Product.class);
        c4.addOrder(Order.desc("id"));
        c4.setFirstResult(0);
        c4.setMaxResults(10);

        List<Product> productList = c1.list();
        for (Product product : productList) {
            product.setUser(null);
        }
        List<Product> productFreeList = c3.list();
        for (Product product : productFreeList) {
            product.setUser(null);
        }
        List<Product> productAllList = c4.list();
        for (Product product : productAllList) {
            product.setUser(null);
        }

        responseObject.add("productList", gson.toJsonTree(productList));
        responseObject.add("productFreeList", gson.toJsonTree(productFreeList));
        responseObject.add("productAllList", gson.toJsonTree(productAllList));

        responseObject.addProperty("status", true);
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }

}
