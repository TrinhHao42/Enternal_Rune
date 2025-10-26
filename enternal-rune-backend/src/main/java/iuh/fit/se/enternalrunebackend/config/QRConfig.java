package iuh.fit.se.enternalrunebackend.config;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRConfig {
    @Value("${qr.acc}")
    String acc;

    @Value("${qr.bank}")
    String bank;

    @Value("${qr.template}")
    String template;

    @Value("${qr.download}")
    String download;
}
