import React, { Suspense, useEffect, useState } from "react";
import MessagesFilter from "../../components/messagesFilter/MessagesFilter";
import { Await, useLoaderData } from "react-router-dom";
import InquiryCard from "../../components/inquiryCard/InquiryCard";

function Messages() {
  const data = useLoaderData();
  const [inquiries, setInquiries] = useState([]);

  return (
    <section className="posts padding-y">
      <MessagesFilter />
      <div className="posts-layout">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.inquiryResponse}
            errorElement={<p>Error loading inquiries.</p>}
          >
            {(inquiryResponse) => {
              useEffect(() => {
                setInquiries(inquiryResponse.data);
              }, [inquiryResponse]);

              return inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id} inquiry={inquiry} />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default Messages;
