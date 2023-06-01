import { useState } from "react";
import Filters from "../components/admin-page/Filters";
import UsersTable from "../components/admin-page/UsersTable";
import AdminUsersContextProvider from "../shared/context/AdminUsersContextProvider";
import RoomContextProvider from "../shared/context/RoomContextProvider";

const AdminPage = () => {
  const [filters, setFilters] = useState<{ room_id?: string; name?: string }>({
    room_id: "",
    name: "",
  });

  return (
    <RoomContextProvider>
      <AdminUsersContextProvider>
        <div
          style={{
            marginTop: 50,
            width: "80%",
            margin: "auto",
          }}
        >
          <Filters setFilters={setFilters} />
          <UsersTable filters={filters} />
        </div>
      </AdminUsersContextProvider>
    </RoomContextProvider>
  );
};

export default AdminPage;
