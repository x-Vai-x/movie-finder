import { useSelector } from "../../redux/rootReducer";
import { shallowEqual, useDispatch } from "react-redux";

import { useState } from "react";
import ReactPaginate from "react-paginate";

import "../styles.css";

export default function MovieInfo() {
  const dispatch = useDispatch();
  const { usableMovieData } = useSelector(
    (state) => state.movies,
    shallowEqual
  );

  const [pageNumber, setPageNumber] = useState(0);

  const { Plot } = usableMovieData;

  function handlePageClick(data: any) {
    setPageNumber(data.selected);
  }

  return (
    <>
      <div>
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
