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
@Table(name = "user")
public class User implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "first_name",length = 20,nullable = false)
    private String fname;
    
    @Column(name = "last_name",length = 20,nullable = false)
    private String lname;
    
    @Column(name = "email",length = 60,nullable = false)
    private String email;
    
    @Column(name = "mobile",length = 10,nullable = false)
    private String mobile;
    
    @Column(name = "password",length = 20,nullable = false)
    private String password;
    
    @Column(name = "verification",length = 10,nullable = false)
    private String verification;
    
    @Column(name = "reg_date",nullable = false)
    private Date reg_date;
    
    @ManyToOne
    @JoinColumn(name = "gender_id",nullable = true)
    private Gender gender;
    
    @ManyToOne
    @JoinColumn(name = "user_status_id",nullable = false)
    private UserStatus userStatus;
    
    @Column(name = "otp")
    private String otp;

    public User() {
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

   
    public String getPassword() {
        return password;
    }

    
    public void setPassword(String password) {
        this.password = password;
    }

    
    public String getVerification() {
        return verification;
    }

    
    public void setVerification(String verification) {
        this.verification = verification;
    }

    
    public Date getReg_date() {
        return reg_date;
    }

    
    public void setReg_date(Date reg_date) {
        this.reg_date = reg_date;
    }

    
    public Gender getGender() {
        return gender;
    }

    
    public void setGender(Gender gender) {
        this.gender = gender;
    }

    
    public UserStatus getUserStatus() {
        return userStatus;
    }

    
    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
    }

    
    public String getOtp() {
        return otp;
    }

    
    public void setOtp(String otp) {
        this.otp = otp;
    }
    
    
    
    
}
