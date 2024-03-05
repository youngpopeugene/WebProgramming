package com.youngpopeugene.backend_web4.controller;

import com.youngpopeugene.backend_web4.model.entity.Shot;
import com.youngpopeugene.backend_web4.util.JSONParser;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.Map;

@Path("/shots")
public class ShotController {
    @EJB
    private GlobalBean globalBean;

    @POST
    @Path("/add")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response addShot(Map<String, String> data) {
        ArrayList<Shot> result = new ArrayList<>();
        Shot shot = new Shot();
        try {
            shot.setX(Double.parseDouble(data.get("X")));
            shot.setY(Double.parseDouble(data.get("Y")));
            shot.setR(Double.parseDouble(data.get("R")));
        }catch (NumberFormatException e){
            return makeResponse(Response
                    .serverError()
                    .entity("Error: x, y, r have to be a number")
            );
        }
        globalBean.addShot(shot, data.get("login"));
        result.add(shot);
        return makeResponse(Response
                        .ok()
                        .entity(JSONParser.toJSON(result))
        );
    }

    @POST
    @Path("/get")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response getShots(Map<String, String> data){
        return makeResponse(Response
                        .ok()
                        .entity(JSONParser.toJSON(globalBean.getShots(data.get("login"))))
        );
    }

    @POST
    @Path("/delete")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response deleteShots(Map<String, String> data){
        globalBean.deleteShots(data.get("login"));
        return makeResponse(Response
                .ok()
                .entity("All shots are deleted")
        );
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
