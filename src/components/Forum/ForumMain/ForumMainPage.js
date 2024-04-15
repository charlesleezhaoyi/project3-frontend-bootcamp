import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import SectionColumn from "./SectionColumn";
import Loading from "../../Common/Loading";
import { useAuth0 } from "@auth0/auth0-react";

const sortOption = [
  { label: "Category", value: "name" },
  { label: "Popular Section", value: "popularSection" },
  { label: "Newest Post", value: "newestPost" },
  { label: "Newest Comment", value: "newestComment" },
];

export default function ForumMainPage() {
  const [, setErrorMessage] = useOutletContext();
  const [categoryList, setCategoryList] = useState([]);
  const [sort, setSort] = useState("name");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/categories/all/sort/${sort}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoryList(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getCategoryList();
  }, [setErrorMessage, sort, getAccessTokenSilently]);

  const sectionList = !!categoryList.length ? (
    categoryList.map((category) => (
      <SectionColumn
        category={category}
        sort={sort}
        setErrorMessage={setErrorMessage}
        key={category.id}
      />
    ))
  ) : (
    <Loading />
  );

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
      <div className="py-5 space-y-5">{sectionList}</div>
    </div>
  );
}
