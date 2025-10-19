package iuh.fit.se.enternalrunebackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name="carts")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int cartId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User cartUser;

    @OneToMany(mappedBy = "ciCart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> items = new ArrayList<>();
    public Integer totalAmount() {
        if (items == null || items.isEmpty()) {
            return 0;
        }
        return items.stream()
                .mapToInt(item -> {
                    double price = item.getCiProduct() != null ? item.getCiProduct().productPrice.getPpPrice() : 0;
                    long quantity = item.getCiQuantity() != 0 ? item.getCiQuantity() : 1;
                    return (int) (price * quantity);
                })
                .sum();
    }

}
