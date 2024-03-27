import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
const sortOption = [
  { label: "Category", value: "name" },
  { label: "Popular", value: "popularSection" },
  { label: "Newest Post", value: "newestPost" },
  { label: "Newest Comment", value: "newestComment" },
];

export default function ForumMainPage() {
  const [errorMessage, setErrorMessage] = useOutletContext();
  const [categoryListWithPost, setCategoriesListPost] = useState();
  const [sort, setSort] = useState("name");
  useEffect(() => {
    const getCategoryListWithPost = async () => {
      try {
        const categoryListRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/categories/all/sort/${sort}`
        );
        console.log(categoryListRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getCategoryListWithPost();
  }, [setErrorMessage, sort]);

  return (
    <div className="w-5/6">
      <div className="flex items-center py-5 space-x-5">
        <b className="text-2xl">Section:</b>
      </div>
      <div className="flex items-center space-x-5">
        <span className="text-xl">Sorted By:</span>
        <Select
          className="w-56"
          defaultValue={{ label: "Category", value: "name" }}
          options={sortOption}
          onChange={(e) => setSort(e.value)}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              background: "oklch(var(--b1))",
              border: "2px solid oklch(var(--b3))",
            }),
          }}
        />
      </div>
    </div>
  );
}
