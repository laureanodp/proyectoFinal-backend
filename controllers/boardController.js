const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const board = await Board.create({ name, description, owner: req.user.id });
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el tablero" });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id }).populate(
      "members",
      "name email"
    );
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tableros" });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board || board.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Tablero no encontrado o no autorizado" });
    }
    const { name, description } = req.body;
    board.name = name || board.name;
    board.description = description || board.description;
    await board.save();
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el tablero" });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board || board.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Tablero no encontrado o no autorizado" });
    }
    await board.remove();
    res.status(200).json({ message: "Tablero eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tablero" });
  }
};
