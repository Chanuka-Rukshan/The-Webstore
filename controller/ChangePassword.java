package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Mail;
import model.Util;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

@WebServlet(name = "ChangePassword", urlPatterns = {"/ChangePassword"})
public class ChangePassword extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject changePasswordData = gson.fromJson(request.getReader(), JsonObject.class);

        String newPassword = changePasswordData.get("newPassword").getAsString();
        String conformPassword = changePasswordData.get("conformPassword").getAsString();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        HttpSession session = request.getSession();

        if (newPassword.isEmpty()) {
            responseObject.addProperty("message", "New password cannot be empty!");
        } else if (!Util.isPasswordValid(newPassword)) {
            responseObject.addProperty("message", "Invalid new password!");
        } else if (conformPassword.isEmpty()) {
            responseObject.addProperty("message", "Confirm password cannot be empty!");
        } else if (!Util.isPasswordValid(conformPassword)) {
            responseObject.addProperty("message", "Invalid confirm password!");
        } else if (!newPassword.equals(conformPassword)) {
            responseObject.addProperty("message", "Passwords do not match!");
        } else {

            session.setAttribute("conformPassword", conformPassword);

            User user = (User) session.getAttribute("user");
            final String email = user.getEmail();

            session.setAttribute("email", email);
            //verification code
            final String otp = Util.generateCode();

            user.setOtp(otp);

            s.update(user);
            s.beginTransaction().commit();

            //send mail
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Mail.sendMail(email, "The Webstore - Verification", "<h1>" + otp + "</h1>");
                }
            }).start();
            //send mail end

            responseObject.addProperty("status", true);
            responseObject.addProperty("message", "Please check your email for the verfication code");
        }
        s.close();

        String responseText = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(responseText);

    }

}
