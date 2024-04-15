import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useLoadCategories = () => {
  const [categories, setCategories] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = await getAccessTokenSilently();
      const res = await axios.get(`${BACKEND_URL}/categories/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categoriesData = res.data;
      setCategories(categoriesData);
    };

    fetchCategories();
  }, [getAccessTokenSilently]);

  return { categories };
};

export default useLoadCategories;
