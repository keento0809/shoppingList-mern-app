import React from "react";

const ItemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS": {
      return {
        items: [...action.payload],
      };
    }
    case "ADD_NEW_ITEM": {
      return {
        items: [...state.items, action.payload],
      };
    }
    case "UPDATE_ITEM": {
      const item = state.items.find((item) => item._id === action.payload.id);
      item.itemName = action.payload.itemName;
      item.amount = action.payload.amount;
      item.category = action.payload.category;
      item.description = action.payload.description;
      console.log(item);
      return {
        items: state.items,
      };
    }
    case "DELETE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item._id !== action.payload
      );
      console.log(updatedItems, action.payload);
      return {
        items: updatedItems,
      };
    }
    default: {
      return state;
    }
  }
};

export default ItemsReducer;