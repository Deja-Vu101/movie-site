import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchRequestToken } from "../../store/slices/userSlice";
import { guestAuth } from "../../services/AuthServices/authService";
import InlineError from "../ErrorMessage/InlineError";
import FormInput from "./FormInput";

interface IOwnProps {
  title: string;
  enterMethod: (
    email: string,
    password: string,
    name?: string
  ) => Promise<void>;
}

const Form: React.FC<IOwnProps> = ({ title, enterMethod }) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateInputs = () => {
    if (
      email === "" ||
      password === "" ||
      (title === "Sign Up" && userName === "")
    ) {
      setGeneralError("Empty input");
      setEmailError("");
    } else {
      setGeneralError("");
      validateEmail(email);
    }
  };

  const validateEmail = (emailValue: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
      handleFormSubmit();
    }
  };

  const handleFormSubmit = async () => {
    try {
      await enterMethod(email, password, userName);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setGeneralError("This email already exists");
      }
    }
  };

  const onClickGuestAuth = () => {
    guestAuth(dispatch, navigate);
  };

  const requestTokenConfirm = () => {
    dispatch(fetchRequestToken()).then((data) => {
      if (fetchRequestToken.fulfilled.match(data)) {
        const __CURRENT_HREF = window.location.href;
        window.location.href = `https://www.themoviedb.org/authenticate/${data.payload.request_token}?redirect_to=${__CURRENT_HREF}`;
      }
    });
  };

  return (
    <div className="Form">
      {title === "Sign Up" ? (
        <FormInput
          callBackInput={setUserName}
          placeholderValue="Nickname"
          typeInput="text"
          valueInput={userName}
        />
      ) : null}

      <FormInput
        callBackInput={setEmail}
        valueInput={email}
        placeholderValue="Email"
        typeInput="email"
      />
      <InlineError errorText={emailError} />

      <FormInput
        callBackInput={setPassword}
        valueInput={password}
        placeholderValue="Password"
        typeInput="password"
      />
      <InlineError errorText={generalError} />

      <div className="requestButton">
        <span className="tokenLink" onClick={requestTokenConfirm}>
          REQUEST TOKEN CONFIRM
        </span>
      </div>

      <div>
        <button className="Form_Button" onClick={() => validateInputs()}>
          {title}
        </button>

        <div className="Guest_Button">
          <button onClick={() => onClickGuestAuth()}>Try guest session</button>
        </div>
      </div>
    </div>
  );
};

export default Form;