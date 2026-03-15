package com.demo.tax.strategy;

public class ExemptStrategy implements TaxStrategy {
    @Override
    public double calculate(double amount) {
        return 0.0; // 0% tax
    }

    @Override
    public String getName() {
        return "Tax Exempt (0%)";
    }
}
