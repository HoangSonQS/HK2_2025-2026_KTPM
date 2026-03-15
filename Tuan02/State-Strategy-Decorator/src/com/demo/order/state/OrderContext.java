package com.demo.order.state;

public class OrderContext {
    private OrderState state;

    public OrderContext() {
        this.state = new NewOrderState();
    }

    public void setState(OrderState state) {
        System.out.println("  [Transition] -> " + state.getClass().getSimpleName());
        this.state = state;
    }

    public void checkOrder() { state.checkOrder(this); }
    public void processOrder() { state.processOrder(this); }
    public void deliverOrder() { state.deliverOrder(this); }
    public void cancelOrder() { state.cancelOrder(this); }
}
