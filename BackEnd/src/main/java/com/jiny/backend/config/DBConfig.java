package com.jiny.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariConfig;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.Objects;


@Configuration
@MapperScan(basePackages = {"com.jiny.backend"}, sqlSessionFactoryRef = "dbSqlSessionFactory")
public class DBConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.db.hikari")
    public HikariConfig hikariConfigDB() {
        return new HikariConfig();
    }

    @Bean(name="etmDataSource")
    @ConfigurationProperties(prefix="spring.db")
    public HikariDataSource etmDataSource() {
        return new HikariDataSource(hikariConfigDB());
    }

    @Bean
    @Primary
    public PlatformTransactionManager etmTxManager() {
        DataSourceTransactionManager etmTxManager = new DataSourceTransactionManager(etmDataSource());
        etmTxManager.setGlobalRollbackOnParticipationFailure(false);
        return etmTxManager;
    }

    @Bean(name = "dbSqlSessionFactory")
    @Primary
    public SqlSessionFactory dbSqlSessionFactory(@Qualifier("etmDataSource") HikariDataSource etmDataSource) throws Exception {

        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(etmDataSource);
        Objects.requireNonNull(sqlSessionFactoryBean.getObject()).getConfiguration().setMapUnderscoreToCamelCase(true);

        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "dbSqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory dbSqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(dbSqlSessionFactory);
    }

}
