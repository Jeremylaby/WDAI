package com.example.wiosna;

import com.example.wiosna.repository.PersonsRepository;
import org.springframework.boot.CommandLineRunner;
import 	com.example.wiosna.dao.Person;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WiosnaApplication {

    public static void main(String[] args) {
        SpringApplication.run(WiosnaApplication.class, args);
    }
    @Bean
    public CommandLineRunner demo(PersonsRepository repository) {
        return (args) -> {
            repository.save(new Person("John", "Doe","IT"));
            repository.save(new Person("John", "Smith","tester"));
            repository.save(new Person());
            repository.findAll().forEach(customer -> {
                System.out.println((customer.toString()));
            });
        };
    }

}
