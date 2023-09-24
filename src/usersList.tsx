import React, { useState, useEffect } from "react";
import { requestUsers } from "./api";

export default function UsersList({ data }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const [selectedPageSize, setSelectedPageSize] = useState(4);

  const handlePageSearch = () => {
    setLoading(true);
    setError(null);
    setUsers(data);
    requestUsers({
      name: nameFilter,
      age: ageFilter,
      limit: selectedPageSize,
      offset: (page - 1) * selectedPageSize,
    })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePageSearch();
  }, [page, selectedPageSize, nameFilter, ageFilter]);

  return (
    <div>
      <h1>Users List</h1>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          />
        </label>


      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : users.length === 0 ? (
        <p>Users not found</p>
      ) : (
        <div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name}, {user.age} years old
              </li>
            ))}
          </ul>
        </div>
      )}
<hr/>
      <div>
        <label>Page size</label>
      <select
          value={selectedPageSize}
          onChange={(e) => setSelectedPageSize(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>

        <button
          style={{ backgroundColor: "blue", margin: "50px" }}
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          ←
        </button>
        <span>Page {page}</span>
        <button
          style={{ backgroundColor: "blue", margin: "50px" }}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
