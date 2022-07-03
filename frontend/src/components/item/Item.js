import React, { useState, useRef } from "react";
import axios from "axios";
import useItemsContext from "../../hooks/useItemsContext";
import { categories } from "../../data/data";
import { Box, Select } from "@chakra-ui/react";

const Item = ({ id, itemName, amount, category, description, setIsUpdate }) => {
  const { dispatch } = useItemsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdateBtn, setIsUpdateBtn] = useState(false);
  const [chosenCategory, setChosenCategory] = useState("");
  const [val, setVal] = useState("");

  // declare useRef
  const itemNameInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();

  function handleSetCategory(e) {
    setChosenCategory(e.target.value);
  }

  const handleOpenEditMode = (val) => {
    setVal(val);
    setIsUpdateBtn(!isUpdateBtn);
    setIsEditing(!isEditing);
  };

  const handleUpdateItem = () => {
    const enteredInfo = {
      _id: id,
      itemName: val === "NAME" ? itemNameInputRef.current.value : itemName,
      amount: val === "AMOUNT" ? amountInputRef.current.value : amount,
      category: val === "CATEGORY" ? chosenCategory : category,
      description:
        val === "NOTE" ? descriptionInputRef.current.value : description,
    };
    console.log(enteredInfo);
    axios
      .patch(`/items/${id}`, enteredInfo)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "UPDATE_ITEM", payload: enteredInfo });
        setIsUpdate(true);
        setIsUpdateBtn(false);
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
    setVal("");
  };

  const handleDeleteItem = () => {
    axios
      .delete(`/items/${id}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "DELETE_ITEM", payload: id });
      })
      .catch((error) => console.log(error));
  };

  const selectOptionTag = (
    <Select onChange={handleSetCategory} placeholder="Select" id="category">
      {categories.map((category, index) => {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      })}
    </Select>
  );

  return (
    <Box p={6} border="1px solid rgb(226, 232, 240)" borderRadius={8}>
      <p>
        Name:{" "}
        {isEditing && val === "NAME" ? (
          <input ref={itemNameInputRef} type="text" placeholder={itemName} />
        ) : (
          itemName
        )}
        <button
          onClick={
            isUpdateBtn ? handleUpdateItem : () => handleOpenEditMode("NAME")
          }
        >
          {isUpdateBtn && val === "NAME" ? "Update" : "Edit"}
        </button>
      </p>
      <p>
        Amount:{" "}
        {isEditing && val === "AMOUNT" ? (
          <input ref={amountInputRef} type="number" placeholder={amount} />
        ) : (
          amount
        )}
        <button
          onClick={
            isUpdateBtn && val === "AMOUNT"
              ? handleUpdateItem
              : () => handleOpenEditMode("AMOUNT")
          }
        >
          {isUpdateBtn && val === "AMOUNT" ? "Update" : "Edit"}
        </button>
      </p>
      <div>
        Category: {isEditing && val === "CATEGORY" ? selectOptionTag : category}
        <button
          onClick={
            isUpdateBtn && val === "CATEGORY"
              ? handleUpdateItem
              : () => handleOpenEditMode("CATEGORY")
          }
        >
          {isUpdateBtn && val === "CATEGORY" ? "Update" : "Edit"}
        </button>
      </div>
      <p style={{ display: "flex", flexDirection: "row" }}>
        Note:{" "}
        {isEditing && val === "NOTE" ? (
          <textarea
            name=""
            ref={descriptionInputRef}
            // id="description"
            cols="10"
            rows="4"
            placeholder={description}
          ></textarea>
        ) : (
          description
        )}
        <button
          onClick={
            isUpdateBtn ? handleUpdateItem : () => handleOpenEditMode("NOTE")
          }
        >
          {isUpdateBtn && val === "NOTE" ? "Update" : "Edit"}
        </button>
      </p>
      <button onClick={handleDeleteItem}>Delete</button>
    </Box>
  );
};

export default Item;
