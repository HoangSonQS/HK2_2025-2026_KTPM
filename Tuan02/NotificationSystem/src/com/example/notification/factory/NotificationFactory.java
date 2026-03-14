package com.example.notification.factory;

import com.example.notification.notification.*;

public class NotificationFactory {

    public static Notification createNotification(String type) {

        if (type.equalsIgnoreCase("EMAIL")) {
            return new EmailNotification();
        }

        if (type.equalsIgnoreCase("SMS")) {
            return new SMSNotification();
        }

        if (type.equalsIgnoreCase("PUSH")) {
            return new PushNotification();
        }

        return null;
    }
}