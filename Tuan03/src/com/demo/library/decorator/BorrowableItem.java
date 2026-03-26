package com.demo.library.decorator;

/**
 * Decorator Pattern - Component Interface.
 * Đây là "chiếc áo chung" mà cả BaseBookLoan (ConcreteComponent)
 * và LoanDecorator (Decorator) đều phải mặc vào.
 */
public interface BorrowableItem {
    void borrow();
    void returnItem();
    boolean isOverdue();
}
