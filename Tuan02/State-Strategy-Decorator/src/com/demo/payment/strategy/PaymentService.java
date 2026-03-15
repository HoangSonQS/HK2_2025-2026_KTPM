package com.demo.payment.strategy;

public class PaymentService {
    private PaymentMethod method;

    public PaymentService() {
        this.method = new CreditCardPayment(); // Default method
    }

    public void setMethod(PaymentMethod m) {
        System.out.println("  [Payment Method Changed] -> " + m.getName());
        this.method = m;
    }

    public void processPayment(double amount) {
        if (method == null) {
            System.out.println("Please select a payment method first.");
            return;
        }
        method.pay(amount);
    }
    
    public String getName() {
        return method != null ? method.getName() : "None";
    }
}
