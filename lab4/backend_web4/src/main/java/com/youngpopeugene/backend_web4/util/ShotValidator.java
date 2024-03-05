package com.youngpopeugene.backend_web4.util;

public class ShotValidator {
    public static boolean isHit(double x, double y, double r){
        return isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r);
    }

    public static boolean isCircleZone(double x, double y, double r){
        return x >= 0 && y >= 0 && (x * x + y * y <= r*r);
    }

    public static boolean isTriangleZone(double x, double y, double r){
        return x <= 0 && y <= 0 && (2 * y >= (-1) * x - r);
    }

    public static boolean isRectangleZone(double x, double y, double r){
        return x >= 0 && y <= 0 && x <= r && y >= (-1)*r;
    }


}
