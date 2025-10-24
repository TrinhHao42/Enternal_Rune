package iuh.fit.se.enternalrunebackend.entity;

import iuh.fit.se.enternalrunebackend.entity.enums.OrderRefundStatus;
import iuh.fit.se.enternalrunebackend.entity.enums.OrderRefundType;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "order_refund_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRefundRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "or_id")
    int orId;

    @Enumerated(EnumType.STRING)
    @Column(name = "or_type", nullable = false)
    OrderRefundType orType;

    @Column(name = "or_reason", length = 255)
    String orReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "or_status", nullable = false)
    OrderRefundStatus orStatus;

    @Column(name = "or_create_date", nullable = false)
    LocalDate orCreateDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "or_payment", nullable = false)
    PaymentStatus orPayment;

    @Column(name = "or_refund_amount")
    double orRefundAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User orHandleBy;

    @OneToOne(mappedBy = "orderRefundRequest", cascade = CascadeType.ALL)
    Transaction refundTransaction;
}

