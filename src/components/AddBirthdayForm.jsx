import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Button from "./Button";

function AddBirthdayForm({ onAddBirthday, editingBirthday, clearEditing }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [relation, setRelation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingBirthday) {
      setName(editingBirthday.name);
      setDate(format(new Date(editingBirthday.date), "yyyy-MM-dd"));
      setRelation(editingBirthday.relation || "");
      setNotes(editingBirthday.notes || "");
    } else {
      setName("");
      setDate("");
      setRelation("");
      setNotes("");
    }
  }, [editingBirthday]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      alert("Please enter name and date");
      return;
    }
    onAddBirthday({ name, date, relation, notes });
    if (!editingBirthday) {
      setName("");
      setDate("");
      setRelation("");
      setNotes("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {editingBirthday ? "Edit Birthday" : "Add New Birthday"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Person's Name"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Birth Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="relation"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Relation (Optional)
        </label>
        <input
          type="text"
          id="relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="e.g., Mom, Best Friend"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Likes chocolate cake"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        ></textarea>
      </div>
      <div className="flex items-center justify-end space-x-3">
        {editingBirthday && (
          <button
            type="button"
            onClick={() => {
              clearEditing();
              setName("");
              setDate("");
              setRelation("");
              setNotes("");
            }}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Cancel Edit
          </button>
        )}
        <Button
          type="submit"
          {...(editingBirthday ? "Update Birthday" : "Add Birthday")}
        />
      </div>
    </form>
  );
}

export default AddBirthdayForm;
