import React, { useState, useEffect } from "react";
import BirthdayList from "./components/BirthdayList";
import DevFooter from "./components/Footer";
import AddBirthdayForm from "./components/AddBirthdayForm";
import { subscribeUserToPush } from "./subscription";

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [editingBirthday, setEditingBirthday] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  // Fetch birthdays
  const fetchBirthdays = async () => {
    try {
      const response = await fetch(`${API_URL}/birthdays`);
      if (!response.ok) {
        console.error("API Error:", response.status, await response.text());
        setBirthdays([]);
        return;
      }
      const data = await response.json();
      setBirthdays(data);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      setBirthdays([]);
    }
  };

  useEffect(() => {
    fetchBirthdays();
    subscribeUserToPush().catch((error) =>
      console.error("Push subscription failed:", error)
    );
  }, []);

  const handleAddBirthday = async (birthday) => {
    try {
      const response = await fetch(`${API_URL}/birthdays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(birthday),
      });
      if (response.ok) {
        fetchBirthdays();
      } else {
        console.error("Failed to add birthday");
      }
    } catch (error) {
      console.error("Error adding birthday:", error);
    }
  };

  const handleUpdateBirthday = async (id, updatedBirthday) => {
    try {
      const response = await fetch(`${API_URL}/birthdays/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBirthday),
      });
      if (response.ok) {
        setEditingBirthday(null);
        fetchBirthdays();
      } else {
        console.error("Failed to update birthday");
      }
    } catch (error) {
      console.error("Error updating birthday:", error);
    }
  };

  const handleDeleteBirthday = async (id) => {
    if (window.confirm("Are you sure you want to delete this birthday?")) {
      try {
        const response = await fetch(`${API_URL}/birthdays/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchBirthdays();
        } else {
          console.error("Failed to delete birthday");
        }
      } catch (error) {
        console.error("Error deleting birthday:", error);
      }
    }
  };

  const handleEdit = (birthday) => {
    setEditingBirthday(birthday);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-[#e67e22]">BIRTHDAY BUDDY</h1>
        <p className="text-gray-600">Never miss a special day!</p>
      </header>

      <AddBirthdayForm
        onAddBirthday={
          editingBirthday
            ? (b) => handleUpdateBirthday(editingBirthday._id, b)
            : handleAddBirthday
        }
        editingBirthday={editingBirthday}
        clearEditing={() => setEditingBirthday(null)}
      />

      <BirthdayList
        birthdays={birthdays}
        onEdit={handleEdit}
        onDelete={handleDeleteBirthday}
      />
      <DevFooter />
    </div>
  );
}

export default App;
