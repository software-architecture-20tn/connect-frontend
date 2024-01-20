import React, { useEffect, useState } from "react";
import { fetchApi } from "../../api";

function StoriesStrip(className, ...props) {
  useEffect(() => {}, []);
  return (
    <div className={className} {...props}>
      <div className={`${className} stories-strip__container`}></div>
    </div>
  );
}

export default StoriesStrip;
