package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Brand;
import hibernate.Category;
import hibernate.Color;
import hibernate.HibernateUtil;
import hibernate.Model;
import hibernate.Product;
import hibernate.ProductStatus;
import hibernate.Quality;
import hibernate.Storage;
import hibernate.User;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.Util;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

@MultipartConfig
@WebServlet(name = "SaveProduct", urlPatterns = {"/SaveProduct"})
public class SaveProduct extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String category = request.getParameter("category");
        String brand = request.getParameter("brand");
        String model = request.getParameter("model");
        String color = request.getParameter("color");
        String storage = request.getParameter("storage");
        String quality = request.getParameter("quality");
        String price = request.getParameter("price");
        String qty = request.getParameter("qty");
        String sShipping = request.getParameter("sShipping");
        String eShipping = request.getParameter("eShipping");
        String oShipping = request.getParameter("oShipping");

        Part part1 = request.getPart("img_1");
        Part part2 = request.getPart("img_2");
        Part part3 = request.getPart("img_3");

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        if (request.getSession().getAttribute("user") == null) {
            responseObject.addProperty("message", "Please sign in!");
        } else if (title.isEmpty()) {
            responseObject.addProperty("message", "Product title is required");
        } else if (title.length() > 100) {
            responseObject.addProperty("message", "Product title must be less than 50 characters");
        } else if (description.isEmpty()) {
            responseObject.addProperty("message", "Product description is required");
        } else if (!Util.isInteger(category)) {
            responseObject.addProperty("message", "Category must be a valid number");
        } else if (Integer.parseInt(category) == 0) {
            responseObject.addProperty("message", "Please select a category");
        } else if (!Util.isInteger(brand)) {
            responseObject.addProperty("message", "Brand must be a valid number");
        } else if (Integer.parseInt(brand) == 0) {
            responseObject.addProperty("message", "Please select a brand");
        } else if (!Util.isInteger(model)) {
            responseObject.addProperty("message", "Model must be a valid number");
        } else if (Integer.parseInt(model) == 0) {
            responseObject.addProperty("message", "Please select a model");
        } else if (!Util.isInteger(color)) {
            responseObject.addProperty("message", "Color must be a valid number");
        } else if (Integer.parseInt(color) == 0) {
            responseObject.addProperty("message", "Please select a color");
        } else if (!Util.isInteger(storage)) {
            responseObject.addProperty("message", "Storage must be a valid number");
        } else if (Integer.parseInt(storage) == 0) {
            responseObject.addProperty("message", "Please select a storage option");
        } else if (!Util.isInteger(quality)) {
            responseObject.addProperty("message", "Quality must be a valid number");
        } else if (Integer.parseInt(quality) == 0) {
            responseObject.addProperty("message", "Please select a quality");
        } else if (price.isEmpty()) {
            responseObject.addProperty("message", "Price is required");
        } else if (!Util.isDouble(price)) {
            responseObject.addProperty("message", "Price must be a valid number");
        } else if (Double.parseDouble(price) <= 0) {
            responseObject.addProperty("message", "Price must be greater than 0");
        } else if (qty.isEmpty()) {
            responseObject.addProperty("message", "Quantity is required");
        } else if (!Util.isInteger(qty)) {
            responseObject.addProperty("message", "Quantity must be a valid number");
        } else if (Integer.parseInt(qty) <= 0) {
            responseObject.addProperty("message", "Quantity must be greater than 0");
        } else if (sShipping.isEmpty()) {
            responseObject.addProperty("message", "Standard shipping cost is required");
        } else if (!Util.isDouble(sShipping)) {
            responseObject.addProperty("message", "Standard shipping must be a valid number");
        } else if (Double.parseDouble(sShipping) < 0) {
            responseObject.addProperty("message", "Standard shipping cost cannot be negative");
        } else if (eShipping.isEmpty()) {
            responseObject.addProperty("message", "Express shipping cost is required");
        } else if (!Util.isDouble(eShipping)) {
            responseObject.addProperty("message", "Express shipping must be a valid number");
        } else if (Double.parseDouble(eShipping) < 0) {
            responseObject.addProperty("message", "Express shipping cost cannot be negative");
        } else if (oShipping.isEmpty()) {
            responseObject.addProperty("message", "Overnight shipping cost is required");
        } else if (!Util.isDouble(oShipping)) {
            responseObject.addProperty("message", "Overnight shipping must be a valid number");
        } else if (Double.parseDouble(oShipping) < 0) {
            responseObject.addProperty("message", "Overnight shipping cost cannot be negative");
        } else if (part1.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image one is required");
        } else if (part2.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image two is required");
        } else if (part3.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image three is required");
        } else {
            Product p = new Product();
            p.setTitle(title);
            p.setDescription(description);

            Category categoryId = (Category) s.get(Category.class, Integer.valueOf(category));
            p.setCategory(categoryId);

            Brand brandId = (Brand) s.get(Brand.class, Integer.valueOf(brand));
            p.setBrand(brandId);

            Model modeId = (Model) s.get(Model.class, Integer.valueOf(model));
            p.setModel(modeId);

            Color colorId = (Color) s.get(Color.class, Integer.valueOf(color));
            p.setColor(colorId);

            Storage storageId = (Storage) s.get(Storage.class, Integer.valueOf(storage));
            p.setStorage(storageId);

            Quality qualityId = (Quality) s.get(Quality.class, Integer.valueOf(quality));
            p.setQuality(qualityId);

            p.setPrice(Double.parseDouble(price));
            p.setQty(Integer.parseInt(qty));
            p.setDate(new Date());
            p.setsShipping(sShipping);
            p.seteShipping(eShipping);
            p.setoShipping(oShipping);

            User user = (User) request.getSession().getAttribute("user");
            p.setUser(user);

            ProductStatus status = (ProductStatus) s.get(ProductStatus.class, Integer.valueOf(1));
            p.setProductStatus(status);

            s.beginTransaction();
            int id = (int) s.save(p);
            s.getTransaction().commit();
            s.close();

            String appPath = getServletContext().getRealPath("");
            String newPath = appPath.replace("build" + File.separator + "web", "web" + File.separator + "products");

            File productFolder = new File(newPath, String.valueOf(id));
            productFolder.mkdir();

            File file1 = new File(productFolder, "img_1.png");
            Files.copy(part1.getInputStream(), file1.toPath(), StandardCopyOption.REPLACE_EXISTING);

            File file2 = new File(productFolder, "img_2.png");
            Files.copy(part2.getInputStream(), file2.toPath(), StandardCopyOption.REPLACE_EXISTING);

            File file3 = new File(productFolder, "img_3.png");
            Files.copy(part3.getInputStream(), file3.toPath(), StandardCopyOption.REPLACE_EXISTING);
            //image uploading
            responseObject.addProperty("message", "Product Added sucessfull");

            responseObject.addProperty("status", true);
        }

        //send response
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
        //send response

    }

}
