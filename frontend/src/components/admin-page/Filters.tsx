import {
  FormControl,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { useContext, useState } from "react";
import roomsCtx from "../../shared/context/RoomCtx";
import HTMLDecode from "../../shared/HelperFunctions/HTMLDecode";
import styles from "../list-page/listPage.module.css";
import RoomManager from "./RoomManager";

const Filters = ({
  setFilters,
}: {
  setFilters: React.Dispatch<
    React.SetStateAction<{ room_id?: string; name?: string }>
  >;
}) => {
  const { rooms } = useContext(roomsCtx);
  const [roomsManagerOpen, setRoomsManagerOpen] = useState(false);

  return (
    <>
      <div className={styles.filtersContainer}>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="room">עמוד משימות</InputLabel>
          <Select
            labelId="room"
            id="demo-simple-select-standard"
            label="סנן לפי עמוד משימות"
            defaultValue={"אין"}
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                room_id: e.target.value === "" ? undefined : e.target.value,
              }));
            }}
          >
            <MenuItem value={""}>הכל</MenuItem>
            {rooms.map((room) => {
              return (
                <MenuItem key={room.room_id} value={room.room_id}>
                  {HTMLDecode(room.room_name) ?? ""}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          label={"סנן לפי שם משתמש"}
          onBlur={(e) => {
            setFilters((prev) => ({ ...prev, name: e.target.value }));
          }}
        >
          שם משתמש
        </TextField>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ py: "16.5px" }}
          onClick={() => {
            setRoomsManagerOpen(true);
          }}
        >
          נהל עמודי משימות
        </Button>
      </div>
      <RoomManager inEdit={roomsManagerOpen} setInEdit={setRoomsManagerOpen} />
    </>
  );
};

export default Filters;
