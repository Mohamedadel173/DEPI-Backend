import Level from "../models/levelModel.js";

export const createLevel = async (req, res) => {
  try {
    const { title, description, price, order } = req.body;

    if (!title || !description || !price || !order)
      return res.status(400).json({ message: "Make sure you enter the data correctly!" });

    const newLevel = await Level.create({ title, description, price, order });
    res.status(201).json({ message: "Level created successfully", newLevel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLevelDetails = async (req, res) => {
  try {
    const { levelId } = req.params;
    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    res.status(200).json({ level });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};