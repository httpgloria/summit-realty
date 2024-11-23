import React, { Suspense, useEffect, useState } from "react";
import "./posts.scss";
import PostCard from "../../components/postCard/PostCard";
import PostsFilter from "../../components/postsFilter/PostsFilter";
import { Await, useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import apiRequest from "../../lib/apiRequest";

function Posts() {
  const data = useLoaderData();
  const [posts, setPosts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState({});

  const handleDelete = (currentItem) => {
    setPostToDelete(currentItem);
    setIsDeleting(true);
  };

  const deleteItem = async () => {
    try {
      console.log("confirm deletion of:", postToDelete);
      await apiRequest.delete(`/posts/${postToDelete.id}`);
      setPosts(
        posts.filter((post) => {
          return post.id !== postToDelete.id;
        })
      );
      setIsDeleting(false);
      setPostToDelete({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isDeleting) {
      setPostToDelete({});
    }
  }, [isDeleting]);

  return (
    <section className="posts padding-y">
      <PostsFilter />
      {isDeleting && (
        <Modal
          action={deleteItem}
          setVisible={setIsDeleting}
          prompt={`Are you sure you want to delete this post?`}
          canBeUndone={true}
        />
      )}
      <p>({posts.length}) Results</p>
      <div className="posts-layout">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts.</p>}
          >
            {(postResponse) => {
              useEffect(() => {
                setPosts(postResponse.data);
              }, [postResponse]);

              return posts.map((post) => (
                <PostCard
                  key={post.id}
                  item={post}
                  setPosts={setPosts}
                  posts={posts}
                  handleDelete={handleDelete}
                />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default Posts;
