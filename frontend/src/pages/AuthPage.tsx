import Login from "../components/auth-page/Login";

const AuthPage = () => {
  return (
    <div
      style={{
        marginTop: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </div>
  );
};

export default AuthPage;
