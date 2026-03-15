package com.demo.order.state;

public class CancelledState implements OrderState {
    @Override
    public void checkOrder(OrderContext ctx) {
        System.out.println("[CancelledState] Cannot check: order is cancelled.");
    }

    @Override
    public void processOrder(OrderContext ctx) {
        System.out.println("[CancelledState] Cannot process: order is cancelled.");
    }

    @Override
    public void deliverOrder(OrderContext ctx) {
        System.out.println("[CancelledState] Cannot deliver: order is cancelled.");
    }

    @Override
    public void cancelOrder(OrderContext ctx) {
        System.out.println("[CancelledState] Order is already cancelled.");
    }
}
