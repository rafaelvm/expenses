import { Button } from "@material-ui/core";
import { useState } from "react";
import { signIn } from "../../services/api";
import { IUser } from "../../services/types";
import LoginTextField from "../LoginTextField/LoginTextField";

interface ILogin {
  onSignIn: (user: IUser) => void;
}

export default function Login(props: ILogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn(email, password).then(props.onSignIn, (err) => {
      setError("Email não encontrado ou senha incorreta");
    });
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 15,
      }}
    >
      <h2>Login</h2>
      <div style={{ width: "400px" }}>
        <LoginTextField
          type="email"
          label="Login"
          placeholder="Insira seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <LoginTextField
          type="password"
          label="Senha"
          placeholder="Insira sua senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <Button
        style={{ width: "380px", marginTop: 10 }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        type="submit"
      >
        Entrar
      </Button>
      {error && (
        <span
          style={{
            backgroundColor: "#F0CBD0",
            padding: 8,
            marginTop: 20,
            width: "365px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
