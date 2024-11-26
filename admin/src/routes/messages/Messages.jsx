import React, { Suspense, useEffect, useState } from "react";
import MessagesFilter from "../../components/messagesFilter/MessagesFilter";
import { Await, useLoaderData } from "react-router-dom";
import InquiryCard from "../../components/inquiryCard/InquiryCard";
import apiRequest from "../../lib/apiRequest";
import { useMessageStore } from "../../lib/messageStore";

function Messages() {
  const data = useLoaderData();
  const [inquiries, setInquiries] = useState([]);
  const decrease = useMessageStore((state) => state.decrease);

  const handleClick = async (inquiry) => {
    if (!inquiry.seen) {
      try {
        await apiRequest.put(`/inquiries/${inquiry.id}`, {
          seen: true,
        });
        setInquiries((prevInquiries) =>
          prevInquiries.map((currInquiry) =>
            inquiry.id == currInquiry.id
              ? { ...currInquiry, seen: true }
              : currInquiry
          )
        );
        decrease();
        console.log("Just seen!");
      } catch (error) {
        console.error("Error with changing inquiry status", error);
      }
    }
  };

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
                <InquiryCard
                  key={inquiry.id}
                  inquiry={inquiry}
                  handleClick={handleClick}
                />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default Messages;
