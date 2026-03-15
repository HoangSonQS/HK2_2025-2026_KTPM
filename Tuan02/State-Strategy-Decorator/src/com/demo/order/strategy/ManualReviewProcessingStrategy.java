package com.demo.order.strategy;

public class ManualReviewProcessingStrategy implements OrderProcessingStrategy {
    @Override
    public void process(Order order) {
        System.out.println("[Manual Review] Order " + order.getId() + " flagged. Requires manual verification before shipping.");
    }

    @Override
    public String getName() {
        return "ManualReviewProcessingStrategy";
    }
}
