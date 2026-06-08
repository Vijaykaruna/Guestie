import { useEffect, useState } from "react";
import Foods from "../assets/totalFoods.png";

export const useFoodPage = ({ foodControl }) => {
  const { foodList, deleteFood, addNewFood, updateFood } = foodControl;

  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [listCategory, setListCategory] = useState({
    breakFast: [],
    lunch: [],
    dinner: [],
    refreshment: [],
  });

  const [countCategory, setCountCategory] = useState({
    breakFast: 0,
    lunch: 0,
    dinner: 0,
    refreshment: 0,
  });

  useEffect(() => {
    const breakFast = foodList.filter((food) => food.category === "BreakFast");
    const lunch = foodList.filter((food) => food.category === "Lunch");
    const dinner = foodList.filter((food) => food.category === "Dinner");
    const refreshment = foodList.filter(
      (food) => food.category === "Refreshment",
    );

    setListCategory({
      breakFast: breakFast,
      lunch: lunch,
      dinner: dinner,
      refreshment: refreshment,
    });

    setCountCategory({
      breakFast: breakFast.length,
      lunch: lunch.length,
      dinner: dinner.length,
      refreshment: refreshment.length,
    });
  }, [foodList]);

  const FoodsCategory = [
    { title: "BreakFast", img: Foods, label: countCategory.breakFast },
    { title: "Lunch", img: Foods, label: countCategory.lunch },
    { title: "Dinner", img: Foods, label: countCategory.dinner },
    { title: "Refreshment", img: Foods, label: countCategory.refreshment },
  ];

  const handleAddFood = async (addFoodDetails) => {
    await addNewFood(addFoodDetails);
    setShowAddFoodModal(false);
  };

  const handleUpdateFood = async (foodId, addFoodDetails) => {
    await updateFood(foodId, addFoodDetails);
    setShowAddFoodModal(false);
  };

  const handleDeleteFoodById = (foodId) => {
    deleteFood(foodId);
  };

  return {
    showAddFoodModal,
    editingFood,
    FoodsCategory,
    listCategory,
    setShowAddFoodModal,
    setEditingFood,
    handleDeleteFoodById,
    handleAddFood,
    handleUpdateFood,
  };
};
