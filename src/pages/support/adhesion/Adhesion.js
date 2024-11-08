import React, { useState } from "react";
import "./adhesion.scss";
import Loader from "../../../components/loader/Loader";

function Adhesion() {
  const [isLoading, setIsLoading] = useState(true);

  const onload = function (iframe) {
    window.scroll(0, iframe.offsetTop);
    setIsLoading(false);
  };

  return (
    <div>
      <Loader isActive={isLoading} />
      <iframe
        id="haWidget"
        scrolling="auto"
        src="https://www.helloasso.com/associations/apecs-association-pour-l-etude-et-la-conservation-des-selaciens/adhesions/j-adhere-a-l-apecs-en-2025/widget"
        className="adhesion-iframe"
        onLoad={onload.bind(this)}
        title="Adhésion"
      ></iframe>
    </div>
  );
}

export default Adhesion;
