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

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { request_token, session_id } = useTypedSelector((state) => state.user);

  const optionsWithBody = {
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
          optionsWithBody
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
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: user.displayName,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };

  const handlerSession = () => {
    dispatch(fetchRequestToken());
  };

  const deleteSession = () => {
    const options = {
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
    fetch("https://api.themoviedb.org/3/authentication/session", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Login</h1>
      <Form title="sign in" handleClick={handlerLogin} />

      <a
        href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`}
      >
        REQUEST TOKEN
      </a>
      <div onClick={handlerSession}>Regenarate Sesion</div>
      <div onClick={deleteSession}>Delete Sesion</div>

      <p>
        or <Link to={"/register"}>register</Link>
      </p>
    </>
  );
};

export default LoginPage;
