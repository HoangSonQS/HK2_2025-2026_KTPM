package com.demo.order.strategy;

public class FastProcessingStrategy implements OrderProcessingStrategy {
    @Override
    public void process(Order order) {
        System.out.println("[Fast Processing] Priority routing for order " + order.getId() + "! Estimated time: 24 hours.");
    }

    @Override
    public String getName() {
        return "FastProcessingStrategy";
    }
}
