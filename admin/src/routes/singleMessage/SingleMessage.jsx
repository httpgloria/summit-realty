import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function SingleMessage() {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <div className="padding-y">
      <h3>{data.subject}</h3>
      <p>
        <small>
          By: {data.firstName} {data.lastName} ({data.username})
        </small>
      </p>
      <p>
        <small>At: {data.sentAt}</small>
      </p>
      <p>{data.message}</p>
    </div>
  );
}

export default SingleMessage;
