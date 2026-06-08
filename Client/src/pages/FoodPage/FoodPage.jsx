import Dosa from "../../assets/dosa.png";

import { MdDelete } from "react-icons/md";
import { FaPlusCircle, FaRupeeSign } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

import { useFoodPage } from "../../hooks/useFoodPage.js";
import { useEffect, useState } from "react";
import ModalAddFood from "../../components/ModalAddFood.jsx";

const FoodPage = ({ foodControl }) => {
  const useFood = useFoodPage({ foodControl });

  useEffect(() => {
    foodControl.getAllFoods();
  }, []);

  const [activeCategory, setActiveCategory] = useState("BreakFast");
  const getActiveFoods = () => {
    switch (activeCategory) {
      case "BreakFast":
        return useFood.listCategory.breakFast;
      case "Lunch":
        return useFood.listCategory.lunch;
      case "Dinner":
        return useFood.listCategory.dinner;
      case "Refreshment":
        return useFood.listCategory.refreshment;
      default:
        return [];
    }
  };

  const foods = getActiveFoods();

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card">
        <div>
          <span className="guest-kicker">Kitchen Menu</span>
          <h1>Manage food items</h1>
          <p>Add food images, prices, descriptions and availability for the guest ordering page.</p>
        </div>
        <button
          className="guest-add-btn admin-primary-action"
          onClick={() => {
            useFood.setEditingFood(null);
            useFood.setShowAddFoodModal(true);
          }}
        >
          <FaPlusCircle /> Add Food
        </button>
      </div>

      <div className="admin-stats-grid">
        {useFood.FoodsCategory.map(({ title, img, label }, index) => (
          <button
            key={index}
            className={`admin-stat-card ${activeCategory === title ? "active" : ""}`}
            onClick={() => setActiveCategory(title)}
          >
            <div>
              <span>{title}</span>
              <strong>{label}</strong>
            </div>
            <img src={img} alt={`${title}-icon`} />
          </button>
        ))}
      </div>

      <ModalAddFood useFood={useFood} />

      <div className="admin-content-card">
        <div className="guest-section-title">
          <div>
            <span>Food List</span>
            <h2>{activeCategory} Items</h2>
          </div>
          <p>{foods.length} items</p>
        </div>

        {foods.length > 0 ? (
          <div className="admin-food-grid">
            {foods.map((food) => (
              <article className="admin-food-card" key={food._id}>
                <img src={food.image || Dosa} alt={food.title} />
                <div className="admin-food-card-body">
                  <div className="d-flex justify-content-between gap-2 align-items-start">
                    <div>
                      <h3>{food.title}</h3>
                      <span className="admin-chip">{food.category}</span>
                    </div>
                    <strong className="admin-price"><FaRupeeSign />{Number(food.price).toFixed(2)}</strong>
                  </div>
                  <p>{food.description || "Freshly prepared and delivered to your room."}</p>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <span className={food.isAvailable === false ? "admin-status off" : "admin-status"}>
                      {food.isAvailable === false ? "Hidden" : "Available"}
                    </span>
                    <div className="d-flex gap-2">
                      <button
                        className="admin-icon danger"
                        onClick={() => useFood.handleDeleteFoodById(food._id)}
                        title="Delete food"
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="admin-icon"
                        onClick={() => {
                          useFood.setEditingFood(food);
                          useFood.setShowAddFoodModal(true);
                        }}
                        title="Edit food"
                      >
                        <MdModeEditOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="guest-empty">No food items available in {activeCategory}. Click Add Food to create one.</div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
