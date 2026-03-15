package com.demo.tax.state;

public interface TaxState {
    double applyTax(double amount);
    String getDescription();
}
