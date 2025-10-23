package iuh.fit.se.enternalrunebackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product_specifications")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSpecifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int specId;

    @OneToOne
    @JoinColumn(name = "prod_id", nullable = false, unique = true)
    Product product;

    @Column(name = "screen_size")
    String screenSize;

    @Column(name = "display_tech")
    String displayTech;

    @Column(name = "rear_camera")
    String rearCamera;

    @Column(name = "front_camera")
    String frontCamera;

    @Column(name = "chipset")
    String chipset;

    @Column(name = "nfc_tech")
    String nfcTech;

    @Column(name = "ram")
    String ram;

    @Column(name = "storage")
    String storage;

    @Column(name = "battery")
    String battery;

    @Column(name = "th_sim")
    String th_sim;

    @Column(name = "os")
    String os;

    @Column(name = "resolution")
    String resolution;

    @Column(name = "display_features")
    String displayFeatures;

    @Column(name = "cpu_type")
    String cpuType;
}
