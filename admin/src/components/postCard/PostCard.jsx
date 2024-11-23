import React from "react";
import { Link } from "react-router-dom";
import "./postCard.scss";
import {
  RiDeleteBin2Line,
  RiDeleteBin3Line,
  RiDeleteBin4Fill,
  RiDeleteBin5Line,
  RiEyeLine,
  RiFlagLine,
} from "@remixicon/react";
import apiRequest from "../../lib/apiRequest";

function PostCard({ item, setPosts, posts, handleDelete }) {
  const currentItem = posts.find((post) => post.id === item.id) || item;

  const handleFlag = async () => {
    try {
      await apiRequest.put(`/posts/${item.id}`, {
        isFlagged: !currentItem.isFlagged,
        images: item.images,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === item.id ? { ...post, isFlagged: !post.isFlagged } : post
        )
      );
    } catch (error) {
      console.error("Error updating flag status", error);
    }
  };

  return (
    <>
      <div className="postCard">
        <div className="postCard-details">
          <h3>{item.title}</h3>
          <p className="postCard-details__text">{item.property}</p>
          <p>${item.price}</p>
        </div>
        <div className="postCard-actions">
          <Link to={`http://localhost:5174/${item.id}`}>
            <button>
              <RiEyeLine />
            </button>
          </Link>
          <button
            className={`postCard-actions__flag ${
              currentItem.isFlagged ? `postCard-actions__flag-outline` : ``
            }`}
            onClick={handleFlag}
          >
            <RiFlagLine />
          </button>
          <button
            className="postCard-actions__delete"
            onClick={() => handleDelete(currentItem)}
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCard;
