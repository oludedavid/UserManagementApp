"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // Add password if needed, remove if it's not returned from the API
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = "http://localhost:8000/api/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(url);
        setUsers(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
