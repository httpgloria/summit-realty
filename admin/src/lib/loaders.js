import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const postsLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = await apiRequest("/posts/admin?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const usersLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const usersPromise = await apiRequest("/users?" + query);
  return defer({
    usersResponse: usersPromise,
  });
};

export const messagesLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const inquiryPromise = await apiRequest("/inquiries?" + query);
  return defer({
    inquiryResponse: inquiryPromise,
  });
};

export const messageLoader = async ({ request, params }) => {
  const res = await apiRequest("/inquiries/" + params.id);
  return res;
};
