import Form from "../components/Form";
import TitleSite from "../components/Header/TitleSite";
import "../components/MainSection/mainSection.scss";

const LoginPage = () => {
  return (
    <div className="bg-container">
      <div className="BG">
        <div className="login-container">
          <TitleSite />
          <h1 className="login-title">Login</h1>

          <Form title="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
