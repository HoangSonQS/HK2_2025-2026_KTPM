package com.demo.order.strategy;

public class StandardProcessingStrategy implements OrderProcessingStrategy {
    @Override
    public void process(Order order) {
        System.out.println("[Standard Processing] Routing order " + order.getId() + " to standard queue. Estimated time: 2-3 days.");
    }

    @Override
    public String getName() {
        return "StandardProcessingStrategy";
    }
}
