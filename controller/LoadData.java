package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Brand;
import hibernate.Category;
import hibernate.Color;
import hibernate.HibernateUtil;
import hibernate.Product;
import hibernate.Quality;
import hibernate.Storage;
import java.io.IOException;
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
import org.hibernate.criterion.Projections;

@WebServlet(name = "LoadData", urlPatterns = {"/LoadData"})
public class LoadData extends HttpServlet {

    private static final int MAX_RESULT = 6;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        Gson gson = new Gson();
        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();

        try {
            // Get pagination parameters from request (optional)
            int firstResult = 0;
            String firstResultParam = request.getParameter("firstResult");
            if (firstResultParam != null) {
                try {
                    firstResult = Integer.parseInt(firstResultParam);
                } catch (NumberFormatException e) {
                    firstResult = 0;
                }
            }

            // Load categories, brands, colors, quality, storage
            Criteria c1 = session.createCriteria(Category.class);
            List<Category> categoryList = c1.list();

            Criteria c2 = session.createCriteria(Brand.class);
            List<Brand> brandList = c2.list();

            Criteria c3 = session.createCriteria(Color.class);
            List<Color> colorList = c3.list();

            Criteria c4 = session.createCriteria(Quality.class);
            List<Quality> qualityList = c4.list();

            Criteria c5 = session.createCriteria(Storage.class);
            List<Storage> storageList = c5.list();

            // Get total count of products (for pagination)
            Criteria countCriteria = session.createCriteria(Product.class);
            countCriteria.setProjection(Projections.rowCount());
            Long totalCount = (Long) countCriteria.uniqueResult();
            responseObject.addProperty("totalProductCount", totalCount.intValue());

            // Load products with pagination
            Criteria c6 = session.createCriteria(Product.class);
            c6.addOrder(Order.desc("id"));
            c6.setFirstResult(firstResult);
            c6.setMaxResults(MAX_RESULT);

            List<Product> productList = c6.list();

            // Remove user details (optional)
            for (Product product : productList) {
                product.setUser(null);
            }

            // Put all data to response
            responseObject.add("categoryList", gson.toJsonTree(categoryList));
            responseObject.add("brandList", gson.toJsonTree(brandList));
            responseObject.add("colorList", gson.toJsonTree(colorList));
            responseObject.add("qualityList", gson.toJsonTree(qualityList));
            responseObject.add("storageList", gson.toJsonTree(storageList));
            responseObject.add("productList", gson.toJsonTree(productList));

            responseObject.addProperty("status", true);

        } catch (Exception e) {
            e.printStackTrace();
            responseObject.addProperty("status", false);
        } finally {
            session.close();
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }

}
