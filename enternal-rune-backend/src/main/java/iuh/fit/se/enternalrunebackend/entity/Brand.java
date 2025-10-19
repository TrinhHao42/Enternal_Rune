package iuh.fit.se.enternalrunebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private int brandId;

    @Column(name = "brand_name", nullable = false, length = 100)
    private String brandName;

    @Column(name = "brand_logo_url")
    private String brandLogoUrl;

    @Column(name = "brand_description", columnDefinition = "TEXT")
    private String brandDescription;

    @Column(name = "brand_status", length = 20)
    private String brandStatus;

    @OneToMany(mappedBy = "prodBrand", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();



}
