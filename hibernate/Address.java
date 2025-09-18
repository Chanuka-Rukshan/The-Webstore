
package hibernate;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "address")
public class Address implements Serializable{
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "address",nullable = false)
    private String address;
    
    @Column(name = "postal_code",length = 10,nullable = false)
    private String postalCode;
    
    @ManyToOne
    @JoinColumn(name = "country_id",nullable = false)
    private Country country;
    
    @ManyToOne
    @JoinColumn(name = "city_id",nullable = false)
    private City city;
    
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "status_id",nullable = false)
    private Status status;

    public Address() {
    }

    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    
    public void setAddress(String address) {
        this.address = address;
    }

   
    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }


   
    public City getCity() {
        return city;
    }

    
    public void setCity(City city) {
        this.city = city;
    }

   
    public User getUser() {
        return user;
    }

    
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return the country
     */
    public Country getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(Country country) {
        this.country = country;
    }

    /**
     * @return the status
     */
    public Status getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(Status status) {
        this.status = status;
    }
    
    
}
