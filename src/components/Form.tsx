import React, { useState } from "react";
import "../components/LoginRegister/style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import {
  fetchRequestToken,
  setSessionId,
  setUser,
} from "../store/slices/userSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface IOwnProps {
  title: string;
}

const Form: React.FC<IOwnProps> = ({ title }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useTypedDispatch();
  const { request_token, session_id } = useTypedSelector((state) => state.user);

  const optionsWithToken = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
    },
    body: JSON.stringify({
      request_token: request_token,
    }),
  };

  //const [readySignUp, setReadySignUp] = useState(
  //  localStorage.getItem("readySignUp") || false
  //);

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  //const [emailError, setEmailError] = useState("");

  //const nextStepValue = localStorage.getItem("nextStep");
  //const [nextStep, setNextStep] = useState(nextStepValue === "true" || "");

  //const validateEmail = (emailValue: string) => {
  //  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //  if (!emailPattern.test(emailValue)) {
  //    setEmailError("Invalid email format");
  //  } else {
  //    setEmailError("");
  //    setNextStep(true);
  //    localStorage.setItem("nextStep", "true");
  //  }
  //};

  const handlerSession = () => {
    dispatch(fetchRequestToken());
  };

  //const handleButtonClick = () => {
  //  localStorage.setItem("email", email);
  //  localStorage.setItem("password", password);
  //  localStorage.setItem("userName", userName);

  //  handleClick(email, password, userName);
  //  setReadySignUp(true);
  //  localStorage.setItem("readySignUp", "true");
  //};

  const handlerLogin = (email: string, password: string) => {
    const auth = getAuth();

    const fetchSessionID = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/authentication/session/new",
          optionsWithToken
        );

        const data = await response.json();
        dispatch(setSessionId(data.session_id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchSessionID();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        auth.onAuthStateChanged((userAuth) => {
          if (userAuth) {
            const userPayload = {
              email: user.email,
              token: user.refreshToken,
              id: user.uid,
              name: user.displayName,
              createDate: userAuth.metadata.creationTime,
              avatarURL: userAuth.photoURL,
            };
            dispatch(setUser(userPayload));
            navigate("/");
          }
        });
      })
      .catch(console.error);
  };

  return (
    <div className="Form">
      {/*<h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
        Step 1 - Enter the correct email and password
      </h2>*/}
      {title === "sign up" ? (
        <div>
          <input
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nickname"
            className="Form_Input"
          />
        </div>
      ) : null}
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="Form_Input"
        />
        {/*{emailError && <p className="error-text">{emailError}</p>}*/}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="Form_Input"
        />

        {/*<div
          style={{
            fontSize: "20px",
            display: nextStep ? "none" : "flex",
            justifyContent: "center",
            marginBottom: "30px",
            cursor: "pointer",
          }}
          onClick={() => validateEmail(email)}
        >
          Next step <AiOutlineArrowDown />
        </div>*/}
      </div>

      <div
        className="session-button"
        //style={{ display: nextStep ? "block" : "none" }}
      >
        {/*2 - Generate an id and then confirm it*/}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            onClick={handlerSession}
            style={{
              marginTop: "30px",
              cursor: "pointer",
              fontSize: "20px",
              marginBottom: "20px",
              //color: session_id ? "green" : "white",
            }}
          >
            Generate Session ID
          </div>
          <a
            className="token-link"
            href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`}
            //onClick={handleButtonClick}
            style={{ fontSize: "20px", marginBottom: "20px" }}
          >
            REQUEST TOKEN CONFIRM
          </a>
        </div>
      </div>

      <div>
        <button
          className="Form_Button"
          onClick={() => handlerLogin(email, password)}
          //style={
          //  readySignUp
          //    ? undefined
          //    : { backgroundColor: "gray", cursor: "no-drop" }
          //}
        >
          {title}
        </button>

        <p className="register-link">
          or{" "}
          <Link to="/register" style={{ color: "white" }}>
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
//import React, { useState } from "react";

//interface IOwnProps {
//  title: string;
//  handleClick: (email: string, password: string, name: string) => void;
//}

//const Form: React.FC<IOwnProps> = ({ title, handleClick }) => {
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [userName, setUserName] = useState("");

//  return (
//    <div>
//      {title === "sign up" ? (
//        <input
//          type="email"
//          value={userName}
//          onChange={(e) => setUserName(e.target.value)}
//          placeholder="Nickname"
//        />
//      ) : null}
//      <input
//        type="email"
//        value={email}
//        onChange={(e) => setEmail(e.target.value)}
//        placeholder="Email"
//      />
//      <input
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//        placeholder="Password"
//      />
//      <button onClick={() => handleClick(email, password, userName)}>
//        {title}
//      </button>
//    </div>
//  );
//};

//export default Form;
