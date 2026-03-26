package com.demo.library.strategy;

import com.demo.library.model.Book;
import java.util.List;
import java.util.stream.Collectors;

/** Tìm kiếm theo tên sách (case-insensitive) */
public class SearchByName implements SearchStrategy {
    @Override
    public List<Book> search(List<Book> books, String query) {
        return books.stream()
                .filter(b -> b.getTitle().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
