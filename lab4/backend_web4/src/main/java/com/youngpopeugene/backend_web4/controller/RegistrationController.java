package com.youngpopeugene.backend_web4.controller;

import com.google.common.hash.Hashing;
import com.youngpopeugene.backend_web4.model.entity.User;

import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Path("/registration")
public class RegistrationController {
    @EJB
    private GlobalBean globalBean;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response registration(Map<String, String> data){
        User user = new User();
        user.setUsername(data.get("login"));
        user.setPassword(Hashing.sha256().hashString(data.get("password"), StandardCharsets.UTF_8).toString());
        if (globalBean.isUsernameExists(data.get("login")))
            return makeResponse(Response.status(403).entity("User already exists"));
        globalBean.addUser(user);
        return makeResponse(Response.ok().entity("User is added"));
    }

    public Response makeResponse(Response.ResponseBuilder x){
        return x.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .build();
    }

}
