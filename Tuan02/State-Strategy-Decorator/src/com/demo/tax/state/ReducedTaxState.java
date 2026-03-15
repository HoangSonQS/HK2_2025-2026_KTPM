package com.demo.tax.state;

public class ReducedTaxState implements TaxState {
    @Override
    public double applyTax(double amount) {
        return amount * 0.05; // 5% tax
    }

    @Override
    public String getDescription() {
        return "Reduced Tax Region (5%)";
    }
}
