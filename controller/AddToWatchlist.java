/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Cart;
import hibernate.HibernateUtil;
import hibernate.Product;
import hibernate.User;
import hibernate.Watchlist;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author K.A.Chanuka Rukshan
 */
@WebServlet(name = "AddToWatchlist", urlPatterns = {"/AddToWatchlist"})
public class AddToWatchlist extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String prId = request.getParameter("prId");
        String qty = request.getParameter("qty");
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (!Util.isInteger(prId)) {
            responseObject.addProperty("message", "Invalid product Id!");
        } else if (!Util.isInteger(qty)) {
            responseObject.addProperty("message", "Invalid product Quantity!");
        }else {
            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
            Transaction tr = s.beginTransaction();

            Product product = (Product) s.get(Product.class, Integer.valueOf(prId));
            if (product == null) {
                responseObject.addProperty("message", "Product not found");
            } else {
                User user = (User) request.getSession().getAttribute("user");
                if (user != null) { 
                    Criteria c1 = s.createCriteria(Watchlist.class);
                    c1.add(Restrictions.eq("user", user));
                    c1.add(Restrictions.eq("product", product));

                    if (c1.list().isEmpty()) {
                        Watchlist w = new Watchlist();
                        w.setQty(Integer.parseInt(qty));
                        w.setProduct(product);
                        w.setUser(user);

                        s.save(w);
                        tr.commit();
                        responseObject.addProperty("status", true);
                        responseObject.addProperty("message", "Product add to Watchlist successfully");
                    } else {
                        responseObject.addProperty("message", "Product Allrady added Watchlist...");
                    }
                } else {
                    HttpSession ses = request.getSession();
                    if (ses.getAttribute("sessWatchlist") == null) {
                        ArrayList<Watchlist> sessWatchlist = new ArrayList<>();
                        Watchlist watchlist = new Watchlist();
                        watchlist.setUser(null);
                        watchlist.setProduct(product);
                        sessWatchlist.add(watchlist);
                        ses.setAttribute("sessWatchlist", sessWatchlist);
                        responseObject.addProperty("status", true);
                        responseObject.addProperty("message", "Product added to the Watchlist");
                    } else {
                        ArrayList<Watchlist> watchlistList = (ArrayList<Watchlist>) ses.getAttribute("sessWatchlist");
                        Watchlist foundWatchlist = null;
                        for (Watchlist watchlist : watchlistList) {
                            if (watchlist.getProduct().getId() == product.getId()) {
                                foundWatchlist = watchlist;
                                break;
                            }

                        }
                        if (foundWatchlist != null) {
                            responseObject.addProperty("message", "Product Allrady added Watchlist...");
                        } else {
                            foundWatchlist = new Watchlist();
                            foundWatchlist.setQty(Integer.parseInt(qty));
                            foundWatchlist.setProduct(product);
                            foundWatchlist.setUser(null);
                            watchlistList.add(foundWatchlist);
                            responseObject.addProperty("status", true);
                            responseObject.addProperty("message", "Product added to the Watchlist");
                        }
                    }
                }

            }
        }
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }
}
