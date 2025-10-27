package iuh.fit.se.enternalrunebackend.repository;

import iuh.fit.se.enternalrunebackend.entity.Order;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.math.BigDecimal;

@RepositoryRestResource(path = "orders")
public interface OrderRepository extends JpaRepository<Order,Integer> ,JpaSpecificationExecutor<Order>{
    @Transactional
    @Query("SELECT o.orderPaymentStatus FROM Order o WHERE o.orderId = :id")
    PaymentStatus checkOrderStatusById(int id);

    @Transactional
    @Query("UPDATE Order o SET o.orderPaymentStatus = :status WHERE o.orderId = :id and o.orderTotalAmount = :total and o.orderPaymentStatus = :preStatus")
    int updateOrderStatusByID(@Param("id") Integer id, @Param("total") BigDecimal total, @Param("status") PaymentStatus status, @Param("preStatus")  PaymentStatus preStatus);
//    ==========================SUMMARY========================
// Tổng số đơn hàng
@Query("SELECT COUNT(o) FROM Order o")
long countTotalOrders();

    // Tổng số đơn hoàn thành
    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderShippingStatus = 'DELIVERED'")
    long countCompletedOrders();

    // Đơn đang xử lý (PENDING hoặc PROCESSING)
    @Query("""
        SELECT COUNT(o)
        FROM Order o
        WHERE o.orderShippingStatus = 'PENDING'
           OR o.orderShippingStatus = 'PROCESSING'
    """)
    long countProcessingOrders();

    // Doanh thu tháng hiện tại (chỉ tính đơn giao thành công)
    @Query("""
        SELECT COALESCE(SUM(o.orderTotalAmount), 0)
        FROM Order o
        WHERE o.orderShippingStatus = 'DELIVERED'
          AND EXTRACT(YEAR FROM o.orderDate) = :year
          AND EXTRACT(MONTH FROM o.orderDate) = :month
    """)
    Double sumRevenueByMonth(@Param("year") int year, @Param("month") int month);

    // Số đơn hoàn tiền trong tháng
    @Query("""
        SELECT COUNT(o)
        FROM Order o
        WHERE o.orderShippingStatus = 'REFUNDED'
          AND EXTRACT(YEAR FROM o.orderDate) = :year
          AND EXTRACT(MONTH FROM o.orderDate) = :month
    """)
    Integer countRefundsByMonth(@Param("year") int year, @Param("month") int month);

}
