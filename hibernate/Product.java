
package hibernate;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product implements Serializable{
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "title",length = 100,nullable = false)
    private String title;
    
    @Column(name = "description",nullable = false)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "brand_id",nullable = false)
    private Brand brand;
    
    @ManyToOne
    @JoinColumn(name = "model_id",nullable = false)
    private Model model;
    
    @Column(name = "price",nullable = false)
    private double price;
    
    @Column(name = "qty",nullable = false)
    private int qty;
    
    @Column(name = "date",nullable = false)
    private Date date;
    
    @ManyToOne
    @JoinColumn(name = "color_id",nullable = false)
    private Color color;
    
    @ManyToOne
    @JoinColumn(name = "storage_id",nullable = false)
    private Storage storage;
    
    @ManyToOne
    @JoinColumn(name = "quality_id",nullable = false)
    private Quality quality;
    
    @Column(name = "otp",nullable = true,length = 6)
    private String otp;
    
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_status_id")
    private ProductStatus productStatus;
    
    @Column(name = "standard_shipping",length = 10,nullable = false)
    private String sShipping;
    
    @Column(name = "express_shipping",length = 10,nullable = false)
    private String eShipping;
    
    @Column(name = "overnight_shipping",length = 10,nullable = false)
    private String oShipping;

    public Product() {
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * @return the brand
     */
    public Brand getBrand() {
        return brand;
    }

    /**
     * @param brand the brand to set
     */
    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    /**
     * @return the model
     */
    public Model getModel() {
        return model;
    }

    /**
     * @param model the model to set
     */
    public void setModel(Model model) {
        this.model = model;
    }

    /**
     * @return the price
     */
    public double getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * @return the qty
     */
    public int getQty() {
        return qty;
    }

    /**
     * @param qty the qty to set
     */
    public void setQty(int qty) {
        this.qty = qty;
    }

    /**
     * @return the date
     */
    public Date getDate() {
        return date;
    }

    /**
     * @param date the date to set
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**
     * @return the color
     */
    public Color getColor() {
        return color;
    }

    /**
     * @param color the color to set
     */
    public void setColor(Color color) {
        this.color = color;
    }

    /**
     * @return the storage
     */
    public Storage getStorage() {
        return storage;
    }

    /**
     * @param storage the storage to set
     */
    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    /**
     * @return the quality
     */
    public Quality getQuality() {
        return quality;
    }

    /**
     * @param quality the quality to set
     */
    public void setQuality(Quality quality) {
        this.quality = quality;
    }

    /**
     * @return the otp
     */
    public String getOtp() {
        return otp;
    }

    /**
     * @param otp the otp to set
     */
    public void setOtp(String otp) {
        this.otp = otp;
    }

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return the productStatus
     */
    public ProductStatus getProductStatus() {
        return productStatus;
    }

    /**
     * @param productStatus the productStatus to set
     */
    public void setProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
    }

    /**
     * @return the sShipping
     */
    public String getsShipping() {
        return sShipping;
    }

    /**
     * @param sShipping the sShipping to set
     */
    public void setsShipping(String sShipping) {
        this.sShipping = sShipping;
    }

    /**
     * @return the eShipping
     */
    public String geteShipping() {
        return eShipping;
    }

    /**
     * @param eShipping the eShipping to set
     */
    public void seteShipping(String eShipping) {
        this.eShipping = eShipping;
    }

    /**
     * @return the oShipping
     */
    public String getoShipping() {
        return oShipping;
    }

    /**
     * @param oShipping the oShipping to set
     */
    public void setoShipping(String oShipping) {
        this.oShipping = oShipping;
    }
    
    
    
}
