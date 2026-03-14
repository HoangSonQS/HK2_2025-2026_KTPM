package com.example.notification.manager;

import com.example.notification.factory.NotificationFactory;
import com.example.notification.notification.Notification;

public class NotificationManager {
    private  static NotificationManager instance;
    private NotificationManager() {

    }

    public static NotificationManager getInstance() {
        if (instance == null) {
            instance = new NotificationManager();
        }
        return instance;
    }

    public void sendNotification(String type, String message) {
        Notification notification = NotificationFactory.createNotification(type);
        if (notification != null) {
            notification.send((message));
        } else {
            System.out.println("Invalid notification type");
        }
    }
}
