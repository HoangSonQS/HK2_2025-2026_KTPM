package com.demo.tax.strategy;

public class TaxCalculator {
    private TaxStrategy strategy;

    public TaxCalculator() {
        this.strategy = new VATStrategy(); // Default
    }

    public void setStrategy(TaxStrategy strategy) {
        System.out.println("  [Tax Strategy Changed] -> " + strategy.getName());
        this.strategy = strategy;
    }

    public double calculate(double amount) {
        if (strategy == null) {
            System.out.println("No tax strategy set! Defaulting to 0.");
            return 0.0;
        }
        return strategy.calculate(amount);
    }
    
    public String getName() {
        return strategy != null ? strategy.getName() : "None";
    }
}
