package iuh.fit.apigateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;

@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(LoggingGlobalFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        String method = request.getMethod().name();
        InetSocketAddress remoteAddress = request.getRemoteAddress();
        String clientIp = (remoteAddress != null) ? remoteAddress.getAddress().getHostAddress() : "unknown";

        log.info(">>> [GATEWAY REQUEST] Method: {}, Path: {}, Client IP: {}", method, path, clientIp);

        long startTime = System.currentTimeMillis();

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long duration = System.currentTimeMillis() - startTime;
            Integer statusCode = (exchange.getResponse().getStatusCode() != null) 
                ? exchange.getResponse().getStatusCode().value() 
                : null;
            
            log.info("<<< [GATEWAY RESPONSE] Method: {}, Path: {}, Status: {}, Duration: {}ms", 
                method, path, statusCode, duration);
        }));
    }

    @Override
    public int getOrder() {
        // High priority to log everything, even if later filters fail
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
