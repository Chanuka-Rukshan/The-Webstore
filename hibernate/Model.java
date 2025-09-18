package hibernate;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "model")
public class Model implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "model_name_id")
    private ModelName modelName;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;
    
    @ManyToOne
    @JoinColumn(name = "storage_id")
    private Storage storage;

    

    public Model() {
    }

    
    public int getId() {
        return id;
    }

    
    public void setId(int id) {
        this.id = id;
    }

    
    public ModelName getModelName() {
        return modelName;
    }

    
    public void setModelName(ModelName modelName) {
        this.modelName = modelName;
    }

    
    public Brand getBrand() {
        return brand;
    }

    
    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    
    public Color getColor() {
        return color;
    }

    
    public void setColor(Color color) {
        this.color = color;
    }

    
    public Storage getStorage() {
        return storage;
    }

   
    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    

 
}
