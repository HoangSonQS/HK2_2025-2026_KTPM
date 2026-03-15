package com.demo.tax.strategy;

public class TaxStrategyMain {
    public static void main(String[] args) {
        System.out.println("=== Tax Calculation (Strategy Pattern) Demo ===");
        
        TaxCalculator calculator = new TaxCalculator();
        double amount = 2000.0;
        
        System.out.println("\n-- Applying Default Strategy to $" + amount);
        System.out.println("Tax calculated: $" + calculator.calculate(amount));
        
        System.out.println("\n-- Using Flat Tax Strategy to $" + amount);
        calculator.setStrategy(new FlatTaxStrategy());
        System.out.println("Tax calculated: $" + calculator.calculate(amount));
        
        System.out.println("\n-- Using Tax Exempt Strategy to $" + amount);
        calculator.setStrategy(new ExemptStrategy());
        System.out.println("Tax calculated: $" + calculator.calculate(amount));
        
        System.out.println("\n=== Demo Complete ===");
    }
}
