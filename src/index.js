import { createRoot } from "react-dom/client";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import ControlledEditor from "./ControlledEditor";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<ControlledEditor />);
