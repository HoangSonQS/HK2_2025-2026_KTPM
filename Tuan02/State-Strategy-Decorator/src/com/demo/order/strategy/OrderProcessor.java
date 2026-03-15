package com.demo.order.strategy;

public class OrderProcessor {
    private OrderProcessingStrategy strategy;

    public OrderProcessor() {
        // Default strategy
        this.strategy = new StandardProcessingStrategy();
    }

    public void setStrategy(OrderProcessingStrategy s) {
        this.strategy = s;
        System.out.println("  [Strategy Changed] -> " + s.getName());
    }

    public void executeProcessing(Order order) {
        if (strategy == null) {
            System.out.println("No processing strategy set!");
            return;
        }
        strategy.process(order);
    }
    
    public String getName() {
        return strategy != null ? strategy.getName() : "None";
    }
}
