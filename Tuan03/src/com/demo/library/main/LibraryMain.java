package com.demo.library.main;

import com.demo.library.core.Library;
import com.demo.library.decorator.BorrowableItem;
import com.demo.library.factory.SimpleBookFactory;
import com.demo.library.model.Book;
import com.demo.library.observer.Librarian;
import com.demo.library.observer.LibraryUser;
import com.demo.library.strategy.SearchByAuthor;
import com.demo.library.strategy.SearchByCategory;
import com.demo.library.strategy.SearchByName;

import java.util.List;

/**
 * Điểm khởi chạy demo toàn bộ hệ thống Library (5 Design Patterns).
 */
public class LibraryMain {
    public static void main(String[] args) {

        System.out.println("=".repeat(60));
        System.out.println("    HỆ THỐNG QUẢN LÝ THƯ VIỆN - Demo 5 Patterns");
        System.out.println("=".repeat(60));

        // ============================================================
        // [1] SINGLETON: Lấy instance duy nhất của thư viện
        // ============================================================
        System.out.println("\n>>> [1] SINGLETON PATTERN");
        Library lib = Library.getInstance();
        Library lib2 = Library.getInstance();
        System.out.println("[Singleton] lib == lib2? " + (lib == lib2)); // phải là true

        // ============================================================
        // [2] OBSERVER: Đăng ký theo dõi
        // ============================================================
        System.out.println("\n>>> [2] OBSERVER PATTERN - Đăng ký");
        LibraryUser user1     = new LibraryUser("Hoàng Sơn");
        LibraryUser user2     = new LibraryUser("Ngọc Anh");
        Librarian   librarian = new Librarian("Thủ thư Lan");
        lib.registerObserver(user1);
        lib.registerObserver(user2);
        lib.registerObserver(librarian);

        // ============================================================
        // [3] FACTORY METHOD: Thêm sách (sẽ tự trigger Observer)
        // ============================================================
        System.out.println("\n>>> [3] FACTORY METHOD PATTERN - Thêm sách");
        lib.addBook(SimpleBookFactory.PAPER, "Sạch Code",       "Robert C. Martin", "Lập trình");
        lib.addBook(SimpleBookFactory.EBOOK, "Design Patterns",  "Gang of Four",     "Kiến trúc");
        lib.addBook(SimpleBookFactory.AUDIO, "Atomic Habits",    "James Clear",      "Kỹ năng sống");
        lib.addBook(SimpleBookFactory.PAPER, "Head First Java",  "Kathy Sierra",     "Lập trình");

        // ============================================================
        // [2b] OBSERVER: Hủy đăng ký một user
        // ============================================================
        System.out.println("\n>>> [2b] OBSERVER PATTERN - Hủy đăng ký");
        lib.unregisterObserver(user2);
        lib.addBook(SimpleBookFactory.EBOOK, "Clean Architecture", "Robert C. Martin", "Kiến trúc");

        // ============================================================
        // Xem toàn bộ danh sách sách
        // ============================================================
        System.out.println("\n>>> XEM DANH SÁCH SÁCH");
        List<Book> allBooks = lib.getAllBooks();
        allBooks.forEach(System.out::println);

        // ============================================================
        // [4] STRATEGY PATTERN: Tìm kiếm sách
        // ============================================================
        System.out.println("\n>>> [4] STRATEGY PATTERN - Tìm kiếm");

        // Tìm theo tên
        lib.setSearchStrategy(new SearchByName());
        List<Book> result1 = lib.searchBook("Clean");
        System.out.println("Tìm theo tên 'Clean': " + result1);

        // Tìm theo tác giả
        lib.setSearchStrategy(new SearchByAuthor());
        List<Book> result2 = lib.searchBook("Robert");
        System.out.println("Tìm theo tác giả 'Robert': " + result2);

        // Tìm theo thể loại
        lib.setSearchStrategy(new SearchByCategory());
        List<Book> result3 = lib.searchBook("Lập trình");
        System.out.println("Tìm theo thể loại 'Lập trình': " + result3);

        // ============================================================
        // [5] DECORATOR PATTERN: Mượn sách với tính năng mở rộng
        // ============================================================
        System.out.println("\n>>> [5] DECORATOR PATTERN - Mượn sách");
        Book bookToBorrow = allBooks.get(1); // Design Patterns

        // Mượn thông thường
        System.out.println("\n* Mượn thông thường:");
        BorrowableItem loan1 = lib.borrowBook(bookToBorrow, "Hoàng Sơn", false, false);
        loan1.borrow();

        // Mượn với gia hạn thêm 14 ngày
        System.out.println("\n* Mượn + Gia hạn thêm:");
        BorrowableItem loan2 = lib.borrowBook(allBooks.get(0), "Ngọc Anh", true, false);
        loan2.borrow();

        // Mượn với yêu cầu chữ nổi Braille
        System.out.println("\n* Mượn + Chữ nổi Braille:");
        BorrowableItem loan3 = lib.borrowBook(allBooks.get(2), "Minh Tuấn", false, true);
        loan3.borrow();

        // Mượn với cả 2 tính năng cùng lúc (Chồng Decorator)
        System.out.println("\n* Mượn + Gia hạn + Braille (Chồng Decorator):");
        BorrowableItem loan4 = lib.borrowBook(allBooks.get(3), "Thu Hà", true, true);
        loan4.borrow();

        // ============================================================
        // TRẢ SÁCH
        // ============================================================
        System.out.println("\n>>> TRẢ SÁCH");
        lib.returnBook(loan1);

        // ============================================================
        // OBSERVER: Kiểm tra sách quá hạn
        // ============================================================
        System.out.println("\n>>> KIỂM TRA SÁCH QUÁ HẠN");
        lib.checkOverdueBooks();

        System.out.println("\n" + "=".repeat(60));
        System.out.println("    Demo hoàn tất! 5 Patterns hoạt động chính xác.");
        System.out.println("=".repeat(60));
    }
}
