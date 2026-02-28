import { useState } from "react";
import { searchRecipes } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleSearch = async () => {
    const data = await searchRecipes({
      query: ingredients,
      ...filters,
    });
    setRecipes(data);
  };

  const toggleFavorite = (recipe) => {
    let updated;
    if (favorites.find((fav) => fav.id === recipe.id)) {
      updated = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updated = [...favorites, recipe];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <SearchBar
        ingredients={ingredients}
        setIngredients={setIngredients}
        onSearch={handleSearch}
      />
      <Filters filters={filters} setFilters={setFilters} />

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;