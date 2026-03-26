package com.demo.library.strategy;

import com.demo.library.model.Book;
import java.util.List;
import java.util.stream.Collectors;

/** Tìm kiếm theo tên tác giả (case-insensitive) */
public class SearchByAuthor implements SearchStrategy {
    @Override
    public List<Book> search(List<Book> books, String query) {
        return books.stream()
                .filter(b -> b.getAuthor().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
