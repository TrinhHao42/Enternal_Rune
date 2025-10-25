package iuh.fit.se.enternalrunebackend.service;

import iuh.fit.se.enternalrunebackend.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProductsWithActivePrice();

    List<Product> getFeaturedProducts(int limit);
}
