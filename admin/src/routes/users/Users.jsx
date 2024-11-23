import React, { Suspense, useEffect, useState } from "react";
import "./users.scss";
import UsersFilter from "../../components/usersFilter/UsersFilter";
import { Await, useLoaderData } from "react-router-dom";
import UserCard from "../../components/userCard/UserCard";
import Modal from "../../components/modal/Modal";
import apiRequest from "../../lib/apiRequest";

function Users() {
  const data = useLoaderData();
  const [users, setUsers] = useState([]);
  const [isBanning, setIsBanning] = useState(false);
  const [userToBan, setUserToBan] = useState({});

  // console.log("users: ", data);

  const handleBan = (currentUser) => {
    console.log("confirmation to ban:", currentUser);
    setUserToBan(currentUser);
    setIsBanning(true);
  };

  const banUser = async () => {
    try {
      console.log("banning:", userToBan);
      await apiRequest.put(`/users/${userToBan.id}`, { isBanned: true });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToBan.id ? { ...user, isBanned: true } : user
        )
      );
      // console.log("user banned.");
      setIsBanning(false);
      setUserToBan({});
    } catch (error) {
      console.log(error);
    }
  };

  const unbanUser = async (user) => {
    try {
      console.log("unbanning:", user);
      await apiRequest.put(`/users/${user.id}`, { isBanned: false });
      setUsers((prevUsers) =>
        prevUsers.map((currUser) =>
          currUser.id === user.id ? { ...currUser, isBanned: false } : currUser
        )
      );
      // console.log("user unbanned.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isBanning) {
      setUserToBan({});
    }
  }, [isBanning]);

  return (
    <div className="posts padding-y">
      <UsersFilter />
      {isBanning && (
        <Modal
          action={banUser}
          setVisible={setIsBanning}
          prompt={`Are you sure you want to ban this user?`}
          canBeUndone={false}
        />
      )}
      <p>({users.length}) Results</p>
      <div className="posts-layout">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.usersResponse}
            errorElement={<p>Error loading posts.</p>}
          >
            {(usersResponse) => {
              useEffect(() => {
                setUsers(usersResponse.data);
              }, [usersResponse]);

              return users.map((user) => (
                <UserCard
                  user={user}
                  key={user.id}
                  handleBan={handleBan}
                  users={users}
                  unbanUser={unbanUser}
                />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default Users;
