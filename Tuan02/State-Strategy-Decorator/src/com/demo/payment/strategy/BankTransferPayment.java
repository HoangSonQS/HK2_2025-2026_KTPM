package com.demo.payment.strategy;

public class BankTransferPayment implements PaymentMethod {
    @Override
    public void pay(double amount) {
        System.out.println("[Bank Transfer] Instructing bank to transfer $" + amount + " to merchant account.");
    }

    @Override
    public String getName() {
        return "BankTransferPayment";
    }
}
