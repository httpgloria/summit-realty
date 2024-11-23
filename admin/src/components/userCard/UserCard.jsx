import {
  RiDeleteBin5Line,
  RiFlagLine,
  RiIndeterminateCircleLine,
} from "@remixicon/react";
import React from "react";

function UserCard({ user, handleBan, users, unbanUser }) {
  return (
    <>
      <div className="postCard">
        <div className="postCard-details">
          <h3>{user.username}</h3>
        </div>
        <div className="postCard-actions">
          {!user.isBanned ? (
            <button
              className={`postCard-actions__flag`}
              onClick={() => handleBan(user)}
            >
              <RiIndeterminateCircleLine />
            </button>
          ) : (
            <button
              className={`postCard-actions__flag postCard-actions__flag-outline`}
              onClick={() => unbanUser(user)}
            >
              <RiIndeterminateCircleLine />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default UserCard;
