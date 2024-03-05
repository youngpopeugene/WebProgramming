package com.youngpopeugene.web_lab2.model;

import java.util.LinkedList;

public class ShotCollectionManager {
    private static LinkedList<Shot> collection = new LinkedList<>();

    public static void add(Shot shot){
        collection.add(shot);
    }

    public static void clear(){
        collection = new LinkedList<>();
    }

    public static LinkedList<Shot> getCollection(){
        return collection;
    }

}
