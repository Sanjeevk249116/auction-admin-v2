import React from "react";

function ContactInfoItem({ icon, text, show = true, className = false }) {
  if (!show) return null;

  return (
    <span className={`valign-wrapper ${className}`}>
      <span className="material-icons-outlined font-20px mr-1 cercle-purple-text">
        {icon}
      </span>
      <p className={`font-13px grey-text`} style={{ marginTop: "5px" }}>{text}</p>
    </span>
  );
}

export default ContactInfoItem;
