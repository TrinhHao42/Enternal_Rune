package iuh.fit.se.enternalrunebackend.entity;

import iuh.fit.se.enternalrunebackend.entity.enums.TargetType;
import iuh.fit.se.enternalrunebackend.entity.enums.ValueType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "discounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    int discountId;

    @Column(name = "discount_name", nullable = false, length = 100)
    String discountName;

    @Column(name = "discount_code", nullable = false, unique = true, length = 50)
    String discountCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "discount_target_type", nullable = false)
    TargetType discountTargetType;

    @Enumerated(EnumType.STRING)
    @Column(name = "discount_value_type", nullable = false)
    ValueType discountValueType;

    @Column(name = "discount_value", nullable = false)
    double discountValue;

    @Column(name = "discount_max_amount")
    double discountMaxAmount;

    @Column(name = "discount_start_date", nullable = false)
    LocalDate discountStartDate;

    @Column(name = "discount_end_date", nullable = false)
    LocalDate discountEndDate;

    @Column(name = "discount_quantity_limit")
    long discountQuantityLimit;

    @Column(name = "discount_active", nullable = false)
    boolean discountActive;

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ProductPrice> productPrices = new ArrayList<>();

}
