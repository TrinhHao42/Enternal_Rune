package iuh.fit.se.enternalrunebackend.repository;

import iuh.fit.se.enternalrunebackend.entity.OrderRefundRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "order-refund-requests")
public interface OrderRefundRequestRepository extends JpaRepository<OrderRefundRequest,Integer> {
}
