package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Brand;
import hibernate.Category;
import hibernate.Color;
import hibernate.HibernateUtil;
import hibernate.Model;
import hibernate.Product;
import hibernate.Quality;
import hibernate.Storage;
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
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SearchProducts", urlPatterns = {"/SearchProducts"})
public class SearchProducts extends HttpServlet {

    private static final int MAX_RESULT = 6;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resposeObject = new JsonObject();
        resposeObject.addProperty("status", false);

        JsonObject requestJsonObject = gson.fromJson(request.getReader(), JsonObject.class);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        Criteria c1 = s.createCriteria(Product.class);

        if (requestJsonObject.has("categoryName")) {
            String categoryName = requestJsonObject.get("categoryName").getAsString();

            //get Category
            Criteria c2 = s.createCriteria(Category.class);
            c2.add(Restrictions.eq("name", categoryName));
            Category category = (Category) c2.uniqueResult();

            c1.add(Restrictions.eq("category", category));

        }

        if (requestJsonObject.has("brandName")) {
            String brandName = requestJsonObject.get("brandName").getAsString();

            //get Brand
            Criteria c3 = s.createCriteria(Brand.class);
            c3.add(Restrictions.eq("name", brandName));
            Brand brand = (Brand) c3.uniqueResult();

            c1.add(Restrictions.eq("brand", brand));
        }

        if (requestJsonObject.has("colorName")) {

            String colorName = requestJsonObject.get("colorName").getAsString();
            Criteria c4 = s.createCriteria(Color.class);
            c4.add(Restrictions.eq("name", colorName));
            Color color = (Color) c4.uniqueResult();

            c1.add(Restrictions.eq("color", color));
        }

        if (requestJsonObject.has("qualityName")) {
            String qualityName = requestJsonObject.get("qualityName").getAsString();

            Criteria c5 = s.createCriteria(Quality.class);
            c5.add(Restrictions.eq("name", qualityName));
            Quality quality = (Quality) c5.uniqueResult();

            c1.add(Restrictions.eq("quality", quality));
        }

        if (requestJsonObject.has("storageName")) {
            String storageName = requestJsonObject.get("storageName").getAsString();

            Criteria c6 = s.createCriteria(Storage.class);
            c6.add(Restrictions.eq("value", storageName));
            Storage storage = (Storage) c6.uniqueResult();

            c1.add(Restrictions.eq("storage", storage));
        }

        resposeObject.addProperty("allProductCount", c1.list().size());

        if (requestJsonObject.has("firstResult")) {
            int firstResult = requestJsonObject.get("firstResult").getAsInt();
            c1.setFirstResult(firstResult);
            c1.setMaxResults(SearchProducts.MAX_RESULT);
        }

        List<Product> productList = c1.list();
        for (Product product : productList) {
            product.setUser(null);
        }

        s.close();

        resposeObject.add("productList", gson.toJsonTree(productList));
        resposeObject.addProperty("status", true);
        response.setContentType("application/json");
        String toJson = gson.toJson(resposeObject);
        response.getWriter().write(toJson);

    }

}
