import React, { useEffect, useState } from "react";
import { categories } from "../../data/data";
import Item from "../item/Item";
import useItemsContext from "../../hooks/useItemsContext";
import axios from "axios";
import { Select, Box } from "@chakra-ui/react";

const ShoppingList = () => {
  const [chosenCategory, setChosenCategory] = useState("");
  const [tempList, setTempList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { items, dispatch } = useItemsContext();

  const fetchItems = () => {
    setIsLoading(true);
    axios
      .get("/items")
      .then((res) => {
        dispatch({ type: "SET_ITEMS", payload: res.data });
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
  };

  function handleSetCategory(e) {
    console.log(e.target.value);
    setChosenCategory(e.target.value);
    if (items.length > 0 && e.target.value === "") {
      setTempList(items);
    } else {
      const selectedCategory = e.target.value;
      const sortedItems = items.filter(
        (item) => item.category === selectedCategory
      );
      setTempList(sortedItems);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setTempList(items);
  }, [items.length, isUpdate]);

  return (
    <>
      <Box className="" py={8}>
        <span>Filtered by: </span>
        <Select
          focusBorderColor="pink.100"
          onChange={handleSetCategory}
          name=""
          id="category"
          placeholder="Select"
        >
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </Select>
      </Box>
      <ul style={{ paddingLeft: "0" }}>
        {/* original */}
        {isLoading ||
          (tempList && tempList.length === 0 && chosenCategory === "" && (
            <p>Loading...</p>
          ))}
        {!isLoading &&
          tempList &&
          tempList.length === 0 &&
          chosenCategory !== "" && <p>No Item Found</p>}
        {!isLoading &&
          tempList &&
          tempList.map((item, index) => {
            return (
              <li
                key={index}
                style={{ listStyle: "none", paddingBottom: "1rem" }}
              >
                <Item
                  id={item._id}
                  itemName={item.itemName}
                  amount={item.amount}
                  category={item.category}
                  description={item.description}
                  setIsUpdate={setIsUpdate}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ShoppingList;
