import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useContext, useEffect, useState } from "react";
import sectorCtx from "../../shared/context/SectorCtx";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProjectLine = ({
  project,
}: {
  project: { project_name: string; project_id: string };
}) => {
  const [projectValue, setProjectValue] = useState(project.project_name);
  const { editProject, deleteProject } = useContext(sectorCtx);

  useEffect(() => {
    setProjectValue(project.project_name);
  }, [project, setProjectValue]);

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
          placeholder="הזנת תחום"
          value={projectValue}
          onChange={(e) => {
            setProjectValue(e.target.value);
          }}
          inputProps={{ "aria-label": "הזנת תחום" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            editProject(projectValue, project.project_id);
            setProjectValue("");
          }}
        >
          <SaveIcon color="primary" />
        </IconButton>
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            deleteProject(project.project_id);
          }}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Paper>
    </div>
  );
};

export default ProjectLine;
