import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.webp";
import userCtx from "../context/UserCtx";
const Navbar = () => {
  const { name, token, room_id, is_admin, room_name, logout } =
    useContext(userCtx);
  const navigate = useNavigate();

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
          {room_name && (
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "100%",
              }}
            >
              {room_name}
            </span>
          )}
        </div>
        <div></div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {token && (is_admin || room_id) && (
          <>
            <div>
              שלום, <b>{name}</b>
            </div>
            <Button variant="text" color={"error"} onClick={logout}>
              התנתק
            </Button>
            {is_admin && room_id && (
              <Button
                variant="outlined"
                color={"secondary"}
                onClick={() => {
                  navigate("/");
                }}
              >
                עמוד משימות
              </Button>
            )}
            {is_admin && (
              <Button
                variant="outlined"
                color={"info"}
                onClick={() => {
                  navigate("/admin");
                }}
              >
                עמוד אדמינים
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
