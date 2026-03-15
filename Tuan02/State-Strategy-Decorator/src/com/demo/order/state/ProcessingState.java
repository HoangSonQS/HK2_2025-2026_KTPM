package com.demo.order.state;

public class ProcessingState implements OrderState {
    @Override
    public void checkOrder(OrderContext ctx) {
        System.out.println("[ProcessingState] Order is already being processed.");
    }

    @Override
    public void processOrder(OrderContext ctx) {
        System.out.println("[ProcessingState] Order is being processed. Ready to deliver.");
    }

    @Override
    public void deliverOrder(OrderContext ctx) {
        System.out.println("[ProcessingState] Order dispatched for delivery.");
        ctx.setState(new DeliveredState());
    }

    @Override
    public void cancelOrder(OrderContext ctx) {
        System.out.println("[ProcessingState] Order cancelled during processing.");
        ctx.setState(new CancelledState());
    }
}
