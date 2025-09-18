package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import hibernate.Watchlist;
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

@WebServlet(name = "LoadWatchlistItem", urlPatterns = {"/LoadWatchlistItem"})
public class LoadWatchlistItem extends HttpServlet {

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

            Criteria c1 = s.createCriteria(Watchlist.class);
            c1.add(Restrictions.eq("user", user));
            List<Watchlist> watchListList = c1.list();
            if (watchListList.isEmpty()) {
                responseObject.addProperty("message", "Your Watchlist is empty...");
            } else {
                for (Watchlist watchlist : watchListList) {
                    watchlist.getProduct().setUser(user);
                    watchlist.setUser(null);
                }
                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "Watchlist items successfully Loaded");
                responseObject.add("watchlistItems", gson.toJsonTree(watchListList));
            }
        } else {
            ArrayList<Watchlist> sessionWatchlist = (ArrayList<Watchlist>) request.getSession().getAttribute("sessionWatchlist");
            if (sessionWatchlist != null) {
                if (sessionWatchlist.isEmpty()) {
                    responseObject.addProperty("message", "Your Watchlist is empty...");
                } else {
                    for (Watchlist watchlist : sessionWatchlist) {
                        watchlist.getProduct().setUser(null);
                        watchlist.setUser(null);
                    }
                    responseObject.addProperty("status", true);
                    responseObject.addProperty("message", "Cart items successfully Loaded");
                    responseObject.add("watchlistItems", gson.toJsonTree(sessionWatchlist));
                }
            }
        }
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);

    }

}
