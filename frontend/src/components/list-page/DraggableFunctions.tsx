import { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./listPage.module.css";
import EditDraggable from "./EditDraggable";
import DraggableProps from "../../types/DraggableProps";
import listCtx from "../../shared/context/ListCtx";

const DraggableFunctions = ({ item, index }: DraggableProps) => {
  const [inEdit, setInedit] = useState(false);
  const { deleteItem } = useContext(listCtx);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => {
            deleteItem(index, item.id, item.status);
          }}
        />
        <EditIcon
          className={styles.editIcon}
          fontSize="small"
          onClick={() => {
            setInedit(true);
          }}
        />
      </div>
      {inEdit && (
        <EditDraggable
          inEdit={inEdit}
          setInEdit={setInedit}
          index={index}
          item={item}
        />
      )}
    </>
  );
};

export default DraggableFunctions;
