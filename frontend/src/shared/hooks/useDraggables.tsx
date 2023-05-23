import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import droppableId from "../../types/droppableId";
import listItem from "../../types/listItem";
import { baseListStyles } from "../styles/draggableStyles";

const useDraggables = () => {
  // fake data generator

  const getItems: (
    index: number,
    count: number,
    offset?: number
  ) => listItem[] = (index, count, offset = 0) => {
    const possiblePeople = [
      "אור לוינזון",
      "ניר סוויסה",
      "מיטל אביב",
      "אלעד חן",
      "פריאל כהן",
    ];

    const possibleProjects = ["מזון", "היסעים", "משהו"];

    return Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      taskName: `משימה ${k + offset}`,
      leader: possiblePeople[Math.floor(Math.random() * possiblePeople.length)],
      project:
        possibleProjects[Math.floor(Math.random() * possibleProjects.length)],
      otherMembers: possiblePeople.filter((i) => {
        return i && Math.random() > 0.5;
      }),
      deadLine: Math.random() > 0.5 ? new Date() : undefined,
      status: index,
      comment: Math.random() > 0.5 ? "הערות הערות" : undefined
    }));
  };
  const reorder = (list: listItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.length > 0 ? result : [];
  };

  /**
   * Moves an item from one list to another list.
   */
  const moveItem = (id: string, destArr: listItem[], destIndex: number) => {
    return destArr.map((item) => {
      if (item.id === id) {
        let newItem = { ...item };
        newItem.status = destIndex;
        return newItem;
      } else {
        return item;
      }
    });
  };

  const move = (
    source: listItem[],
    destination: listItem[],
    droppableSource: droppableId,
    droppableDestination: droppableId,
    draggableId: string
  ) => {
    const sourceClone = Array.from(source);
    let destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    destClone = moveItem(
      draggableId,
      destClone,
      +droppableDestination.droppableId
    );

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
