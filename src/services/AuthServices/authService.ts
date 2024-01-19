import { Dispatch } from "redux";
import {
  CreateRequestToken,
  IGuestResponse,
} from "../../globalTypes/globalTypes";
import {
  setGuest,
  setRequestToken,
  setSessionId,
} from "../../store/slices/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, listAll, ref } from "@firebase/storage";

export const loginAuthenticationSession = async (
  request_token: string,
  dispatch: Dispatch,
  navigate: (path: string) => void
) => {
  try {
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
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/session/new",
      optionsWithToken
    );
    const data = await response.json();
    dispatch(setSessionId(data.session_id));
  } catch (error) {}
};

export const guestAuth = async (
  dispatch: Dispatch,
  navigate: (path: string) => void
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
    },
  };
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      options
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: IGuestResponse = await res.json();
    const userPayload = {
      expires_at: data.expires_at,
      guest_session_id: data.guest_session_id,
      success: data.success,
    };
    dispatch(setGuest(userPayload));
    navigate("/");
    return data.guest_session_id;
  } catch (error) {
    console.log(error, "error");
  }
};

export const authToken = async (
  session: string,
  dispatch: Dispatch,
  navigate: (path: string) => void
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
    },
  };
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      options
    );
    const data: CreateRequestToken = await res.json();
    dispatch(setRequestToken(data.request_token));
    navigate("/");
    return data.request_token;
  } catch (error) {
    console.log(error, "error");
  }
};

export const createGuestSession = async (request_token: string) => {
  const optionsWithToken = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
    },
    body: JSON.stringify({ request_token: request_token }),
  };
  try {
    `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`;
  } catch (error) {
    console.log(error, "error");
  }
};

export const fetchSessionID = async (
  request_token: string,
  dispatch: Dispatch
) => {
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

