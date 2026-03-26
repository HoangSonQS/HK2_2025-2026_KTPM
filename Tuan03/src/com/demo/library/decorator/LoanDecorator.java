package com.demo.library.decorator;

/**
 * Decorator Pattern - Abstract Decorator.
 * Bọc (wrap) một BorrowableItem bên trong và ủy quyền (delegate)
 * mọi lời gọi method xuống thành phần bên trong.
 * Các ConcreteDecorator sẽ mở rộng từ class này.
 */
public abstract class LoanDecorator implements BorrowableItem {
    protected final BorrowableItem wrappedItem;

    public LoanDecorator(BorrowableItem wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public void borrow() {
        wrappedItem.borrow();
    }

    @Override
    public void returnItem() {
        wrappedItem.returnItem();
    }

    @Override
    public boolean isOverdue() {
        return wrappedItem.isOverdue();
    }
}
