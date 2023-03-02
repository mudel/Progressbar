import React from "react";

function Footer(props) {

  return (
    <div className="footerContainer">
      <div className="footerTasks">
        <p className="footerTask">Active tasks: {props.activeTasks}</p>
        <p className="footerTask">Finished tasks: {props.finishedTasks}</p>
      </div>
      <p className="footerName">Kanban board by Enoch Arden, 2023 </p>
    </div>
  );
}

export default Footer;