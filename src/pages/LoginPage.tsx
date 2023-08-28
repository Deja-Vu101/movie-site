//import { Link, useNavigate } from "react-router-dom";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import {
//  fetchRequestToken,
//  setSessionId,
//  setUser,
//} from "../store/slices/userSlice";
//import { useTypedDispatch } from "../hooks/useTypedDispatch";
//import { useTypedSelector } from "../hooks/useTypedSelector";
//import TitleSite from "../components/Header/TitleSite";
//import "../components/LoginRegister/style.scss";
//import Form from "../components/Form";

//const LoginPage = () => {
//  const navigate = useNavigate();
//  const dispatch = useTypedDispatch();
//  const { request_token, session_id } = useTypedSelector((state) => state.user);

//  const optionsWithToken = {
//    method: "POST",
//    headers: {
//      accept: "application/json",
//      "content-type": "application/json",
//      Authorization:
//        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
//    },
//    body: JSON.stringify({
//      request_token: request_token,
//    }),
//  };

//  const handlerLogin = (email: string, password: string) => {
//    const auth = getAuth();

//    const fetchSessionID = async () => {
//      try {
//        const response = await fetch(
//          "https://api.themoviedb.org/3/authentication/session/new",
//          optionsWithToken
//        );

//        const data = await response.json();
//        dispatch(setSessionId(data.session_id));
//      } catch (error) {
//        console.error(error);
//      }
//    };
//    fetchSessionID();

//    signInWithEmailAndPassword(auth, email, password)
//      .then(({ user }) => {
//        auth.onAuthStateChanged((userAuth) => {
//          if (userAuth) {
//            const userPayload = {
//              email: user.email,
//              token: user.refreshToken,
//              id: user.uid,
//              name: user.displayName,
//              createDate: userAuth.metadata.creationTime?.toString(),
//            };
//            console.log(userPayload.createDate, "createDate");

//            dispatch(setUser(userPayload));
//            navigate("/");
//          }
//        });
//      })
//      .catch(console.error);
//  };

//  const handlerSession = () => {
//    dispatch(fetchRequestToken());
//  };

//  return (
//    <div className="bg-container">
//      <div
//        className="BG"
//        //style={{ backgroundImage: `url(${Fone})` }}
//      >
//        <div className="login-container">
//          <TitleSite />

//          {/*<div className="Wrapper">*/}
//          <Form title="Sign In" handleClick={handlerLogin} />
//          {/*</div>*/}

//          <h1 className="login-title">Login</h1>

//          <div className="session-button" onClick={handlerSession}>
//            Regenerate Session
//          </div>

//          <a
//            className="token-link"
//            href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`}
//          >
//            REQUEST TOKEN
//          </a>

//          <p className="register-link">
//            or <Link to="/register">register</Link>
//          </p>
//        </div>
//      </div>
//    </div>
//  );
//};

//export default LoginPage;
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import {
  fetchRequestToken,
  setSessionId,
  setUser,
} from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "../components/MainSection/mainSection.scss";
import Fone from "../assets/img/640250.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
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
            };
            console.log("createDate:", userPayload.createDate);
            dispatch(setUser(userPayload));
            navigate("/");
          }
        });
      })
      .catch(console.error);
  };

  const handlerSession = () => {
    dispatch(fetchRequestToken());
  };

  const deleteSession = () => {
    const optionsWithId = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        session_id: session_id,
      }),
    };
    fetch("https://api.themoviedb.org/3/authentication/session", optionsWithId)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-container">
      <div className="BG">
        <div className="login-container">
          <h1 className="login-title">Login</h1>

          <Form title="Sign In" handleClick={handlerLogin} />
        </div>
      </div>
    </div>
    //<div className="BG" style={{ backgroundImage: `url(${Fone})` }}>
    //  <div className="login-container">
    //    <h1 className="login-title">Login</h1>

    //    <Form title="Sign In" handleClick={handlerLogin} />

    //    <a
    //      className="token-link"
    //      href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`}
    //    >
    //      REQUEST TOKEN
    //    </a>

    //    <div className="session-button" onClick={handlerSession}>
    //      Regenerate Session
    //    </div>

    //    <p className="register-link">
    //      or <Link to="/register">register</Link>
    //    </p>
    //  </div>
    //</div>
  );
};

export default LoginPage;
//  return (
//    <>
//      <h1>Login</h1>
//      <Form title="sign in" handleClick={handlerLogin} />
//      <p>
//        <a href="https://giphy.com/gifs/bird-birds-forest-3oEduYJ5WzNGsAadKU">
//          via GIPHY
//        </a>
//      </p>
//      <a
//        href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`}
//      >
//        REQUEST TOKEN
//      </a>
//      <div onClick={handlerSession}>Regenarate Sesion</div>
//      <p>
//        or <Link to={"/register"}>register</Link>
//      </p>
//    </>
//  );
//};

//export default LoginPage;
