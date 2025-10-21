package iuh.fit.se.enternalrunebackend.exception.payment_exception;

public class PaymentException extends RuntimeException {
    private PaymentExceptionEnum paymentExceptionEnum;
    public PaymentException(PaymentExceptionEnum paymentExceptionEnum) {
        super(paymentExceptionEnum.getException());
        this.paymentExceptionEnum = paymentExceptionEnum;
    }


}
