package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import hibernate.UserStatus;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Mail;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject user = gson.fromJson(request.getReader(), JsonObject.class);

        String fname = user.get("fname").getAsString();
        String lname = user.get("lname").getAsString();
        final String email = user.get("email").getAsString();
        String mobile = user.get("mobile").getAsString();
        String password = user.get("password").getAsString();
        String conformPassword = user.get("conformPassword").getAsString();
        boolean check = user.get("check").getAsBoolean();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (fname.isEmpty()) {
            responseObject.addProperty("message", "First name cannot be empty!");

        } else if (fname.length() > 20) {
            responseObject.addProperty("message", "First name cannot be longer than 20 characters!");

        } else if (lname.isEmpty()) {
            responseObject.addProperty("message", "Last name cannot be empty!");

        } else if (lname.length() > 20) {
            responseObject.addProperty("message", "Last name cannot be longer than 20 characters!");

        } else if (email.isEmpty()) {
            responseObject.addProperty("message", "Email cannot be empty!");

        } else if (!Util.isEmailValid(email)) {
            responseObject.addProperty("message", "Email is not valid!");

        } else if (mobile.isEmpty()) {
            responseObject.addProperty("message", "Mobile number cannot be empty!");

        } else if (!Util.isMobileValidate(mobile)) {
            responseObject.addProperty("message", "Mobile number is not valid!");

        } else if (password.isEmpty()) {
            responseObject.addProperty("message", "Password cannot be empty!");

        } else if (!Util.isPasswordValid(password)) {
            responseObject.addProperty("message", "The password must contains at least uppercase, lowecase,"
                    + " number, special character and to be minimum eight characters long!");

        } else if (conformPassword.isEmpty()) {
            responseObject.addProperty("message", "Confirm Password cannot be empty!");

        } else if (!Util.isPasswordValid(conformPassword)) {
            responseObject.addProperty("message", "The password must contains at least uppercase, lowecase,"
                    + " number, special character and to be minimum eight characters long!");

        } else if (!password.equals(conformPassword)) {
            responseObject.addProperty("message", "Passwords do not match!");

        } else if (!check) {
            responseObject.addProperty("message", "You must agree to the terms!");

        } else {
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            Session s = sessionFactory.openSession();

            Criteria criteria = s.createCriteria(User.class);

            criteria.add(Restrictions.eq("email", email));

            if (!criteria.list().isEmpty()) {
                responseObject.addProperty("message", "User with this Email already exists!!");
            } else {
                User u = new User();
                u.setFname(fname);
                u.setLname(lname);
                u.setEmail(email);
                u.setMobile(mobile);
                u.setPassword(conformPassword);

                // verification code
                final String verificationCode = Util.generateCode();
                u.setVerification(verificationCode);

                u.setReg_date(new Date());
                UserStatus status = (UserStatus) s.get(UserStatus.class, 1);
                u.setUserStatus(status);
                s.save(u);
                s.beginTransaction().commit();
                //hibernate save

                //send mail
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Mail.sendMail(email, "The Webstore - Verification", "<h1>" + verificationCode + "</h1>");
                    }
                }).start();
                //send mail end

                HttpSession ses = request.getSession();
                ses.setAttribute("email", email);

                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "Registration success. Please check your email for the verfication code");

            }
            s.close();
        }
        String responseText = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(responseText);

    }

}
