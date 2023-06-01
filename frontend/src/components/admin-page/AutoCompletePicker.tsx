import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { adminPageUserType, roomType } from "../../types/AdminTypes";

const AutoCompletePicker = ({
  rooms,
  user,
  changeUserRoom,
}: {
  rooms: roomType[];
  user: adminPageUserType;
  changeUserRoom: (user_id: number, room_id: number) => void;
}) => {
  const [currentValue, setCurrentValue] = useState({
    room_id: user.room_id,
    room_name: user.room_name,
  });

  useEffect(() => {
    if (currentValue.room_id !== undefined && currentValue.room_id !== null) {
      changeUserRoom(user.user_id, currentValue.room_id);
    }
  }, [currentValue]);

  return (
    <Autocomplete
      value={{
        room_id: currentValue.room_id ? currentValue.room_id : "",
        room_name: currentValue.room_name ? currentValue.room_name : "אין",
      }}
      onChange={(event, newValue) => {
        if (
          newValue &&
          typeof newValue === "object" &&
          newValue.room_id &&
          newValue.room_name
        ) {
          setCurrentValue({
            room_id: parseInt("" + newValue.room_id),
            room_name: newValue.room_name,
          });
        }
      }}
      options={rooms}
      getOptionLabel={(option) =>
        typeof option === "object" ? option.room_name + "" : ""
      }
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="עמוד משימות" />
      )}
    />
  );
};

export default AutoCompletePicker;
