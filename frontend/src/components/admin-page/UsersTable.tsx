import { useContext, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import adminUsersCtx from "../../shared/context/adminUsersCtx";
import { Button, Switch } from "@mui/material";
import roomsCtx from "../../shared/context/RoomCtx";
import AutoCompletePicker from "./AutoCompletePicker";
import { adminPageUserType } from "../../types/AdminTypes";

const UsersTable = ({
  filters,
}: {
  filters: { name?: string; room_id?: string };
}) => {
  const { users, deleteUser, changeUserPrivilege, changeUserRoom } =
    useContext(adminUsersCtx);
  const { rooms } = useContext(roomsCtx);
  const filteredResults = useMemo(() => {
    let usersClone: adminPageUserType[] = JSON.parse(JSON.stringify(users));

    if (filters.name) {
      usersClone = usersClone.filter((user) => {
        if (filters.name && user.full_name.includes(filters.name)) {
          return true;
        }
        return false;
      });
    }

    if (filters.room_id && filters.room_id !== "") {
      usersClone = usersClone.filter((user) => {
        if (filters.room_id && user.room_id === parseInt(filters.room_id)) {
          return true;
        }
        return false;
      });
    }

    return usersClone;
  }, [rooms, filters]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">שם מלא</TableCell>
            <TableCell align="center">עמוד משימות</TableCell>
            <TableCell align="center">האם אדמין</TableCell>
            <TableCell align="center">מחק משתמש</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredResults.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{user.full_name}</TableCell>
              <TableCell align="center">
                <AutoCompletePicker
                  rooms={rooms}
                  user={user}
                  changeUserRoom={changeUserRoom}
                />
              </TableCell>
              <TableCell align="center">
                <Switch
                  color="primary"
                  sx={{
                    "& .MuiButtonBase-root .MuiSwitch-thumb": {
                      backgroundColor: "white",
                      border: "0.1px solid lightgrey",
                    },
                  }}
                  defaultChecked={user.is_admin}
                  onChange={async (e) => {
                    await changeUserPrivilege(user.user_id, !!e.target.checked);
                  }}
                ></Switch>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  color="error"
                  onClick={async () => {
                    await deleteUser(user.user_id);
                  }}
                >
                  מחק את {user.full_name}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
