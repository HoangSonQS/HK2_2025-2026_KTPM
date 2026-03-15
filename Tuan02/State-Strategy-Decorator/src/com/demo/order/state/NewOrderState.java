package com.demo.order.state;

public class NewOrderState implements OrderState {
    @Override
    public void checkOrder(OrderContext ctx) {
        System.out.println("[NewOrderState] Order verified. Moving to Processing.");
        ctx.setState(new ProcessingState());
    }

    @Override
    public void processOrder(OrderContext ctx) {
        System.out.println("[NewOrderState] Cannot process: order not checked yet.");
    }

    @Override
    public void deliverOrder(OrderContext ctx) {
        System.out.println("[NewOrderState] Cannot deliver: order not checked yet.");
    }

    @Override
    public void cancelOrder(OrderContext ctx) {
        System.out.println("[NewOrderState] Order cancelled from New state.");
        ctx.setState(new CancelledState());
    }
}
