package iuh.fit.se.enternalrunebackend.controller;

import iuh.fit.se.enternalrunebackend.dto.request.QRCodeRequest;
import iuh.fit.se.enternalrunebackend.dto.request.TransactionRequest;
import iuh.fit.se.enternalrunebackend.dto.response.QRCodeResponse;
import iuh.fit.se.enternalrunebackend.entity.Order;
import iuh.fit.se.enternalrunebackend.entity.enums.PaymentStatus;
import iuh.fit.se.enternalrunebackend.service.Impl.SePayServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}
)
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private SePayServiceImpl sePayService;

    @PostMapping("/order")
    public Order order(@RequestBody Order order){
        return sePayService.createOrder(order);
    }

    @PostMapping("/getQRcode")
    public ResponseEntity<byte[]> getQRCode(@RequestBody QRCodeRequest request){
        try {
            QRCodeResponse qrCode = sePayService.getQRCode(request.getAmount(), request.getDescription());
            if (qrCode != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_PNG);
                return ResponseEntity.ok()
                        .headers(headers)
                        .body(qrCode.getImage());
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    };

    @GetMapping("/checkOrderStatus/id={id}")
    public PaymentStatus checkOrderStatus(@PathVariable int id) {
        return sePayService.getOrderStatus(id);
    }

    @PostMapping("/payment")
    public boolean Payment(@RequestBody TransactionRequest transactionRequest) {
        return sePayService.sePayWebHook(transactionRequest);
    }
}
