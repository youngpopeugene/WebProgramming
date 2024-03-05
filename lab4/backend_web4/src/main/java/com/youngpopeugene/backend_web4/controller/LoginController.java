package com.youngpopeugene.backend_web4.controller;

import com.google.common.hash.Hashing;

import com.google.common.io.CharStreams;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Path("/login")
public class LoginController {
    @EJB
    private GlobalBean globalBean;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response authorize(Map<String, String> data) throws IOException {
        if (globalBean.isRegistered(data.get("login"), data.get("password")))
            return makeResponse(Response.ok().entity("Authorization is succeeded"));
        else
            return makeResponse(Response.status(403).entity("Authorization is failed"));
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
