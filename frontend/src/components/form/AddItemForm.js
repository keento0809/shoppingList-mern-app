import { useState } from "react";
import useItemsContext from "../../hooks/useItemsContext";
import useAlertContext from "../../hooks/useAlertContext";
import useAuthContext from "../../hooks/useAuthContext";
import {
  Input,
  Textarea,
  FormLabel,
  FormControl,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { initialAlertInfoState } from "../../contexts/alertContext";
import { addNewItem } from "../../helpers/api/addNewItem";
import AddButton from "../button/AddButton";
import ItemCategorySelect from "../select/ItemCategorySelect";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AddItemForm = ({ onClose }) => {
  const [itemInput, setItemInput] = useState({
    itemName: "",
    itemAmount: "",
    itemCategory: "",
    itemDescription: "",
  });

  const { dispatch } = useItemsContext();
  const { setAlertInfo } = useAlertContext();
  const { currentUser } = useAuthContext();
  const [isLargerThan1024] = useMediaQuery("(min-width:1024px)");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setItemInput({
      ...itemInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (
      itemInput.itemName === "" ||
      itemInput.itemAmount === "" ||
      itemInput.chosenCategory === ""
    ) {
      console.log("Invalid input value");
      return;
    }

    const enteredInfo = {
      itemName: itemInput.itemName,
      amount: itemInput.itemAmount,
      category: itemInput.itemCategory,
      description: itemInput.itemDescription ? itemInput.itemDescription : "",
    };

    await addNewItem(currentUser._id, enteredInfo)
      .then((res) => {
        dispatch({ type: "ADD_NEW_ITEM", payload: res.data });
        setIsSubmit(false);
        setItemInput({
          itemName: "",
          itemAmount: "",
          itemCategory: "",
          itemDescription: "",
        });
      })
      .catch((error) => console.log(error.message));

    setAlertInfo({
      isAlert: true,
      status: "success",
      text: "Item successfully added to List!",
    });

    onClose();
    setTimeout(() => {
      setAlertInfo(initialAlertInfoState);
    }, 2000);
  };
  return (
    <Box pt={6} maxWidth={isLargerThan1024 && "380px"}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <FormControl isInvalid={isSubmit && itemInput.itemName === ""}>
          <FormLabel htmlFor="itemName" fontSize={isLargerThan1024 && "sm"}>
            ItemName
          </FormLabel>
          <Input
            name="itemName"
            px={4}
            py={1}
            focusBorderColor="pink.100"
            value={itemInput.itemName}
            onChange={handleChange}
            id="itemName"
            type="text"
            placeholder="Enter ItemName"
          />
          {isSubmit && <ErrorMessage text={"ItemName is required."} />}
        </FormControl>
        <FormControl isInvalid={isSubmit && itemInput.itemAmount === ""}>
          <FormLabel
            htmlFor="amount"
            pt={4}
            fontSize={isLargerThan1024 && "sm"}
          >
            Amount
          </FormLabel>
          <Input
            name="itemAmount"
            px={4}
            py={1}
            focusBorderColor="pink.100"
            value={itemInput.itemAmount}
            onChange={handleChange}
            id="amount"
            type="number"
            placeholder="Enter Amount"
          />
          {isSubmit && <ErrorMessage text={"Amount is required."} />}
        </FormControl>
        <FormControl isInvalid={isSubmit && itemInput.itemCategory === ""}>
          <FormLabel
            htmlFor="category"
            pt={4}
            fontSize={isLargerThan1024 && "sm"}
          >
            Category
          </FormLabel>
          <ItemCategorySelect
            onChange={handleChange}
            name={"itemCategory"}
            value={itemInput.itemCategory}
          />
          {isSubmit && <ErrorMessage text={"Category is required."} />}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="price" pt={4} fontSize={isLargerThan1024 && "sm"}>
            Note
          </FormLabel>
          <Textarea
            name="itemDescription"
            px={4}
            py={1}
            focusBorderColor="pink.100"
            onChange={handleChange}
            value={itemInput.itemDescription}
            id="description"
            cols="10"
            rows="4"
            placeholder="Enter Description"
          ></Textarea>
        </FormControl>
        <Box my={8}>
          <AddButton />
        </Box>
      </form>
    </Box>
  );
};

export default AddItemForm;
