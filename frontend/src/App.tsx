import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableList from "./components/list-page/DroppableList";
import useDraggables from "./shared/hooks/useDraggables";

function App() {
  const { getItems, reorder, move } = useDraggables();

  const [state, setState] = useState([
    getItems(0, 10),
    getItems(1, 5, 10),
    getItems(2, 5, 15),
  ]);

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
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd],
        state[dInd],
        source,
        destination,
        draggableId
      );
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
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
          {state.map((element, index) => (
            <DroppableList key={index} element={element} index={index} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
