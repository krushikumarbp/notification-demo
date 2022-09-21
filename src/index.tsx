import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../src/styles/app.css";
import Notification from "./components/Notification";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Notification />);
