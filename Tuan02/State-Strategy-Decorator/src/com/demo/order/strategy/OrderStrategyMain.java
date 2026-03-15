package com.demo.order.strategy;

public class OrderStrategyMain {
    public static void main(String[] args) {
        System.out.println("=== Order Management (Strategy Pattern) Demo ===");
        
        Order order1 = new Order("ORD-1001", "Laptop");
        Order order2 = new Order("ORD-1002", "Office Supplies");
        
        OrderProcessor processor = new OrderProcessor();
        
        System.out.println("\n-- Processing Order 1 (Default Strategy)");
        processor.executeProcessing(order1);
        
        System.out.println("\n-- Changing strategy to Fast");
        processor.setStrategy(new FastProcessingStrategy());
        processor.executeProcessing(order1);
        
        System.out.println("\n-- Changing strategy to Manual Review for Order 2");
        processor.setStrategy(new ManualReviewProcessingStrategy());
        processor.executeProcessing(order2);
        
        System.out.println("\n=== Demo Complete ===");
    }
}
