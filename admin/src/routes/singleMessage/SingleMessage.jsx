import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import "./singleMessages.scss";

function SingleMessage() {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <div className="message padding-y">
      <div className="message__wrapper">
        <h3>{data.subject}</h3>
        <p className="message__detail">
          <small>
            By: {data.firstName} {data.lastName} ({data.username})
          </small>
        </p>
        <p className="message__detail">
          <small>At: {data.sentAt}</small>
        </p>
        <p>{data.message}</p>
      </div>
    </div>
  );
}

export default SingleMessage;
