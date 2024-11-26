import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./usersFilter.scss";

function UsersFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    username: searchParams.get("username") || "",
    date: searchParams.get("date") || "latest",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Query:", query);
    setSearchParams(query);
  };

  return (
    <div>
      <form
        className="posts-search users-search"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-field search">
          <input
            type="text"
            name="username"
            placeholder="Search for a username..."
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <select name="date" id="date" onChange={handleChange}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button className="btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
}

export default UsersFilter;
