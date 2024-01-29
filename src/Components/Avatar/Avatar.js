import "./Avatar.scss";

import React from "react";

function Avatar({ src, className, onClick, ...props }) {
  const defaultSrc =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg";
  return (
    <div className="avatar">
      <img
        src={src || defaultSrc}
        alt="avatar"
        className={`${className} avatar__img`}
        onClick={onClick}
        {...props}
      />
    </div>
  );
}

export default Avatar;
