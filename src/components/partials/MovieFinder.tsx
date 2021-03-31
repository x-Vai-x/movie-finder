import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getMovie } from "../../redux/thunkActions/movieThunk";

export default function MovieFinder() {
  const [values, setValues] = useState({ title: "" });
  const dispatch = useDispatch();

  function handleInputChange(event: any) {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const { title } = values;
    dispatch(getMovie(title));
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth
        onChange={handleInputChange}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
