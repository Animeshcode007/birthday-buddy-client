import React from "react";
import { format, differenceInCalendarDays } from "date-fns";

function BirthdayItem({ birthday, onEdit, onDelete }) {
  const today = new Date();
  const originalBirthDate = new Date(birthday.date);

  const birthMonthUTC = originalBirthDate.getUTCMonth();
  const birthDateUTC = originalBirthDate.getUTCDate();

  const currentYearUTC = today.getUTCFullYear();

  const startOfTodayUTC = new Date(
    Date.UTC(currentYearUTC, today.getUTCMonth(), today.getUTCDate())
  );

  let birthdayThisYearUTC = new Date(
    Date.UTC(currentYearUTC, birthMonthUTC, birthDateUTC)
  );

  let targetNextBirthdayUTC;

  if (differenceInCalendarDays(birthdayThisYearUTC, startOfTodayUTC) < 0) {
    targetNextBirthdayUTC = new Date(
      Date.UTC(currentYearUTC + 1, birthMonthUTC, birthDateUTC)
    );
  } else {
    targetNextBirthdayUTC = birthdayThisYearUTC;
  }

  const daysUntil = differenceInCalendarDays(
    targetNextBirthdayUTC,
    startOfTodayUTC
  );
  let daysText;
  if (daysUntil === 0) {
    daysText = <span className="font-bold text-pink-600">Today! 🎉</span>;
  } else if (daysUntil === 1) {
    daysText = <span className="font-semibold text-yellow-600">Tomorrow!</span>;
  } else if (daysUntil < 0) {
    daysText = <span className="text-gray-500">Passed (check logic)</span>;
  } else {
    daysText = <span className="text-blue-600">{daysUntil} days</span>;
  }

  return (
    <div className="bg-white p-5 shadow-lg rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4 sm:mb-0">
        <h3 className="text-xl font-semibold text-gray-800">{birthday.name}</h3>
        <p className="text-gray-600">
          {format(originalBirthDate, "MMMM do")}
          {birthday.relation && ` (${birthday.relation})`}
        </p>
        <p className="text-sm text-gray-500">
          Days until next birthday: {daysText}
        </p>
        {birthday.notes && (
          <p className="text-sm text-gray-500 mt-1 italic">
            Notes: {birthday.notes}
          </p>
        )}
      </div>
      <div className="flex space-x-2 self-end sm:self-center">
        <button
          onClick={() => onEdit(birthday)}
          className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(birthday._id)}
          className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BirthdayItem;
