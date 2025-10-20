package iuh.fit.se.enternalrunebackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    int addressId;

    @Column(name = "street_name", nullable = false)
    String streetName;

    @Column(name = "ward_name", nullable = false)
    String wardName;

    @Column(name = "city_name", nullable = false)
    String cityName;

    @Column(name = "country_name", nullable = false)
    String countryName;

    @OneToMany(mappedBy = "orderShippingAddress", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Order> orders;

    @OneToMany(mappedBy = "userAddress", cascade = CascadeType.ALL, orphanRemoval = true)
    List<User> users;
}
