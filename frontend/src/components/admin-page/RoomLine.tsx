import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useContext, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { roomType } from "../../types/AdminTypes";
import roomsCtx from "../../shared/context/RoomCtx";
import { Button } from "@mui/material";

const RoomLine = ({ room }: { room: roomType }) => {
  const [roomValue, setRoomValue] = useState(room.room_name);
  const { changeRoom, deleteRoom } = useContext(roomsCtx);
  const [inWarning, setInWarning] = useState(false);

  useEffect(() => {
    setRoomValue(room.room_name);
  }, [room, setRoomValue]);

  return (
    <div style={{ width: "70%", marginTop: 15 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "50%",
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="הזנת עמוד משימות"
          value={roomValue}
          onChange={(e) => {
            setRoomValue(e.target.value);
          }}
          inputProps={{ "aria-label": "הזנת עמוד משימות" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            changeRoom(room.room_id, roomValue);
            setRoomValue("");
          }}
        >
          <SaveIcon color="primary" />
        </IconButton>

        {!inWarning ? (
          <IconButton
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              setInWarning(true);
            }}
          >
            {/*  */}
            <DeleteForeverIcon color="error" />
          </IconButton>
        ) : (
          <div
            style={{
              backgroundColor: "#edf3f5",
              borderRadius: 4,
              paddingRight: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            בטוח?
            <Button color="error" onClick={() => deleteRoom(room.room_id)}>
              כן, מחק
            </Button>
            <Button color="info" onClick={() => setInWarning(false)}>
              לא חזור
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default RoomLine;
