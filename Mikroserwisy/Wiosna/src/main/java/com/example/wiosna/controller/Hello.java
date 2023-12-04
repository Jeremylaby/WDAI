package com.example.wiosna.controller;

import com.example.wiosna.dao.Person;
import com.example.wiosna.service.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class Hello {
    @Autowired
    private PersonServiceImpl personService;
    @GetMapping("/")
    public String just_hello(){
        return "Hello World";
    }
    @GetMapping("/hello")
    public ResponseEntity<Map<String,String>> hello(@RequestParam(value = "name", defaultValue = "John") String name){
        Map<String,String> json= Map.of("message", "Czesc " + name);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }
    @GetMapping("/person")
    public List<Person> getPersons(){
        return personService.getPersons();
    }
    @GetMapping("/person/id/{id}")
    public Person getPersonById(@PathVariable(value = "id")int id){
        return personService.getPerson(id);
    }
    @GetMapping("/person/surname/{surname}")
    public Person getPersonBySurname(@PathVariable(value= "surname") String surname){
        return personService.getPerson(surname);
    }
    @PostMapping("/create")
    public Person create(@RequestParam(value="name") String name,
                         @RequestParam(value = "surname") String surname,
                         @RequestParam(value = "job") String job){
        Person person=new Person(name,surname,job);
        return personService.create(person);
    }
    @PutMapping("/update/{id}")
    public Person updatePerson(@PathVariable(value = "id")int id,
                               @RequestParam(value="name") String name,
                               @RequestParam(value = "surname") String surname,
                               @RequestParam(value = "job") String job){
        Person person = personService.getPerson(id);
        if(person!=null){
            person.setSurname(surname);
            person.setJob(job);
            person.setName(name);
            return personService.create(person);
        }
        return person;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>>deletePerson(@PathVariable(value = "id")int id){
        Person person = personService.getPerson(id);
        if(person == null) {
            Map<String, String> json = Map.of("message", "Nie znaleziono osoby o takim id: " + id);
            return new ResponseEntity<>(json, HttpStatus.NOT_FOUND);
        }
        personService.delete(person);
        Map<String,String> json= Map.of("message", "Usunieto osobe o takim id:  " + id);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

}
