package iuh.fit.se.enternalrunebackend.repository;

import iuh.fit.se.enternalrunebackend.entity.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "product-prices")
public interface ProductPriceRepository extends JpaRepository<ProductPrice,Integer> {
}
