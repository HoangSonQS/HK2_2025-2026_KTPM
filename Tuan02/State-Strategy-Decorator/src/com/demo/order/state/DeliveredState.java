package com.demo.order.state;

public class DeliveredState implements OrderState {
    @Override
    public void checkOrder(OrderContext ctx) {
        System.out.println("[DeliveredState] Order already delivered.");
    }

    @Override
    public void processOrder(OrderContext ctx) {
        System.out.println("[DeliveredState] Order already delivered.");
    }

    @Override
    public void deliverOrder(OrderContext ctx) {
        System.out.println("[DeliveredState] Order has already been delivered successfully.");
    }

    @Override
    public void cancelOrder(OrderContext ctx) {
        System.out.println("[DeliveredState] Cannot cancel: order already delivered.");
    }
}
