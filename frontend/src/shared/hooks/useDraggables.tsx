import { useContext } from "react";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import droppableId from "../../types/droppableId";
import listItem from "../../types/listItem";
import sectorCtx from "../context/SectorCtx";
import { baseListStyles } from "../styles/draggableStyles";

const useDraggables = () => {
  const { people, projects } = useContext(sectorCtx);

  const getItems: (
    index: number,
    count: number,
    offset?: number
  ) => listItem[] = (index, count, offset = 0) => {
    return Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      taskName: `משימה ${k + offset}`,
      leader: people[Math.floor(Math.random() * people.length)],
      project: projects[Math.floor(Math.random() * projects.length)],
      otherMembers: people.filter((i) => {
        return i && Math.random() > 0.5;
      }),
      deadLine: Math.random() > 0.5 ? new Date() : undefined,
      status: index,
      comment: Math.random() > 0.5 ? "הערות הערות" : undefined,
    }));
  };
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
    getItems,
    reorder,
    move,
    getItemStyle,
    getListStyle,
  };
};

export default useDraggables;
