package com.youngpopeugene.web_lab2.servlets;

import com.youngpopeugene.web_lab2.model.ShotCollectionManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "CleanTableServlet", value = "/cleaner")
public class CleanTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ShotCollectionManager.clear();
        getServletContext().setAttribute("collection", ShotCollectionManager.getCollection());
    }
}
