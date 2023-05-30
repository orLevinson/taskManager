import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import droppableId from "../../types/droppableId";
import listItem from "../../types/listItem";
import { baseListStyles } from "../styles/draggableStyles";

const useDraggables = () => {
  const reorder = (list: listItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.length > 0 ? result : [];
  };

  const move = (
    source: listItem[],
    destination: listItem[],
    droppableSource: droppableId,
    droppableDestination: droppableId
  ) => {
    const sourceClone = Array.from(source);
    let destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [key: string]: listItem[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getItemStyle: (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    isOverdue: boolean,
    isDone: boolean
  ) => React.CSSProperties | undefined = (
    isDragging,
    draggableStyle,
    isOverdue,
    isDone
  ) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging

    background: isDragging
      ? "#b4f0c3"
      : isOverdue
      ? isDone
        ? "#fafcfc"
        : "#fabbbb"
      : "#fafcfc",
    boxShadow: isDragging
      ? "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      : "rgba(149, 157, 165, 0.2) 0px 8px 24px",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#caeefc" : "#edf3f5",
    boxShadow: isDraggingOver
      ? "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    ...baseListStyles,
  });

  return {
    reorder,
    move,
    getItemStyle,
    getListStyle,
  };
};

export default useDraggables;
