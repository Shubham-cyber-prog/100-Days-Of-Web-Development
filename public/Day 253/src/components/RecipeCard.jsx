import { FaHeart } from "react-icons/fa";

const RecipeCard = ({ recipe, toggleFavorite, favorites }) => {
  const isFav = favorites.some((fav) => fav.id === recipe.id);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{recipe.title}</h2>
        <p className="text-sm text-gray-500">
          ⏱ {recipe.readyInMinutes} mins
        </p>
        <button
          onClick={() => toggleFavorite(recipe)}
          className={`mt-3 flex items-center gap-2 ${
            isFav ? "text-red-500" : "text-gray-400"
          }`}
        >
          <FaHeart /> Favorite
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;