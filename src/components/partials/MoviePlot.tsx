import { useSelector } from "../../redux/rootReducer";
import { shallowEqual } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import "../styles.css";

export default function MovieInfo() {
  const { usableMovieData } = useSelector(
    (state) => state.movies,
    shallowEqual
  );
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { Plot } = usableMovieData;

  function displayPlot() {
    setOpen(true);
  }

  function hidePlot() {
    setOpen(false);
  }

  function handlePageClick(data: any) {
    setPageNumber(data.selected);
  }

  return (
    <>
      <IconButton onClick={open ? hidePlot : displayPlot}>
        <Button>{open ? "Hide" : "View"} plot.</Button>
      </IconButton>
      <div className={open ? "" : "hidden"}>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Plot?.length ?? 0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
        <p>
          {Plot
            ? Plot[pageNumber].concat(pageNumber < Plot.length - 1 ? "..." : "")
            : "No Plot"}
        </p>
      </div>
    </>
  );
}
