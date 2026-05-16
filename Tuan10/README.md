# Tuan10 - Mini Food Ordering System

Service-Based Architecture demo for a mini internal food ordering system.

## Services

| Service | Port | Responsibility |
| --- | ---: | --- |
| User Service | 8081 | Register, login, list users, validate user |
| Food Service | 8082 | CRUD foods, seeded menu |
| Order Service | 8083 | Create/list orders, calls User and Food services with CircuitBreaker |
| Payment Service | 8084 | Fake payment, updates order status, logs notification |
| Frontend | 3000 | React UI for login/register, menu, cart, order, payment |

## Run with Docker

```bash
cd Tuan10
docker compose up --build
```

Open: http://localhost:3000

## LAN configuration

For cross-machine demo, update service URLs in `docker-compose.yml` or environment variables:

```properties
USER_SERVICE_URL=http://192.168.x.x:8081
FOOD_SERVICE_URL=http://192.168.x.x:8082
ORDER_SERVICE_URL=http://192.168.x.x:8083
VITE_USER_API_URL=http://192.168.x.x:8081
VITE_FOOD_API_URL=http://192.168.x.x:8082
VITE_ORDER_API_URL=http://192.168.x.x:8083
VITE_PAYMENT_API_URL=http://192.168.x.x:8084
```

## Required demo script

1. Register or login a user.
2. View seeded food list.
3. Add foods to cart and create an order.
4. Pay by COD or Banking.
5. Check Payment Service console log:

```text
Notification: User A da dat don #123 thanh cong
```

## CircuitBreaker

Order Service protects calls to User Service and Food Service with Resilience4j CircuitBreaker:

- `userServiceCircuitBreaker`
- `foodServiceCircuitBreaker`

Config lives in `order-service/src/main/resources/application.yml`.

