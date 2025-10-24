package iuh.fit.se.enternalrunebackend.exception;

import iuh.fit.se.enternalrunebackend.exception.payment_exception.PaymentException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler
    public String handleException(PaymentException paymentException) {
        return paymentException.getMessage();
    }
}
