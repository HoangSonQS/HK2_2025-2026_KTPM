package iuh.fit.inventoryservice.service;

import iuh.fit.inventoryservice.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
public class InventoryService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public Product getStock(String productId) {
        Product product = (Product) redisTemplate.opsForHash().get("products", productId);
        if (product != null) {
            // Lấy tồn kho thực tế từ hash "inventory" (Data Grid source of truth)
            Object currentStock = redisTemplate.opsForHash().get("inventory", productId);
            if (currentStock != null) {
                product.setStock(Integer.parseInt(currentStock.toString()));
            }
        }
        return product;
    }

    /**
     * Giảm stock nguyên tử bằng Lua script trực tiếp trên Data Grid (Redis)
     * 
     * @return true nếu thành công, false nếu không đủ hàng
     */
    public boolean decreaseStock(String productId, int quantity) {
        log.info("Request to decrease stock for product: {}, quantity: {}", productId, quantity);

        String script = "local stock = redis.call('hget', KEYS[1], ARGV[1]); " +
                "if stock and tonumber(stock) >= tonumber(ARGV[2]) then " +
                "  local new_stock = redis.call('hincrby', KEYS[1], ARGV[1], -ARGV[2]); " +
                "  return new_stock; " +
                "else " +
                "  return -1; " +
                "end";

        DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptText(script);
        redisScript.setResultType(Long.class);

        // Thực hiện lệnh trên hash "inventory"
        Long result = redisTemplate.execute(
                redisScript,
                Collections.singletonList("inventory"),
                productId, String.valueOf(quantity));

        if (result != null && result >= 0) {
            log.info("SUCCESS: Product {} decreased. Remaining stock: {}", productId, result);
            return true;
        } else {
            log.warn("FAILED: Product {} insufficient stock or not found", productId);
            return false;
        }
    }
}