package iuh.fit.se.enternalrunebackend.exception.payment_exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor
public enum PaymentExceptionEnum {
    PAYMENT_PROCESS_ERROR(400, HttpStatus.BAD_REQUEST,"Lỗi trong quá trình thanh toán");
    int httpCode;
    HttpStatus httpStatus;
    String exception;
}
