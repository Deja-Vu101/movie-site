import { LinearProgress } from "@mui/material";
import Header from "../../Header/Header";
import TitleSite from "../../Header/TitleSite";
import "./globalLoader.scss";

const GlobalLoader: React.FC = () => {
  return (
    <div className="GlobalLoader">
      <div className="GlobalLoader_Header">
        <Header />
      </div>
      <div className="LinearProgressLoader_Wrapper">
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
