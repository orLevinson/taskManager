import { useState, useContext } from "react";
import listItem from "../../types/listItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useDraggables from "../../shared/hooks/useDraggables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./listPage.css";
import listCtx from "../../shared/context/ListCtx";

const filter = createFilterOptions<string>();

const EditDraggable = ({
  item,
  index,
  inEdit,
  setInEdit,
}: {
  item: listItem;
  index: number;
  inEdit: boolean;
  setInEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { editItem } = useContext(listCtx);
  const [data, setData] = useState(item);
  const { possiblePeople, possibleProjects } = useDraggables();
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
        <div>ערוך את {item.taskName}</div>
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
          value={data.project}
          onChange={(event, newValue) => {
            setData((prev) => ({ ...prev, project: newValue ? newValue : "" }));
          }}
          options={possibleProjects}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="פרויקט" />
          )}
          freeSolo
        />
        <Autocomplete
          value={data.leader}
          onChange={(event, newValue) => {
            setData((prev) => ({ ...prev, leader: newValue ? newValue : "" }));
          }}
          options={possiblePeople}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="מוביל \ אחראי" />
          )}
          freeSolo
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
          options={possiblePeople}
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
            editItem(
              index,
              data.id,
              data.taskName,
              data.leader,
              data.project,
              data.otherMembers,
              data.status,
              data.deadLine,
              data.comment
            );
            setInEdit(false);
          }}
        >
          ערוך
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDraggable;
