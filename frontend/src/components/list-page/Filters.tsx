import { FormControl, MenuItem, Select, Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import sectorCtx from "../../shared/context/SectorCtx";
import { filtersType } from "../../types/filtersTypes";
import AddDraggable from "./AddDraggable";
import styles from "./listPage.module.css";
import ProjectsManager from "./ProjectsManager";

const Filters = ({
  values,
  setValues,
}: {
  values: filtersType;
  setValues: React.Dispatch<React.SetStateAction<filtersType>>;
}) => {
  const [datePickersState, setDatePickerState] = useState({
    from: false,
    to: false,
  });
  const { people, projects } = useContext(sectorCtx);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [projectsManagerOpen, setProjectsManagerOpen] = useState(false);

  return (
    <>
      <div className={styles.filtersContainer}>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="leader">מוביל</InputLabel>
          <Select
            labelId="leader"
            id="demo-simple-select-standard"
            label="מוביל"
            value={values.leader}
            onChange={(e) => {
              setValues((prev) => {
                return { ...prev, leader: e.target.value };
              });
            }}
          >
            <MenuItem value=""></MenuItem>
            {people.map((person, index) => {
              return (
                <MenuItem key={index} value={person.user_id}>
                  {person.full_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="project">תחום</InputLabel>
          <Select
            labelId="project"
            id="demo-simple-select-standard"
            label="תחום"
            value={values.project}
            onChange={(e) => {
              setValues((prev) => {
                return { ...prev, project: e.target.value };
              });
            }}
          >
            <MenuItem value=""></MenuItem>
            {projects.map((project, index) => {
              return (
                <MenuItem key={index} value={project.project_id}>
                  {project.project_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="datePicker-container">
          <Button
            variant="outlined"
            sx={{ py: "16.5px" }}
            onClick={() => {
              setDatePickerState((prev) => ({
                ...prev,
                from: !prev.from,
                to: false,
              }));
            }}
          >
            מתאריך -{" "}
            {values.from
              ? `${values.from.getFullYear()} / ${
                  values.from.getMonth() + 1
                } / ${values.from.getDate()}`
              : "אין"}
          </Button>
          {datePickersState.from && (
            <DatePicker
              strictParsing
              selected={values.from ? values.from : null}
              onChange={(date) => {
                setValues((prev) => {
                  return { ...prev, from: date ? date : prev.from };
                });
                setDatePickerState((prev) => ({ ...prev, from: false }));
              }}
              shouldCloseOnSelect={true}
              inline
            />
          )}
        </div>

        <div className="datePicker-container">
          <Button
            variant="outlined"
            sx={{ py: "16.5px" }}
            onClick={() => {
              setDatePickerState((prev) => ({
                ...prev,
                to: !prev.to,
                from: false,
              }));
            }}
          >
            עד תאריך -{" "}
            {values.to
              ? `${values.to.getFullYear()} / ${
                  values.to.getMonth() + 1
                } / ${values.to.getDate()}`
              : "אין"}
          </Button>
          {datePickersState.to && (
            <DatePicker
              strictParsing
              selected={values.to ? values.to : null}
              onChange={(date) => {
                setValues((prev) => {
                  return { ...prev, to: date ? date : prev.to };
                });
                setDatePickerState((prev) => ({ ...prev, to: false }));
              }}
              shouldCloseOnSelect={true}
              inline
            />
          )}
        </div>
        <Button
          color="error"
          variant="outlined"
          sx={{ py: "16.5px" }}
          onClick={() => {
            setValues({
              from: null,
              to: null,
              project: "",
              leader: "",
            });
          }}
        >
          מחק סננים
        </Button>
        <Button
          color="success"
          variant="outlined"
          sx={{ py: "16.5px", mr: 5 }}
          onClick={() => {
            setNewItemOpen(true);
          }}
        >
          הוסף משימה
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ py: "16.5px" }}
          onClick={() => {
            setProjectsManagerOpen(true);
          }}
        >
          נהל תחומים
        </Button>
      </div>
      <AddDraggable inEdit={newItemOpen} setInEdit={setNewItemOpen} />
      <ProjectsManager
        inEdit={projectsManagerOpen}
        setInEdit={setProjectsManagerOpen}
      />
    </>
  );
};

export default Filters;
