import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

console.log("API KEY:", API_KEY); // temporary debug

export const searchRecipes = async (params) => {
  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: API_KEY,
          addRecipeInformation: true,
          number: 12,
          ...params,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("API ERROR:", error.response?.data);
    return []; // IMPORTANT (fixes 2nd error)
  }
};