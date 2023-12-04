package com.example.wiosna.service;

import com.example.wiosna.dao.Person;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PersonService {
    public List<Person> getPersons();
    public Person getPerson(String surname);

    public Person create(Person person);
    public Person getPerson(int id);


}
