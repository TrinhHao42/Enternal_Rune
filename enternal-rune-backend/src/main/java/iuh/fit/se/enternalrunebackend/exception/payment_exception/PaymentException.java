package iuh.fit.se.enternalrunebackend.exception.payment_exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentException extends RuntimeException {
    PaymentExceptionEnum paymentExceptionEnum;
//    public PaymentException(PaymentExceptionEnum paymentExceptionEnum) {
//        super(paymentExceptionEnum.getException());
//        this.paymentExceptionEnum = paymentExceptionEnum;
//    }
}
