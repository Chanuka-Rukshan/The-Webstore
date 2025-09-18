
package hibernate;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    @Column(name = "first_name",length = 20,nullable = false)
    private String fname;
    
    @Column(name = "last_name",length = 20,nullable = false)
    private String lname;
    
    @Column(name = "email",length = 60,nullable = false)
    private String email;
    
    @Column(name = "mobile",length = 10,nullable = false)
    private String mobile;
    
    @Column(name = "reg_date",nullable = false)
    private Date reg_date;
    
    @Column(name = "otp",length = 6,nullable = true)
    private String otp;

    public Admin() {
    }

    public int getId() {
        return id;
    }

   
    public void setId(int id) {
        this.id = id;
    }

    
    public String getFname() {
        return fname;
    }

    
    public void setFname(String fname) {
        this.fname = fname;
    }

    
    public String getLname() {
        return lname;
    }

    
    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    
    public void setEmail(String email) {
        this.email = email;
    }

    
    public String getMobile() {
        return mobile;
    }

    
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    
    public Date getReg_date() {
        return reg_date;
    }

    
    public void setReg_date(Date reg_date) {
        this.reg_date = reg_date;
    }

    
    public String getOtp() {
        return otp;
    }

   
    public void setOtp(String otp) {
        this.otp = otp;
    }
    
    
    
}
