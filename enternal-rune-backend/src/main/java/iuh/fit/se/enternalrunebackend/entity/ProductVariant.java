package iuh.fit.se.enternalrunebackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product_variants")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_variant_id")
    Long prodvId;

    @ManyToOne
    Product prodvProduct;

    String prodvName;

    String prodvModel;

    String prodvVersion;

    String prodvColor;

    @ManyToOne
    @JoinColumn(name = "pp_price")
    ProductPrice prodvPrice;

    @ManyToOne
    @JoinColumn(name = "image_id")
    Image prodvImg;
}
