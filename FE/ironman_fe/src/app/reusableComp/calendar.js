"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function CalendarComp(todayDate) {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');

  return (
    <div className="flex shadow-xl p-4 margin-top-4">
      <Calendar
      value={todayDate.value}
        onClickDay={(value) => {
          console.log(value);  
          setDate(value);       
        }} 
      />
       <p className="mt-3 text-blue-600 font-bold">
        {date.toString()}
      </p>
    </div>
  );
}