import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

const markerIcon = new L.Icon({
  iconUrl: "/map-marker.png",
  iconSize: [25, 41],
});

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={markerIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0].url} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
