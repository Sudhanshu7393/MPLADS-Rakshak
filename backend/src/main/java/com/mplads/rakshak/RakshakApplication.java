package com.mplads.rakshak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RakshakApplication {

    public static void main(String[] args) {
        SpringApplication.run(RakshakApplication.class, args);
    }
}
