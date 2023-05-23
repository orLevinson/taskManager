import { useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";
import useDraggables from "../../shared/hooks/useDraggables";
import DroppableProps from "../../types/DroppableProps";
import DraggableItem from "./DraggableItem";

const DroppableList = ({ element, index }: DroppableProps) => {
  const { getListStyle } = useDraggables();

  const title = useMemo(() => {
    switch (index) {
      case 0:
        return "❌ לא בוצע";
        break;
      case 1:
        return "⌛️ בטיפול";
        break;
      case 2:
        return "✅ בוצע";
        break;
      default:
        return "שגיאה";
        break;
    }
  }, [index]);

  return (
    <Droppable key={index} droppableId={`${index}`}>
      {(provided, snapshot) => (
        <div
          className="draggableItem"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <h1>
            {title} - {element.length}
          </h1>
          {element.map((item, index) => (
            <DraggableItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableList;
