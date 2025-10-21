package iuh.fit.se.enternalrunebackend.exception;

import iuh.fit.se.enternalrunebackend.exception.payment_exception.PaymentException;

public class GlobalException extends RuntimeException {
    private PaymentException paymentException;

    public GlobalException(PaymentException paymentException) {
        super(paymentException.getMessage());
        this.paymentException = paymentException;
    }
}
