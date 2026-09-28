const express = require("express");
const router = express.Router();
const studentStore = require("../data/students");
const { createError } = require("../middleware/errorHandler");

// GET /students            - all students
// GET /students?course=BCA - filter by course (extra feature)
router.get("/", (req, res) => {
  const { course } = req.query;
  const data = studentStore.getAll(course);
  res.status(200).json({ success: true, count: data.length, data });
});

// GET /students/:id
router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return next(createError(400, "Invalid student id"));

  const student = studentStore.getById(id);
  if (!student) return next(createError(404, "Student not found"));

  res.status(200).json({ success: true, data: student });
});

// POST /students
router.post("/", (req, res, next) => {
  const { name, course } = req.body || {};
  if (!name || !course) {
    return next(createError(400, "Name and course are both required"));
  }

  const student = studentStore.create({ name, course });
  res.status(201).json({ success: true, data: student });
});

// PUT /students/:id
router.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return next(createError(400, "Invalid student id"));

  const { name, course } = req.body || {};
  if (!name && !course) {
    return next(createError(400, "Provide at least one field to update"));
  }

  const updates = {};
  if (name) updates.name = name;
  if (course) updates.course = course;

  const updated = studentStore.update(id, updates);
  if (!updated) return next(createError(404, "Student not found"));

  res.status(200).json({ success: true, data: updated });
});

// DELETE /students/:id
router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return next(createError(400, "Invalid student id"));

  const removed = studentStore.remove(id);
  if (!removed) return next(createError(404, "Student not found"));

  res.status(200).json({ success: true, message: "Student deleted successfully" });
});

module.exports = router;
