import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const useLoadCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${BACKEND_URL}/categories`);
      const categoriesData = res.data;
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return { categories };
};

export default useLoadCategories;
