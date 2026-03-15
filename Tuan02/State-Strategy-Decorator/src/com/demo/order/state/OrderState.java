package com.demo.order.state;

import com.demo.order.state.OrderContext;

public interface OrderState {
    void checkOrder(OrderContext ctx);
    void processOrder(OrderContext ctx);
    void deliverOrder(OrderContext ctx);
    void cancelOrder(OrderContext ctx);
}
