package iuh.fit.se.enternalrunebackend.repository;

import iuh.fit.se.enternalrunebackend.entity.Order;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.math.BigDecimal;

@RepositoryRestResource(path = "orders")
public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Transactional
    @Query("SELECT o.orderPaymentStatus FROM Order o WHERE o.orderId = :id")
    PaymentStatus checkOrderStatusById(int id);

    @Transactional
    @Query("UPDATE Order o SET o.orderPaymentStatus = :status WHERE o.orderId = :id and o.orderTotalAmount = :total and o.orderPaymentStatus = :preStatus")
    int updateOrderStatusByID(@Param("id") Integer id, @Param("total") BigDecimal total, @Param("status") PaymentStatus status, @Param("preStatus")  PaymentStatus preStatus);
}
