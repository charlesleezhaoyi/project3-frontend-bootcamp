import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

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
    <div>
      {/* <Select
        options={["name","popularSection","newestPost","newestComment"]}
        isMulti
        styles={{
          control: (baseStyle) => ({
            ...baseStyle,
            background: "oklch(var(--b1))",
            border: "2px solid oklch(var(--b3))",
          }),
        }}
        onChange={(e) => setChoosenCategories(e)}
      /> */}
    </div>
  );
}
