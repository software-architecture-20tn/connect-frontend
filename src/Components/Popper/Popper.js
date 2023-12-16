import React from "react";
// import Tippy from "@tippyjs/react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import "./Popper.scss";
import Item from "./Item";

function Popper({ children, items = [], onChange, ...props }) {
  const renderItems = () => {
    return items.map((item, index) => {
      return <Item key={index} data={item} onClick={() => onChange(item)} />;
    });
  };

  const renderResult = (attrs) => (
    <div className="menu-list" tabIndex="-1" {...attrs}>
      <div className="popper-wrapper">
        <div className="menu-body">{renderItems()}</div>
      </div>
    </div>
  );

  return (
    <Tippy
      interactive
      delay={[0, 300]}
      offset={[5, 0]}
      hideOnClick={true}
      placement="bottom-end"
      render={renderResult}
    >
      <div> {children} </div>
    </Tippy>
  );
}

export default Popper;
