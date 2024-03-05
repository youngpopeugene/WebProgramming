package com.youngpopeugene.backend_web4.util;

import com.youngpopeugene.backend_web4.controller.LoginController;
import com.youngpopeugene.backend_web4.controller.RegistrationController;
import com.youngpopeugene.backend_web4.controller.ShotController;

import com.youngpopeugene.backend_web4.controller.UserController;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/app")
public class App extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> set = new HashSet<>();
        set.add(ShotController.class);
        set.add(UserController.class);
        set.add(RegistrationController.class);
        set.add(LoginController.class);
        return set;
    }
}
