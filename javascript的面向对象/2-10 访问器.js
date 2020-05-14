const data = [
  { name: "刘慧", age: 18 },
  { name: "刘2", age: 12 },
  { name: "刘2", age: 100 },
];

class Lesson {
  constructor(data) {
    this.model = data;
  }

  price() {
    return this.model.age;
  }
  static createbatch(data) {
    return data.map((item) => new Lesson(item));
  }

  static maxPrice(data) {
    return data.sort((a, b) => b.price() - a.price())[0];
  }
}

let lessons = Lesson.createbatch(data);
console.log(Lesson.maxPrice(lessons).price());
