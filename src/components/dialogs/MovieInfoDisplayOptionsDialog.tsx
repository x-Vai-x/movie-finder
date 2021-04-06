import React, { useState, useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import {
  setVisibleValues,
  hideFurtherInfo,
} from "../../redux/slices/movieSlice";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { VisibleValues } from "../../dataTypes";
import { useSelector } from "../../redux/rootReducer";

export default function MoveInfoDisplayOptionsDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<VisibleValues>({
    Runtime: false,
    Genres: false,
    Ratings: false,
    Plot: false,
  });

  const { furtherInfo, visibleValues } = useSelector(
    (state) => state.movies,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setValues(visibleValues);
  }, [furtherInfo, visibleValues]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(setVisibleValues(values));
    setOpen(false);
  }

  function handleChange(e: any) {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  }

  function handleHideInfo() {
    dispatch(hideFurtherInfo());
  }

  return (
    <>
      {furtherInfo ? (
        <IconButton onClick={handleHideInfo}>
          <ExpandLess />
        </IconButton>
      ) : (
        <IconButton onClick={handleClickOpen}>
          <ExpandMore />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Select display options.</DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  defaultChecked={values.Plot}
                  name="Plot"
                  color="primary"
                />
              }
              label="Plot"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  defaultChecked={values.Runtime}
                  name="Runtime"
                  color="primary"
                />
              }
              label="Runtime"
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name="Ratings"
                  defaultChecked={values.Ratings}
                  color="primary"
                />
              }
              label="Ratings"
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name="Genres"
                  defaultChecked={values.Genres}
                  color="primary"
                />
              }
              label="Genres"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">OK</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
