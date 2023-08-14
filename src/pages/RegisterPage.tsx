import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Form from "../components/Form";
import {
  fetchRequestToken,
  setSessionId,
  setUser,
} from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RegisterPage = () => {
  const { request_token, session_id } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

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

  const handlerRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
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
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });

      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
          name: user.displayName,
        })
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handlerSession = () => {
    dispatch(fetchRequestToken());
  };
  return (
    <>
      <h1>Register</h1>
      <Form title="sign up" handleClick={handlerRegister} />
      <a
        href={`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/register`}
      >
        REQUEST TOKEN
      </a>
      <div onClick={handlerSession}>Regenarate Sesion</div>
      <p>
        already have an account? <Link to={"/login"}>log in</Link>
      </p>
    </>
  );
};

export default RegisterPage;
