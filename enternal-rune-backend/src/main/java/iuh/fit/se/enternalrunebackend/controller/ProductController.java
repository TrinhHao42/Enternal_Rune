package iuh.fit.se.enternalrunebackend.controller;

import iuh.fit.se.enternalrunebackend.entity.Product;
import iuh.fit.se.enternalrunebackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend (React, v.v.)
public class ProductController {

    private final ProductService productService;

    //Lấy danh sách sản phẩm nổi bật sắp xếp theo rateing top của từng thương hiệu
    @GetMapping("/top-brand")
    public ResponseEntity<List<Product>> getFeaturedProducts(
            @RequestParam(defaultValue = "8") int limit) {
        List<Product> products = productService.getFeaturedProducts(limit);
        return ResponseEntity.ok(products);
    }

    // Lấy danh sách sản phẩm với giá ACTIVE
    @GetMapping("/active-price")
    public List<Product> getProductsWithActivePrice() {
        return productService.getAllProductsWithActivePrice();
    }

    // (Tuỳ chọn) Lấy sản phẩm theo ID — chỉ lấy giá ACTIVE
    @GetMapping("/{id}/active-price")
    public Product getProductWithActivePrice(@PathVariable int id) {
        List<Product> products = productService.getAllProductsWithActivePrice();
        return products.stream()
                .filter(p -> p.getProdId() == id)
                .findFirst()
                .orElse(null);
    }

}
