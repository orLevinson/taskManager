import { useContext, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableList from "../components/list-page/DroppableList";
import Filters from "../components/list-page/Filters";
import listCtx from "../shared/context/ListCtx";
import useDraggables from "../shared/hooks/useDraggables";
import { filtersType } from "../types/filtersTypes";

function ListPage() {
  const { reorder, move } = useDraggables();
  const { data, setState, setItemStatus } = useContext(listCtx);
  const [filters, setFilters] = useState<filtersType>({
    leader: "",
    project: "",
    from: null,
    to: null,
  });

  const filteredData = useMemo(() => {
    let clone = [...data];
    if (filters.leader && filters.leader !== "") {
      clone = clone.map((list) => {
        return list.filter((item) => {
          return item.leader === filters.leader;
        });
      });
    }
    if (filters.project && filters.project !== "") {
      clone = clone.map((list) => {
        return list.filter((item) => {
          return item.project === filters.project;
        });
      });
    }
    if (filters.from !== null) {
      clone = clone.map((list) => {
        return list.filter((item) => {
          if (item.deadLine && filters.from !== null) {
            return filters.from.getTime() <= item.deadLine.getTime();
          }
          return true;
        });
      });
    }
    if (filters.to !== null) {
      clone = clone.map((list) => {
        return list.filter((item) => {
          if (item.deadLine && filters.to !== null) {
            return filters.to.getTime() >= item.deadLine.getTime();
          }
          return true;
        });
      });
    }
    console.log(clone, filters.leader);
    return clone;
  }, [data, filters]);

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
      <Filters values={filters} setValues={setFilters} />
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
          {filteredData.map((element, index) => (
            <DroppableList key={index} element={element} index={index} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default ListPage;
