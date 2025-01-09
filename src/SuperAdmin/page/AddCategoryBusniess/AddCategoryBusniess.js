import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddBusinessCategories, fetchCategories } from "../../ApiServices";

const AddCategoryBusiness = ({ open, onClose, fetchDocuments }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    parentId: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("categoryName", formData.categoryName);
      formDataToSend.append("parentId", formData.parentId);

      const response = await AddBusinessCategories(formDataToSend);
      toast.success("Category added successfully");
      setFormData({ categoryName: "", parentId: "" });
      fetchDocuments();
      onClose();
    } catch (err) {
      console.error("Error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="categoryName"
            label="Category Name"
            value={formData.categoryName}
            onChange={handleChange}
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
          />

          <Select
            fullWidth
            displayEmpty
            value={formData.parentId}
            name="parentId"
            onChange={handleChange}
          >
            <MenuItem value="">No Parent (Root Category)</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>

        <DialogActions>
          <button onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </DialogActions>
        <ToastContainer />
      </form>
    </Dialog>
  );
};

export default AddCategoryBusiness;
