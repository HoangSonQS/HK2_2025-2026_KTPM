package com.demo.composite;

import java.util.ArrayList;
import java.util.List;

public class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> components;

    public Folder(String name) {
        this.name = name;
        this.components = new ArrayList<>();
    }

    public void addComponent(FileSystemComponent component) {
        components.add(component);
    }

    public void removeComponent(FileSystemComponent component) {
        components.remove(component);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getSize() {
        // Duyệt đệ quy (recursive): tự động lấy tổng kích thước của tất cả các childs
        int totalSize = 0;
        for (FileSystemComponent component : components) {
            totalSize += component.getSize();
        }
        return totalSize;
    }

    @Override
    public void showDetails(String indent) {
        System.out.println(indent + "+ [Folder] " + name + " (Total Size: " + getSize() + " KB)");
        for (FileSystemComponent component : components) {
            component.showDetails(indent + "   ");
        }
    }
}
