import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import "./listPage.css";
import sectorCtx from "../../shared/context/SectorCtx";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ProjectLine from "./ProjectLine";

const ProjectsManager = ({
  inEdit,
  setInEdit,
}: {
  inEdit: boolean;
  setInEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { projects, addProject } = useContext(sectorCtx);

  const [newProject, setNewProject] = useState("");

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
        <div>נהל תחומים</div>
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
              placeholder="הזנת תחום"
              value={newProject}
              onChange={(e) => {
                setNewProject(e.target.value);
              }}
              inputProps={{ "aria-label": "הזנת תחום" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={async () => {
                await addProject(newProject);
                setNewProject("");
              }}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </div>
        {projects.map((project, index) => {
          return <ProjectLine key={index} project={project} />;
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

export default ProjectsManager;
