import { Dispatch } from "redux";
import { IGuestResponse } from "../../globalTypes/globalTypes";
import { setGuest } from "../../store/slices/userSlice";

export const guestAuth = async (
  optionsWithToken: any,
  dispatch: Dispatch,
  navigate: (path: string) => void
) => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      optionsWithToken
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
  } catch (error) {
    console.log(error, "error");
  }
};
