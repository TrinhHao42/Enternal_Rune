package iuh.fit.se.enternalrunebackend.service;

import iuh.fit.se.enternalrunebackend.dto.request.TransactionRequest;
import iuh.fit.se.enternalrunebackend.dto.response.QRCodeResponse;
import iuh.fit.se.enternalrunebackend.entity.Order;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;

import java.io.IOException;

public interface SePayService {
    QRCodeResponse getQRCode(double amount, String description) throws IOException;
    PaymentStatus getOrderStatus(int id);
    TransactionRequest sePayWebHook(TransactionRequest transactionRequest);
    Order createOrder(Order orderInformation);
}
