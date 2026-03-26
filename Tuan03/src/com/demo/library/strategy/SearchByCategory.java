package com.demo.library.strategy;

import com.demo.library.model.Book;
import java.util.List;
import java.util.stream.Collectors;

/** Tìm kiếm theo thể loại (case-insensitive) */
public class SearchByCategory implements SearchStrategy {
    @Override
    public List<Book> search(List<Book> books, String query) {
        return books.stream()
                .filter(b -> b.getCategory().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
