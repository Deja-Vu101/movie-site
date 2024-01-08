import { useTypedSelector } from "./useTypedSelector";

export const useAuth = () => {
  const { email, id, token, name, avatarURL, guest_session_id } =
    useTypedSelector((state) => state.user);

  return {
    isAuth: !!email,
    isGuest: !!guest_session_id,
    email,
    id,
    token,
    name,
    avatarURL,
  };
};
