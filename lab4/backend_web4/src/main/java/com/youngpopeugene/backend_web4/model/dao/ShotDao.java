package com.youngpopeugene.backend_web4.model.dao;

import com.youngpopeugene.backend_web4.model.entity.Shot;
import com.youngpopeugene.backend_web4.model.entity.User;
import com.youngpopeugene.backend_web4.util.HibernateUtil;
import jakarta.ejb.TransactionManagement;
import org.hibernate.Session;
import org.hibernate.Transaction;

import jakarta.ejb.Singleton;

import java.util.ArrayList;
import java.util.List;

@Singleton
@TransactionManagement(jakarta.ejb.TransactionManagementType.BEAN)
public class ShotDao {
    public void addShot(Shot shot) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(shot);
        transaction.commit();
        session.close();
    }

    public List<Shot> getShots(User user) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        List<Shot> list = session
                .createQuery("select x from Shot x where x.user = :user", Shot.class)
                .setParameter("user", user)
                .getResultList();
        return (list != null) ? list : new ArrayList<>();
    }

    public void deleteShots(User user) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.createQuery("delete from Shot x where x.user = :user")
                .setParameter("user", user)
                .executeUpdate();
        transaction.commit();
        session.close();
    }


}
