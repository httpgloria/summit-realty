import React, { useState } from "react";
import "./postsFilter.scss";
import { useSearchParams } from "react-router-dom";

function PostsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    title: searchParams.get("title") || "",
    type: searchParams.get("type") || "",
    date: searchParams.get("date") || "latest",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 100,
    maxPrice: searchParams.get("maxPrice") || 10000000,
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
      <form className="posts-search" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-field">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <select name="date" id="date" onChange={handleChange}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select name="type" id="type" onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <select name="property" id="property" onChange={handleChange}>
            <option value="">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostsFilter;
