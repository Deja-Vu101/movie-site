import React, { useState } from "react";

interface IOwnProps {
  title: string;
  handleClick: (email: string, password: string, name: string) => void;
}

const Form: React.FC<IOwnProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div>
      {title === "sign up" ? (
        <input
          type="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nickname"
        />
      ) : null}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => handleClick(email, password, userName)}>{title}</button>
    </div>
  );
};

export default Form;
