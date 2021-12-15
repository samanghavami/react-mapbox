import { useState } from "react";
import ReactMapGL, { setRTLTextPlugin, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true
);
import * as mahalat from "../json/Tehran_Mahalat.json";
import getCenter from "geolib/es/getCenter";
import { MapPin } from "react-feather";

function Map() {
  const [selectedMahal, setSelectedMahal] = useState(null);

  const coordinates = mahalat.RECORDS.map((result) => ({
    longitude: result.longitude,
    latitude: result.latitude,
  }));
  //   console.log(coordinates);
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
  });

  const clickHandler = (mahal) => {
    setSelectedMahal(mahal);
  };

  return (
    <ReactMapGL
      {...viewport}
      zoom={12}
      height="100vh"
      width="100vw"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoic2FtYW4ybGFrIiwiYSI6ImNrd3l3b3M0eTBzZXEycW1ubHB3MGhrNTkifQ.HArhqc90ziPzagGgbmstfg"
      mapStyle="mapbox://styles/saman2lak/ckwyx31j20pxc14k56b5tovpq"
    >
      {mahalat.RECORDS.map((mahal) => (
        <div key={mahal.id}>
          <Marker latitude={mahal.latitude} longitude={mahal.longitude}>
            <p className="mapMarker">
              <MapPin
                onClick={() => clickHandler(mahal)}
                className="mapPin"
                size={35}
              />
            </p>
          </Marker>
        </div>
      ))}
      {selectedMahal ? (
        <Popup
          onClose={() => setSelectedMahal(null)}
          latitude={selectedMahal.latitude}
          longitude={selectedMahal.longitude}
        >
          {selectedMahal.name}
        </Popup>
      ) : null}
    </ReactMapGL>
  );
}

export default Map;
