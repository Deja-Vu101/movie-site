import { LinearProgress } from "@mui/material";
import Header from "../../Header/Header";
import TitleSite from "../../Header/TitleSite";
import "./globalLoader.scss";

const GlobalLoader: React.FC = () => {
  return (
    <div
      className="GlobalLoader"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="GlobalLoader_Header">
        <Header />
      </div>
      <div style={{ marginTop: "60px" }}>
        <LinearProgress
          color="error"
          style={{ background: "#ff0000", height: "5px" }}
        />
      </div>

      <div className="CenterTitle">
        <div className="title">
          <TitleSite />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
