import { Button } from "@mui/material";
import { useContext } from "react";
import Logo from "../../assets/Logo.webp";
import userCtx from "../context/UserCtx";
const Navbar = () => {
  const { name, token, logout } = useContext(userCtx);

  return (
    <div
      style={{
        width: "calc(100% - 40px)",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <img src={Logo} style={{ height: "2rem" }} alt="logo" />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              lineHeight: "80%",
            }}
          >
            מערכת משימות
          </span>
        </div>
        <div></div>
      </div>
      {token && (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div>שלום, {name}</div>
          <Button variant="text" color={"error"} onClick={logout}>
            התנתק
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
