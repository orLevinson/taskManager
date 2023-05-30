import styles from "./Auth.module.css";
import Background from "../../assets/background.webp";
import { TextField, Button } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useContext, useState } from "react";
import userCtx from "../../shared/context/UserCtx";

const Login = () => {
  const [inLogin, setInLogin] = useState(true);
  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
  });
  const { login, register } = useContext(userCtx);

  const clearValues = () => {
    setValues({
      username: "",
      password: "",
      name: "",
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={async (e) => {
        e.preventDefault();
        if (inLogin) {
          await login(values.username, values.password);
          clearValues();
        } else {
          await register(values.username, values.password, values.name);
          setInLogin(true);
          clearValues();
        }
      }}
    >
      <div className={styles.background}>
        <img src={Background} alt="background"></img>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>
            <LockPersonIcon /> {inLogin ? "התחברות" : "הרשמה"}
          </h1>
          <TextField
            value={values.username}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, username: e.target.value }));
            }}
            label={"שם משתמש"}
            variant={"standard"}
            fullWidth
          />
          <TextField
            value={values.password}
            type={"password"}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, password: e.target.value }));
            }}
            label={"סיסמא"}
            variant={"standard"}
            fullWidth
          />
          {!inLogin && (
            <TextField
              value={values.name}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, name: e.target.value }));
              }}
              label={"שם מלא"}
              variant={"standard"}
              fullWidth
            />
          )}
          <div className={styles.buttonsRow}>
            <Button
              className={styles.button}
              color="primary"
              variant={"outlined"}
              type={"submit"}
            >
              {inLogin ? "התחברות" : "הרשמה"}
            </Button>
            <Button
              className={styles.button}
              color="secondary"
              variant={"outlined"}
              onClick={() => {
                setInLogin((prev) => !prev);
              }}
            >
              {inLogin ? "מעבר להרשמה" : "מעבר להתחברות"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
