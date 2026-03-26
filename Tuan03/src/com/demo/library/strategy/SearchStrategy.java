package com.demo.library.strategy;

import com.demo.library.model.Book;
import java.util.List;

/**
 * Strategy Pattern - Interface chiến lược tìm kiếm.
 * Cho phép tráo đổi thuật toán tìm kiếm tại runtime mà không cần sửa Library.
 */
public interface SearchStrategy {
    List<Book> search(List<Book> books, String query);
}
