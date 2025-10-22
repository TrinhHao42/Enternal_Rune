package iuh.fit.se.enternalrunebackend.exception.payment_exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor
public enum PaymentExceptionEnum {
    PAYMENT_PROCESS_ERROR("Lỗi trong quá trình thanh toán");
    private String exception;
}
