import { Oval } from "react-loader-spinner";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="Loader">
      <Oval
        visible={true}
        height="100%"
        width="100%"
        color="red"
        secondaryColor="red"
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loader;
