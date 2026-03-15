package com.demo.tax.strategy;

public interface TaxStrategy {
    double calculate(double amount);
    String getName();
}
