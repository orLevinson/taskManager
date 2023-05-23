import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./listPage.module.css";

const DraggableFunctions = ({
  setEditMode,
  inEditMode,
}: {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  inEditMode: boolean;
}) => {
  return (
    <div>
      <DeleteIcon className={styles.deleteIcon} />
      {!inEditMode && (
        <div
          onClick={() => {
            setEditMode(true);
          }}
        >
          <EditIcon className={styles.editIcon} fontSize="small" />
        </div>
      )}
      {inEditMode && (
        <div
          onClick={() => {
            setEditMode(false);
          }}
        >
          <SaveIcon className={styles.saveIcon} fontSize="small" />
        </div>
      )}
    </div>
  );
};

export default DraggableFunctions;
