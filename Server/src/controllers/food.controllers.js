import FoodsModal from "../models/food.model.js";

const cleanFoodPayload = (body) => ({
  title: String(body.title || "").trim(),
  category: String(body.category || "").trim(),
  price: Number(body.price),
  description: String(body.description || "Freshly prepared and delivered to your room.").trim(),
  image: String(body.image || ""),
  isAvailable: body.isAvailable === undefined ? true : Boolean(body.isAvailable),
});

export const addFood = async (req, res) => {
  const userId = req.user.id;
  try {
    const payload = cleanFoodPayload(req.body);

    if (!payload.title || !payload.category || !payload.price) {
      return res.status(400).json({ message: "Food name, category and price are required" });
    }

    await FoodsModal.create({ userId, ...payload });
    res.status(200).json({ message: "Food added successfully" });
  } catch (e) {
    console.error("ADD FOOD ERROR:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { _id } = req.body;
    const payload = cleanFoodPayload(req.body);

    if (!_id) return res.status(400).json({ message: "Food ID is required" });
    if (!payload.title || !payload.category || !payload.price) {
      return res.status(400).json({ message: "Food name, category and price are required" });
    }

    const updated = await FoodsModal.findByIdAndUpdate(_id, payload, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food updated" });
  } catch (e) {
    console.error("UPDATE FOOD ERROR:", e);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const deleted = await FoodsModal.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("DELETE FOOD ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFoods = async (req, res) => {
  const userId = req.user.id;
  try {
    const foods = await FoodsModal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching food items:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
