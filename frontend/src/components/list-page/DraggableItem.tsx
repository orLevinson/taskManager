import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import useDraggables from "../../shared/hooks/useDraggables";
import DraggableProps from "../../types/DraggableProps";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Divider } from "@mui/material";
import styles from "./listPage.module.css";
import DraggableFunctions from "./DraggableFunctions";
import DraggableContent from "./DraggableContent";

const DraggableItem = ({ item, index }: DraggableProps) => {
  const { getItemStyle } = useDraggables();

  const isOverdue = useMemo(() => {
    if (item.deadLine) {
      const today = new Date();
      return today.getTime() >= item.deadLine.getTime();
    }
    return false;
  }, [item.deadLine]);

  return (
    <Draggable draggableId={item.id + ""} index={index}>
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
            <DraggableFunctions item={item} index={index} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
