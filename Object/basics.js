"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  let person = {
    firstName: "Seongtae",
    age: 23,
    student: true
  };

  let person3 = {
    firstName: "Seongtae",
    age: 23,
    student: true
  };

  let person2 = {
    firstName: "other peter",
    age: 28,
    student: false
  };

  // #5
  //   if (person3 == person) console.log("same!!");
  //   else console.log("not same!!");
  //   console.log(person);
  //   console.log(person3);

  //   person.firstName = person3.firstName;
  //   person.age = person3.age;
  //   person.student = person3.student;
  //   if (person3 == person) console.log("same!!");
  //   else console.log("not same!!");
  //   console.log(person);
  //   console.log(person3);

  // #4
  // let person3 = person;
  // if (person3 == person) console.log("same!!");
  // else console.log("not same!!");

  // #3 garbage collector가 필요한 이유 person 객체가 사라짐
  // let person3 = person;

  // person3.firstName = "Changed";
  // person3 = person2;
  // person2.firstName = "alsoChanged";
  // person = person3;

  // console.log(person);
  // console.log(person2);
  // console.log(person3);

  // #2
  // const person2 = person;
  // let person3 = person2;
  // person3.firstName = "other peter";

  // console.log(person);
  // console.log(person2);
  // console.log(person3);

  // #1
  // console.log(person.lastName);
  // person.lastName = "Kim";
  // console.log(person.lastName);
  // delete person.lastName;
  // console.log(person.lastName);

  // console.log(person);

  // person.age++;
  // console.log(person.age);
  // console.log(person);
}
