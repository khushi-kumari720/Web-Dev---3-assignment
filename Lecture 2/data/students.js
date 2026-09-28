// In-memory student data store (class-based), Array + JSON only

class StudentStore {
  constructor() {
    this.students = [
      { id: 101, name: "Rahul", course: "BCA" },
      { id: 102, name: "Priya", course: "BTech" },
      { id: 103, name: "Amit", course: "BCA" },
    ];
    this.lastId = 103;
  }

  getAll(courseFilter) {
    if (courseFilter) {
      return this.students.filter(
        (s) => s.course.toLowerCase() === courseFilter.toLowerCase()
      );
    }
    return this.students;
  }

  getById(id) {
    return this.students.find((s) => s.id === id) || null;
  }

  create({ name, course }) {
    this.lastId += 1;
    const student = { id: this.lastId, name, course };
    this.students.push(student);
    return student;
  }

  update(id, updates) {
    const student = this.getById(id);
    if (!student) return null;
    Object.assign(student, updates);
    return student;
  }

  remove(id) {
    const before = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    return this.students.length < before;
  }
}

// Single shared instance acts as the in-memory "database"
module.exports = new StudentStore();
