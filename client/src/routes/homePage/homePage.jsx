import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Discover Real Estate & Secure Your Dream Home
          </h1>
          <p>
            Explore a wide range of properties tailored to your needs. Whether
            you're buying, or renting, we make the process seamless, helping you
            find the perfect place to call home.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/landing.jpg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;