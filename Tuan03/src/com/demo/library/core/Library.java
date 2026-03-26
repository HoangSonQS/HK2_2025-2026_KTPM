package com.demo.library.core;

import com.demo.library.decorator.*;
import com.demo.library.factory.SimpleBookFactory;
import com.demo.library.model.Book;
import com.demo.library.observer.LibraryNotifier;
import com.demo.library.observer.Observer;
import com.demo.library.strategy.SearchStrategy;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Singleton Pattern - Thư viện trung tâm.
 *
 * Đây là cửa ngõ duy nhất điều phối toàn bộ hệ thống:
 *  - Dùng SimpleBookFactory (Factory) để tạo sách.
 *  - Dùng SearchStrategy (Strategy) để tìm kiếm linh hoạt.
 *  - Dùng LibraryNotifier (Observer) để push thông báo.
 *  - Trả về BorrowableItem bọc trong Decorator chain.
 */
public class Library {

    // ====== SINGLETON ======
    private static Library instance;

    private final List<Book>            books       = new ArrayList<>();
    private final List<BorrowableItem>  activeLoans = new ArrayList<>();
    private final SimpleBookFactory     factory     = new SimpleBookFactory();
    private final LibraryNotifier       notifier    = new LibraryNotifier();
    private SearchStrategy              searchStrategy;

    /** Private constructor - ngăn khởi tạo từ bên ngoài */
    private Library() {}

    /** Điểm truy cập duy nhất tới instance */
    public static synchronized Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    // ====== OBSERVER: đăng ký/hủy theo dõi ======
    public void registerObserver(Observer observer)   { notifier.attach(observer); }
    public void unregisterObserver(Observer observer) { notifier.detach(observer); }

    // ====== STRATEGY: thiết lập thuật toán tìm kiếm ======
    public void setSearchStrategy(SearchStrategy strategy) {
        this.searchStrategy = strategy;
        System.out.println("[Library] Đổi chiến lược tìm kiếm sang: "
                + strategy.getClass().getSimpleName());
    }

    // ====== FACTORY: thêm sách mới ======
    public void addBook(String type, String title, String author, String category) {
        Book book = factory.createBook(type, title, author, category);
        books.add(book);
        System.out.println("[Library] Thêm sách mới: " + book);
        // Observer trigger: thông báo sách mới
        notifier.notifyObservers("Sách mới vừa được thêm vào thư viện: \"" + title + "\"");
    }

    // ====== XEM DANH SÁCH SÁCH ======
    public List<Book> getAllBooks() {
        return new ArrayList<>(books);
    }

    // ====== STRATEGY: tìm kiếm ======
    public List<Book> searchBook(String query) {
        if (searchStrategy == null) {
            throw new IllegalStateException("Chưa thiết lập chiến lược tìm kiếm!");
        }
        return searchStrategy.search(books, query);
    }

    // ====== DECORATOR: mượn sách ======
    public BorrowableItem borrowBook(Book book, String borrower,
                                     boolean extendTime, boolean brailleVersion) {
        BorrowableItem loan = new BaseBookLoan(book, borrower, 14); // hạn mặc định 14 ngày

        if (extendTime)     loan = new ExtendedTimeDecorator(loan);
        if (brailleVersion) loan = new BrailleTranslateDecorator(loan);

        activeLoans.add(loan);
        return loan;
    }

    // ====== TRẢ SÁCH ======
    public void returnBook(BorrowableItem item) {
        item.returnItem();
        activeLoans.remove(item);
    }

    // ====== OBSERVER: kiểm tra sách quá hạn ======
    public void checkOverdueBooks() {
        System.out.println("\n[Library] Kiểm tra sách quá hạn...");
        boolean hasOverdue = false;
        for (BorrowableItem item : activeLoans) {
            if (item.isOverdue()) {
                hasOverdue = true;
                notifier.notifyObservers("⚠️ Cảnh báo: Có sách đã quá hạn mượn! Vui lòng trả sách sớm.");
                break; // Thông báo 1 lần là đủ
            }
        }
        if (!hasOverdue) {
            System.out.println("[Library] Không có sách nào quá hạn.");
        }
    }
}
