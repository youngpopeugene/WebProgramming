package com.youngpopeugene.web_lab3.beans;

import com.youngpopeugene.web_lab3.dao.ShotDao;
import com.youngpopeugene.web_lab3.entity.Shot;
import com.youngpopeugene.web_lab3.utils.AreaHitChecker;
import com.youngpopeugene.web_lab3.utils.Validator;
import jakarta.annotation.PostConstruct;
import jakarta.faces.context.ExternalContext;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ShotBean implements Serializable {

    private Shot shot;
    @Inject
    private ShotDao shotDao;
    private List<Shot> shotsList;
    private int timezone;

    @PostConstruct
    public void postConstruct(){
        shot = new Shot();
        shotDao.createEntityManager();
        shotsList = shotDao.getShotsFromDB();
    }

    public void add(){
        LocalDateTime startTime = LocalDateTime.now(ZoneOffset.UTC);
        if(Validator.isValid(shot)) {
            shot.setStatus(AreaHitChecker.isHit(shot));
            shot.setCurrentTime(startTime.minusMinutes(getTimezone()).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            shot.setScriptTime(Math.round(LocalDateTime.now().minusNanos(startTime.getNano()).getNano() * 0.001));
            shotsList.add(shot);
            shotDao.addShotToDB(shot);
            shot = new Shot();
        }else{
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            HttpServletResponse response = (HttpServletResponse) context.getResponse();
            response.setStatus(500);
        }
    }

    public void addThroughPlot(){
        String string_x = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("x");
        String string_y = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("y");
        String string_r = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("r");
        shot.setX(Double.parseDouble(string_x));
        shot.setY(Double.parseDouble(string_y));
        shot.setR(Double.parseDouble(string_r));
        add();
    }

    public void clear(){
        shotDao.clearShotsInBD();
        shotsList = shotDao.getShotsFromDB();
    }

    public Shot getShot() {
        return shot;
    }

    public void setShot(Shot shot) {
        this.shot = shot;
    }

    public List<Shot> getShotsList() {
        return shotsList;
    }

    public void setShotsList(LinkedList<Shot> shotsList) {
        this.shotsList = shotsList;
    }

    public int getTimezone() {
        return timezone;
    }

    public void setTimezone() {
        timezone = Integer.parseInt(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("timezone"));
    }
}
