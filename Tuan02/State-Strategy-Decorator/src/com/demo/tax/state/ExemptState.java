package com.demo.tax.state;

public class ExemptState implements TaxState {
    @Override
    public double applyTax(double amount) {
        return 0.0; // 0% tax
    }

    @Override
    public String getDescription() {
        return "Tax Exempt Region (0%)";
    }
}
