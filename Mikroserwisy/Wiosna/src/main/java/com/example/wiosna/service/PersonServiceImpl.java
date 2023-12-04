package com.example.wiosna.service;

import com.example.wiosna.dao.Person;
import com.example.wiosna.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService{
    @Autowired
    private PersonsRepository personsRepository;

    @Override
    public List<Person> getPersons() {
        return personsRepository.findAll();
    }

    @Override
    public Person getPerson(String surname) {
        return personsRepository.findBySurname(surname);
    }



    @Override
    public Person create(Person person) {
        return personsRepository.save(person);
    }

    @Override
    public Person getPerson(int id) {
        return personsRepository.findById(id);
    }
    public void delete(Person person) {

        personsRepository.delete(person);
    }
}
