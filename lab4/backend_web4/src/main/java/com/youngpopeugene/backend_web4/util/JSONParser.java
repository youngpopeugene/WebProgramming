package com.youngpopeugene.backend_web4.util;

import com.youngpopeugene.backend_web4.controller.GlobalBean;
import com.youngpopeugene.backend_web4.model.entity.Shot;
import jakarta.ejb.EJB;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JSONParser {
    @EJB
    private static GlobalBean globalBean;
    public static String toJSON(ArrayList<Shot> collection) {
        StringBuilder json = new StringBuilder();
        json.append("[\n");
        if (collection.size() != 0) {
            for (int i = 0; i < collection.size(); i++) {
                if (i != collection.size() - 1) {
                    json.append(toJSON(collection.get(i))).append(",\n");
                } else {
                    json.append(toJSON(collection.get(i))).append("\n");
                }
            }
        }
        json.append("]");
        return json.toString();
    }

    public static String toJSON(Shot shot) {
        return "    {\n" +
                "       \"X\": \"" + shot.getX() + "\",\n" +
                "       \"Y\": \"" + shot.getY() + "\",\n" +
                "       \"R\": \"" + shot.getR() + "\",\n" +
                "       \"script_time\": \"" + shot.getScriptTime() + "\",\n" +
                "       \"date\": \"" + shot.getCurrentTime() + "\",\n" +
                "       \"status\": \"" + shot.isStatus() + "\"\n" +
                "   }";
    }

    public static String usersToJSON(ArrayList<String> collection) {
        StringBuilder json = new StringBuilder();
        json.append("[\n");
        if (collection.size() != 0) {
            for (int i = 0; i < collection.size(); i++) {
                if (i != collection.size() - 1) {
                    json.append(collection.get(i)).append(",\n");
                } else {
                    json.append(collection.get(i)).append("\n");
                }
            }
        }
        json.append("]");
        return json.toString();
    }

    public static boolean parseAuth(RequestWrapper requestWrap) throws IOException {
        String x = null;

        String login = null;
        String password = null;

        Scanner scanner = new Scanner(requestWrap.getBody());

        while (scanner.hasNextLine()) {
            String s = scanner.nextLine();
            if (x == "login" && s.getBytes(StandardCharsets.US_ASCII).length != 0){
                login = s;
            }
            if (x == "password" && s.getBytes(StandardCharsets.US_ASCII).length != 0){
                password = s;
                if (login != null){
                    if (globalBean.isRegistered(login, password)) {
                        return true;
                    }
                }
            }
            if (s.getBytes(StandardCharsets.US_ASCII).length != 0){
                x = null;
            }
            if (isContain(s, "login")){
                x = "login";
                login = null;
            }
            if (isContain(s, "password")){
                x = "password";
                password = null;
            }
        }
        return false;
    }

    private static boolean isContain(String source, String subItem){
        String pattern = "\\b"+subItem;
        Pattern p=Pattern.compile(pattern);
        Matcher m=p.matcher(source);
        return m.find();
    }
}
