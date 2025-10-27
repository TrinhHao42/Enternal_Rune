package iuh.fit.se.enternalrunebackend.service.Impl;

import iuh.fit.se.enternalrunebackend.config.QRConfig;
import iuh.fit.se.enternalrunebackend.dto.request.TransactionRequest;
import iuh.fit.se.enternalrunebackend.dto.response.QRCodeResponse;
import iuh.fit.se.enternalrunebackend.entity.Order;
import iuh.fit.se.enternalrunebackend.entity.Transaction;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;
import iuh.fit.se.enternalrunebackend.repository.OrderRepository;
import iuh.fit.se.enternalrunebackend.repository.TransactionRepository;
import iuh.fit.se.enternalrunebackend.service.SePayService;
import iuh.fit.se.enternalrunebackend.util.GenerateQRURL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;

@Service
public class SePayServiceImpl implements SePayService {
    @Autowired
    private QRConfig qrConfig;

    @Autowired
    private GenerateQRURL generateQRURL;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public QRCodeResponse getQRCode(BigDecimal amount, String description) throws IOException {
        String url = generateQRURL.getQRURL(qrConfig, amount, description);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(url, byte[].class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return new QRCodeResponse(response.getBody());
        }

        return null;
    }

    public PaymentStatus getOrderStatus(int id) {
        return orderRepository.checkOrderStatusById(id);
    }

    public TransactionRequest sePayWebHook(TransactionRequest transactionRequest) {
        Transaction newTransaction = new Transaction();

        newTransaction.setTransGateway(transactionRequest.getGateway());
        newTransaction.setTransDate(transactionRequest.getTransactionDate().toLocalDate());
        newTransaction.setTransAccountNumber(transactionRequest.getAccountNumber());
        newTransaction.setTransContent(transactionRequest.getContent());
        newTransaction.setTransReferenceNumber(transactionRequest.getReferenceCode());
        newTransaction.setTransBody(transactionRequest.getDescription());
        newTransaction.setTransCreatedAt(transactionRequest.getTransactionDate().toLocalDate());

        if (transactionRequest.getTransferType().equals("in")) {
            newTransaction.setTransAmountIn(transactionRequest.getTransferAmount());
        }
        else {
            newTransaction.setTransAmountOut(transactionRequest.getTransferAmount());
        }

//        Transaction transactionSaved = transactionRepository.save(newTransaction);
//
//        int row = 0;
//        if (transactionSaved != null) {
//            row = orderRepository.updateOrderStatusByID(transactionSaved.getTransId(), transactionSaved.getTransAmountIn(), PaymentStatus.PAID, PaymentStatus.PENDING);
//        }

        return transactionRequest;
    }

    public Order createOrder(Order orderInformation) {
        return orderRepository.save(orderInformation);
    }
}
