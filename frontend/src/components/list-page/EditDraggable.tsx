import { useState, useContext } from "react";
import listItem from "../../types/listItem";
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
import HTMLDecode from "../../shared/HelperFunctions/HTMLDecode";

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
  const { people, projects } = useContext(sectorCtx);
  const [data, setData] = useState(item);
  const [isOpen, setIsOpen] = useState({
    dead_line: false,
    finished_date: false,
  });

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
        <div>ערוך את {HTMLDecode(item.taskName)}</div>
      </DialogTitle>
      <DialogContent>
        <div className="datePicker-container">
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen((prev) => ({
                finished_date: false,
                dead_line: !prev.dead_line,
              }));
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
          {isOpen.dead_line && (
            <DatePicker
              strictParsing
              selected={data.deadLine ? data.deadLine : null}
              onChange={(date) => {
                setData((prev) => {
                  return { ...prev, deadLine: date ? date : prev.deadLine };
                });
                setIsOpen((prev) => ({ ...prev, dead_line: false }));
              }}
              shouldCloseOnSelect={true}
              inline
            />
          )}
        </div>
        {data.status === 2 && (
          <>
            <br />
            <div className="datePicker-container">
              <Button
                variant="outlined"
                onClick={() => {
                  setIsOpen((prev) => ({
                    dead_line: false,
                    finished_date: !prev.finished_date,
                  }));
                }}
              >
                תאריך ביצוע -{" "}
                {data.finished_date
                  ? `${data.finished_date.getFullYear()} / ${
                      data.finished_date.getMonth() + 1
                    } / ${data.finished_date.getDate()}`
                  : "אין"}
              </Button>
              {data.finished_date && (
                <Button
                  size={"large"}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  onClick={() => {
                    setData((prev) => {
                      return { ...prev, finished_date: undefined };
                    });
                  }}
                  color={"error"}
                >
                  מחק תאריך ביצוע
                </Button>
              )}
              {isOpen.finished_date && (
                <DatePicker
                  strictParsing
                  selected={data.finished_date ? data.finished_date : null}
                  onChange={(date) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        finished_date: date ? date : prev.finished_date,
                      };
                    });
                    setIsOpen((prev) => ({ ...prev, finished_date: false }));
                  }}
                  shouldCloseOnSelect={true}
                  inline
                />
              )}
            </div>
          </>
        )}
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
          value={HTMLDecode(data.taskName)}
          onChange={(e) => {
            setData((prev) => ({ ...prev, taskName: e.target.value }));
          }}
        />
        <Autocomplete
          value={{
            project_id: data.project_id,
            project_name: data.project_name,
          }}
          onChange={(_event, newValue) => {
            setData((prev) => ({
              ...prev,
              project_id:
                newValue && typeof newValue === "object"
                  ? newValue.project_id
                  : "",
              project_name:
                newValue && typeof newValue === "object"
                  ? HTMLDecode(newValue.project_name) ?? ""
                  : "",
            }));
          }}
          options={projects}
          getOptionLabel={(option) =>
            typeof option === "object"
              ? HTMLDecode(option.project_name) ?? ""
              : ""
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="תחום" />
          )}
          freeSolo
        />
        <TextField
          sx={{
            "& input": {
              mr: "30px",
            },
          }}
          autoFocus
          margin="dense"
          id="sub_project"
          label="שם תת פרויקט"
          type="text"
          fullWidth
          variant="standard"
          value={HTMLDecode(data.sub_project) ?? ""}
          onChange={(e) => {
            setData((prev) => ({ ...prev, sub_project: e.target.value }));
          }}
        />
        <Autocomplete
          value={{
            full_name: data.leader_name,
            user_id: data.leader_id,
          }}
          onChange={(_event, newValue) => {
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
        <TextField
          sx={{
            "& input": {
              mr: "30px",
            },
          }}
          autoFocus
          margin="dense"
          id="sub_project"
          label="נותן המשימה \ מנחה"
          type="text"
          fullWidth
          variant="standard"
          value={HTMLDecode(data.giver) ?? ""}
          onChange={(e) => {
            setData((prev) => ({ ...prev, giver: e.target.value }));
          }}
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
          value={data.otherMembers.map((val) => HTMLDecode(val) ?? "")}
          onChange={(_event, newValue) => {
            if (typeof newValue === "string") {
              setData((prev) => ({
                ...prev,
                otherMembers: [HTMLDecode(newValue) ?? ""],
              }));
            } else {
              setData((prev) => ({
                ...prev,
                otherMembers: newValue
                  ? newValue.map((val) => HTMLDecode(val) ?? "")
                  : [],
              }));
            }
          }}
          options={people.map((person) => HTMLDecode(person.full_name) ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="משתתפים \ מבצע המשימה"
            />
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
          value={HTMLDecode(data.comment) ?? ""}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              comment: HTMLDecode(e.target.value),
            }));
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
              HTMLDecode(data.taskName) ?? "",
              data.leader_id,
              data.project_id,
              HTMLDecode(data.sub_project) ?? " ",
              data.otherMembers.map((val) => HTMLDecode(val) ?? ""),
              data.status,
              data.deadLine,
              HTMLDecode(data.comment),
              HTMLDecode(data.giver),
              data.finished_date
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
