package iuh.fit.se.enternalrunebackend.repository;

import iuh.fit.se.enternalrunebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "products")
public interface ProductRepository extends JpaRepository<Product,Integer> {
    // Tổng số sản phẩm
    @Query("SELECT COUNT(p) FROM Product p")
    long countTotalProducts();

    // Số sản phẩm còn hàng
    @Query("SELECT COUNT(p) FROM Product p WHERE p.productStatus = 'ACTIVE'")
    long countAvailableProducts();

    // Số sản phẩm hết hàng
    @Query("SELECT COUNT(p) FROM Product p WHERE p.productStatus = 'OUT_OF_STOCK'")
    long countOutOfStockProducts();

    // Đếm sản phẩm được tạo trong 1 tháng cụ thể
    @Query("""
        SELECT COUNT(p)
        FROM Product p
        WHERE EXTRACT(YEAR FROM p.createdAt) = :year
          AND EXTRACT(MONTH FROM p.createdAt) = :month
    """)
    long countProductsByMonth(@Param("year") int year, @Param("month") int month);
}
