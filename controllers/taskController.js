const Task = require("../models/task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, boardId, status } = req.body;
    const task = await Task.create({
      title,
      description,
      board: boardId,
      status: status || "To Do",
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la tarea" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    const { title, description, status } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la tarea" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    await task.remove();
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
