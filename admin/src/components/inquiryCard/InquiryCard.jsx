import React from "react";
import { Link } from "react-router-dom";

function InquiryCard({ inquiry }) {
  return (
    <div className="postCard">
      <div className="postCard-details">
        <h3>
          <Link to={`/messages/${inquiry.id}`}>{inquiry.subject}</Link>
        </h3>
        <p>From: {inquiry.username}</p>
      </div>
      <div className="postCard-actions"></div>
    </div>
  );
}

export default InquiryCard;
