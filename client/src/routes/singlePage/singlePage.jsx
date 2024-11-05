import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/apiRequest";
import { SocketContext } from "../../context/SocketContext";

function SinglePage() {
  const { data: post } = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const [messageBox, setMessageBox] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // console.log(post);
  // console.log(currentUser);

  const handleSave = async () => {
    setSaved((prev) => !prev);

    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleSend = async () => {
    setMessageBox(!messageBox);
    setFormMsg("");
    formRef.current.reset();
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const message = formData.get("message");

    if (!message) {
      setFormMsg("Please type a message.");
      return;
    }

    try {
      const chats = await apiRequest("/chats");
      const userIds = [currentUser.id, post.userId];
      console.log(userIds);
      console.log(chats);
      const chat = chats.data.find((chat) =>
        userIds.every((user) => chat.userIDs.includes(user))
      );

      const chatId = chat ? chat.id : null;

      console.log(chat);
      console.log(chatId);

      if (chatId) {
        try {
          const res = await apiRequest.post("/messages/" + chatId, {
            text: message + " (Sent from: " + post.title + ")",
          });
          try {
            socket.emit("sendMessage", {
              receiverId: post.userId,
              data: res.data,
            });
          } catch (error) {}
          setFormMsg("Message sent.");
          formRef.current.reset();
        } catch (error) {
          console.log(error);
          setFormMsg("Message could not be sent. Please try again.");
        }
      } else {
        try {
          const res = await apiRequest.post("/chats", {
            receiverId: post.userId,
          });
          console.log(res);
          const sendmsg = await apiRequest.post("/messages/" + res.data.id, {
            text: message + " (Sent from: " + post.title + ")",
          });
          try {
            socket.emit("sendMessage", {
              receiverId: post.userId,
              data: sendmsg.data,
            });
          } catch (error) {}
          setFormMsg("Message sent.");
          formRef.current.reset();
        } catch (error) {
          console.log(error);
          setFormMsg("Message could not be sent. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      setFormMsg("Message could not be sent. Please try again.");
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || "/noavatar.jpg"} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post.postDetail.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + " km"
                    : post.postDetail.school + " m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {post.postDetail.bus > 999
                    ? post.postDetail.bus / 1000 + " km"
                    : post.postDetail.bus + " m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                  {post.postDetail.restaurant > 999
                    ? post.postDetail.restaurant / 1000 + " km"
                    : post.postDetail.restaurant + " m"}{" "}
                  away
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            {currentUser.id !== post.userId && (
              <button onClick={handleSend}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
            )}
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#2f2e28" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
      {messageBox && (
        <div className="messageBox">
          <button onClick={handleSend} className="messageBox__close">
            Close
          </button>
          <h2>I'm interested!</h2>
          <p>Let {post.user.username} know what you think.</p>
          <form
            ref={formRef}
            onSubmit={handleMessageSubmit}
            className="messageBox__form"
          >
            <div className="messageBox__group">
              <label htmlFor="message">Message</label>
              <input type="text" id="message" name="message" />
            </div>
            <button class="messageBox__submit">Send</button>
          </form>
          {formMsg && <p className="messageBox__msg">{formMsg}</p>}
        </div>
      )}
    </div>
  );
}

export default SinglePage;
