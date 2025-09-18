
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.City;
import hibernate.Country;
import hibernate.HibernateUtil;
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


@WebServlet(name = "LoadCountry", urlPatterns = {"/LoadCountry"})
public class LoadCountry extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        
        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();
        
        //get Country
        Criteria c = s.createCriteria(Country.class);
        List<Country> countryList = c.list();
        
        //getCity
        Criteria c1 = s.createCriteria(City.class);
        List<City> cityList = c1.list();
        
        Gson gson = new Gson();
        responseObject.add("countryList", gson.toJsonTree(countryList));
        responseObject.add("cityList", gson.toJsonTree(cityList));
        responseObject.addProperty("status", true);
        
        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);
        s.close();
         
    }

 

}
