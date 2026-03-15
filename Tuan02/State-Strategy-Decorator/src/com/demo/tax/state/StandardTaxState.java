package com.demo.tax.state;

public class StandardTaxState implements TaxState {
    @Override
    public double applyTax(double amount) {
        return amount * 0.10; // 10% tax
    }

    @Override
    public String getDescription() {
        return "Standard Tax Region (10%)";
    }
}
