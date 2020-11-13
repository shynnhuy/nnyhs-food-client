import React from "react";
import "assets/scss/NotFound.scss";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <div></div>
          <h1>404</h1>
        </div>
        <h2>Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <button onClick={() => history.push("/")}>
          back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
