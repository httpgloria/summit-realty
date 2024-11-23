import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function MessagesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    inquiry: searchParams.get("inquiry") || "",
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
            name="inquiry"
            placeholder="Search for an inquiry..."
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

export default MessagesFilter;
