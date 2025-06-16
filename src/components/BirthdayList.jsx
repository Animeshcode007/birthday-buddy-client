import React from "react";
import BirthdayItem from "./BirthdayItem";

function BirthdayList({ birthdays, onEdit, onDelete }) {
  if (!birthdays || birthdays.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No birthdays added yet. Add some to get started!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Upcoming Birthdays
      </h2>
      {birthdays.map((birthday) => (
        <BirthdayItem
          key={birthday._id}
          birthday={birthday}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BirthdayList;
