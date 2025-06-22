import { useEffect, useState } from "react";

type User = {
  email: string;
  day: string;
  opened: string[];
  lastOpened: string;
  registeredAt: string;
};

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">ClearCutToday Admin Dashboard</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Day</th>
            <th>Opened Days</th>
            <th>Last Opened</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u: User) => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.day}</td>
              <td>{(u.opened || []).join(", ")}</td>
              <td>
                {u.lastOpened ? new Date(u.lastOpened).toLocaleString() : "–"}
              </td>
              <td>{new Date(u.registeredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
