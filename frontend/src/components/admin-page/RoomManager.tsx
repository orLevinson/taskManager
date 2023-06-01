import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import "../list-page/listPage.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import roomsCtx from "../../shared/context/RoomCtx";
import RoomLine from "./RoomLine";

const RoomManager = ({
  inEdit,
  setInEdit,
}: {
  inEdit: boolean;
  setInEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { rooms, addRoom } = useContext(roomsCtx);

  const [newRoom, setNewRoom] = useState("");

  return (
    <Dialog
      dir="rtl"
      open={inEdit}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
        zIndex: 999,
      }}
    >
      <DialogTitle>
        <div>נהל עמודי משימות</div>
      </DialogTitle>
      <DialogContent>
        <div style={{ width: "50%" }}>
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
              value={newRoom}
              onChange={(e) => {
                setNewRoom(e.target.value);
              }}
              inputProps={{ "aria-label": "הזנת עמוד משימות" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={async () => {
                await addRoom(newRoom);
                setNewRoom("");
              }}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </div>
        {rooms.map((room) => {
          return <RoomLine key={room.room_id} room={room} />;
        })}
      </DialogContent>
      <DialogActions>
        <Button
          color={"error"}
          onClick={() => {
            setInEdit(false);
          }}
        >
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomManager;
