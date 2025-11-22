import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComp(todayDate) {
  const [date, setDate] = useState(todayDate.value || new Date());
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await fetch(`http://localhost:5000/api/users/wellness?email=testuser444@example.com&date=${formattedDate}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setValue(result[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div className="flex shadow-xl p-4 margin-top-4">
      <Calendar
        value={date}
        onClickDay={(value) => setDate(value)}
      />
      <p className="mt-3 text-blue-600 font-bold">
        {date.toString()}
      </p>
      {/* Optionally display fetched value */}
      {value && (
        <div>
          <p>Steps: {value.steps}</p>
          <p>Sleep Hours: {value.sleepHours}</p>
          <p>BP: {value.BP}</p>
          <p>Status: {value.status}</p>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}