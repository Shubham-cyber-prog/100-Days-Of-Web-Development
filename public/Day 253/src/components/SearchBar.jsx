const SearchBar = ({ ingredients, setIngredients, onSearch }) => {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Enter ingredients (e.g., chicken, rice)"
        className="w-full p-3 rounded-xl shadow-md border focus:ring-2 focus:ring-orange-400 outline-none"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-orange-500 text-white px-6 rounded-xl hover:bg-orange-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;