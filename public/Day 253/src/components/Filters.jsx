const Filters = ({ filters, setFilters }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-4">
      <select
        className="p-2 rounded-lg border"
        onChange={(e) =>
          setFilters({ ...filters, cuisine: e.target.value })
        }
      >
        <option value="">Cuisine</option>
        <option value="Italian">Italian</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
      </select>

      <select
        className="p-2 rounded-lg border"
        onChange={(e) =>
          setFilters({ ...filters, diet: e.target.value })
        }
      >
        <option value="">Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten free">Gluten Free</option>
      </select>

      <select
        className="p-2 rounded-lg border"
        onChange={(e) =>
          setFilters({ ...filters, maxReadyTime: e.target.value })
        }
      >
        <option value="">Cooking Time</option>
        <option value="15">Under 15 mins</option>
        <option value="30">Under 30 mins</option>
        <option value="60">Under 1 hour</option>
      </select>

      <select
        className="p-2 rounded-lg border"
        onChange={(e) =>
          setFilters({ ...filters, difficulty: e.target.value })
        }
      >
        <option value="">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
      </select>
    </div>
  );
};

export default Filters;