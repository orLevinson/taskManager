import { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableList from "./components/list-page/DroppableList";
import listCtx from "./shared/context/ListCtx";
import useDraggables from "./shared/hooks/useDraggables";

function App() {
  const { reorder, move } = useDraggables();
  const { data, setState, setItemStatus } = useContext(listCtx);

  // add new items
  // onClick={() => {
  // setState([...state, getItems(1)]);
  // }}

  function onDragEnd(result: any) {
    console.log(result);
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(data[sInd], source.index, destination.index);
      const newState = [...data];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(data[sInd], data[dInd], source, destination);
      const newState = [...data];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setItemStatus(
        newState,
        destination.index,
        draggableId,
        +destination.droppableId
      );
    }
  }

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: 20,
          position: "relative",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {data.map((element, index) => (
            <DroppableList key={index} element={element} index={index} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
