import { useMemo } from "react";
import { Chip } from "@mui/material";
import listItem from "../../types/listItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DraggableContent = ({ item }: { item: listItem }) => {
  const date = useMemo(() => {
    if (item.deadLine) {
      const newDate = item.deadLine;
      return `${newDate.getDate()}/${
        newDate.getMonth() + 1
      }/${newDate.getFullYear()}`;
    }
  }, [item.deadLine]);

  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{item.taskName}</h3>
          <h4 style={{ margin: 0 }}>{item.project_name}</h4>
        </div>
        <div style={{ marginTop: 3 }}>{date}</div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: 5,
          }}
        >
          <Chip
            label={item.leader_name}
            sx={{
              background: "#f58453",
              "& .MuiChip-label": {
                color: "rgb(237, 243, 245)",
              },
            }}
            size="small"
          />
          {item.otherMembers.map((member, index) => {
            return (
              <Chip
                key={index}
                label={member}
                sx={{
                  background: "#fc429f",
                  "& .MuiChip-label": {
                    color: "rgb(237, 243, 245)",
                  },
                }}
                size="small"
              />
            );
          })}
        </div>
      </div>
      {item.comment && (
        <Accordion
          sx={{
            width: "100%",
            mt: 1,
            background: "transparent",
            boxShadow: "none",
            "&:before": {
              background: "transparent",
            },
            "& .MuiButtonBase-root": {
              width: "100px",
              minHeight: "auto!important",
              margin: "auto",
              borderRadius: "10px",
              "& .MuiAccordionSummary-content": {
                margin: "0",
                flexGrow: "0",
                "& .MuiTypography-root": {
                  fontSize: "0.9rem",
                },
                "& .MuiAccordionSummary-expandIconWrapper svg": {
                  height: "0.9em",
                },
              },
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>הערות</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.comment}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default DraggableContent;
