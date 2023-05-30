import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./listPage.css";
import listCtx from "../../shared/context/ListCtx";
import sectorCtx from "../../shared/context/SectorCtx";
import { addItemProperties } from "../../types/ListCtxTypes";

const filter = createFilterOptions<string>();

const AddDraggable = ({
  inEdit,
  setInEdit,
}: {
  inEdit: boolean;
  setInEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { addItem } = useContext(listCtx);
  const { people, projects } = useContext(sectorCtx);
  const [data, setData] = useState<addItemProperties>({
    taskName: "",
    leader_id: "",
    leader_name: "",
    project_name: "",
    project_id: "",
    otherMembers: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      dir="rtl"
      open={inEdit}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <DialogTitle>
        <div>צור משימה</div>
      </DialogTitle>
      <DialogContent>
        <div className="datePicker-container">
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            תג"ב -{" "}
            {data.deadLine
              ? `${data.deadLine.getFullYear()} / ${
                  data.deadLine.getMonth() + 1
                } / ${data.deadLine.getDate()}`
              : "אין"}
          </Button>
          {data.deadLine && (
            <Button
              size={"large"}
              sx={{ mr: 1 }}
              variant="outlined"
              onClick={() => {
                setData((prev) => {
                  return { ...prev, deadLine: undefined };
                });
              }}
              color={"error"}
            >
              מחק תג"ב
            </Button>
          )}
          {isOpen && (
            <DatePicker
              strictParsing
              selected={data.deadLine ? data.deadLine : null}
              onChange={(date) => {
                setData((prev) => {
                  return { ...prev, deadLine: date ? date : prev.deadLine };
                });
                setIsOpen(false);
              }}
              shouldCloseOnSelect={true}
              inline
            />
          )}
        </div>
        <TextField
          sx={{
            "& input": {
              mr: "30px",
            },
          }}
          autoFocus
          margin="dense"
          id="name"
          label="שם המשימה"
          type="text"
          fullWidth
          variant="standard"
          value={data.taskName}
          onChange={(e) => {
            setData((prev) => ({ ...prev, taskName: e.target.value }));
          }}
        />
        <Autocomplete
          value={{
            project_id: data.project_id,
            project_name: data.project_name,
          }}
          onChange={(event, newValue) => {
            setData((prev) => ({
              ...prev,
              project_id:
                newValue && typeof newValue === "object"
                  ? newValue.project_id
                  : "",
              project_name:
                newValue && typeof newValue === "object"
                  ? newValue.project_name
                  : "",
            }));
          }}
          options={projects}
          getOptionLabel={(option) =>
            typeof option === "object" ? option.project_name : ""
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="תחום" />
          )}
          freeSolo
        />
        <Autocomplete
          value={{
            full_name: data.leader_name,
            user_id: data.leader_id,
          }}
          onChange={(event, newValue) => {
            setData((prev) => ({
              ...prev,
              leader_id:
                newValue && typeof newValue === "object"
                  ? newValue.user_id
                  : "",
              leader_name:
                newValue && typeof newValue === "object"
                  ? newValue.full_name
                  : "asdf",
            }));
          }}
          options={people}
          getOptionLabel={(option) =>
            typeof option === "object" ? option.full_name : ""
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="מוביל \ אחראי" />
          )}
        />
        <Autocomplete
          multiple
          ChipProps={{
            sx: {
              "& .MuiSvgIcon-root": {
                margin: "0 -6px 0 5px",
              },
            },
          }}
          value={data.otherMembers}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setData((prev) => ({ ...prev, otherMembers: [newValue] }));
            } else {
              setData((prev) => ({
                ...prev,
                otherMembers: newValue ? newValue : [],
              }));
            }
          }}
          options={people.map((person) => person.full_name)}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="משתתפים נוספים" />
          )}
          freeSolo
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
        />
        <TextField
          sx={{
            "& textarea": {
              mr: "30px",
            },
          }}
          autoFocus
          margin="dense"
          id="comments"
          label="הערות"
          type="text"
          fullWidth
          multiline
          variant="standard"
          value={data.comment ? data.comment : ""}
          onChange={(e) => {
            setData((prev) => ({ ...prev, comment: e.target.value }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color={"error"}
          onClick={() => {
            setInEdit(false);
          }}
        >
          בטל
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            addItem(
              data.taskName,
              data.leader_id,
              data.project_id,
              data.otherMembers,
              data.deadLine,
              data.comment
            );
            setInEdit(false);
          }}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDraggable;
