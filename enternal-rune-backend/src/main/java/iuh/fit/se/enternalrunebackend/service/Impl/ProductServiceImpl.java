package iuh.fit.se.enternalrunebackend.service.Impl;

import iuh.fit.se.enternalrunebackend.dto.response.ProductDashboardResponse;
import iuh.fit.se.enternalrunebackend.repository.BrandRepository;
import iuh.fit.se.enternalrunebackend.repository.ProductRepository;
import iuh.fit.se.enternalrunebackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Override
    public ProductDashboardResponse getProductDashboard() {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        // Tháng trước
        int prevMonth = (month == 1) ? 12 : month - 1;
        int prevYear = (month == 1) ? year - 1 : year;

        //Tổng sản phẩm
        long totalProducts = productRepository.countTotalProducts();
        long totalThisMonth = productRepository.countProductsByMonth(year, month);
        long totalPrevMonth = productRepository.countProductsByMonth(prevYear, prevMonth);
        double totalChange = calcChangePercent(totalThisMonth, totalPrevMonth);

        // Tổng danh mục
        long totalBrand = brandRepository.countTotalBrands();
        long catThisMonth = brandRepository.countBrandsByMonth(year, month);
        long catPrevMonth = brandRepository.countBrandsByMonth(prevYear, prevMonth);
        double catChange = calcChangePercent(catThisMonth, catPrevMonth);

        //Còn hàng
        long available = productRepository.countAvailableProducts();
        double availableChange = calcChangePercent(available, available * 0.92);

        //Hết hàng
        long outOfStock = productRepository.countOutOfStockProducts();
        double outOfStockChange = calcChangePercent(outOfStock, outOfStock * 1.023);
        return new ProductDashboardResponse(
                totalProducts, totalChange,
                totalProducts, catChange,
                available, availableChange,
                outOfStock, outOfStockChange
        );
    }
    private double calcChangePercent(Number current, Number previous) {
        if (previous == null || previous.doubleValue() == 0)
            return current.doubleValue() > 0 ? 100.0 : 0.0;
        return ((current.doubleValue() - previous.doubleValue()) / previous.doubleValue()) * 100.0;
    }
}
