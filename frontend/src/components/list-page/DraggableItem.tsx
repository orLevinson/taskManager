import { useState, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import useDraggables from "../../shared/hooks/useDraggables";
import DraggableProps from "../../types/DraggableProps";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Divider } from "@mui/material";
import styles from "./listPage.module.css";
import DraggableFunctions from "./DraggableFunctions";
import DraggableContent from "./DraggableContent";

const DraggableItem = ({ item, index }: DraggableProps) => {
  const { getItemStyle } = useDraggables();
  const [inEditMode, setEditMode] = useState(false);

  const isOverdue = useMemo(() => {
    if (item.deadLine) {
      const today = new Date();
      return today.getTime() >= item.deadLine.getTime();
    }
    return false;
  }, [item.deadLine]);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.draggableItemContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            isOverdue,
            item.status === 2
          )}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <div {...provided.dragHandleProps} style={{ margin: "auto 0" }}>
              <DragIndicatorIcon className={styles.dragIcon} />
            </div>
            <Divider orientation="vertical" flexItem />
            <DraggableContent item={item} />
            <Divider orientation="vertical" flexItem />
            <DraggableFunctions
              setEditMode={setEditMode}
              inEditMode={inEditMode}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
