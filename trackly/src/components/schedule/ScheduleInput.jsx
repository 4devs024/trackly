// src/components/WeeklyScheduleInput.js
import './scheduleInput.css'

import React, { useState } from 'react';
//import axios from 'axios';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ScheduleInput = ({ driverId, busId, route }) => {

  const initialSchedules = daysOfWeek.map(day => ({
    day,
    entries: [{ departureTime: '', arrivalTime: '' }]
  }));

  const [schedules, setSchedules] = useState(initialSchedules);

  const handleAddEntry = (dayIndex) => {
    const newSchedules = schedules.slice();
    newSchedules[dayIndex].entries.push({ departureTime: '', arrivalTime: '' });
    setSchedules(newSchedules);
  };

  const handleRemoveEntry = (dayIndex, entryIndex) => {
    const newSchedules = [...schedules];
    newSchedules[dayIndex].entries.splice(entryIndex, 1);
    setSchedules(newSchedules);
  };

  const handleInputChange = (dayIndex, entryIndex, field, value) => {
    const newSchedules = schedules.slice();
    newSchedules[dayIndex].entries[entryIndex][field] = value;
    setSchedules(newSchedules);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const scheduleEntries = [];
    // schedules.forEach(schedule => {
    //   schedule.entries.forEach(entry => {
    //     scheduleEntries.push({
    //       driverId,
    //       busId,
    //       route,
    //       day_of_week: schedule.day,
    //       departure_time: entry.departureTime,
    //       arrival_time: entry.arrivalTime
    //     });
    //   });
    // });

    // axios.post('/api/schedules', { scheduleEntries })
    //   .then(response => {
    //     alert('Schedules submitted successfully');
    //   })
    //   .catch(error => {
    //     alert('Failed to submit schedules');
    //   });
  };


  return (
    <div className="schedule-container">
      <form onSubmit={handleSubmit}>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {schedules.map((schedule, dayIndex) => (
              schedule.entries.map((entry, entryIndex) => (
                <tr key={`${dayIndex}-${entryIndex}`} style={{border: "1px solid black"}}>
                  {entryIndex === 0 && (
                    <td rowSpan={schedule.entries.length}>
                      {schedule.day}
                    </td>
                  )}
                  <td>
                    <input
                      type="time"
                      value={entry.departureTime}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'departureTime', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={entry.arrivalTime}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'arrivalTime', e.target.value)}
                      required
                    />
                  </td>
                  {
                    entryIndex !== schedule.entries.length - 1 && (
                      <td>
                        <button type="button" className="add-entry-button" onClick={() => handleRemoveEntry(dayIndex)}>
                          Remove Entry
                        </button>
                      </td>
                    )
                  }
                  {entryIndex === schedule.entries.length - 1 && (
                    <td>
                      <button type="button" className="add-entry-button" onClick={() => handleAddEntry(dayIndex)}>
                        Add Another Entry
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ))}
          </tbody>
        </table>
        <button type="submit" className="submit-button">Submit Weekly Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleInput;


// import React, { useState } from 'react';
// import './scheduleInput.css';

// const initialSchedule = [
//   { day: 'Monday', entries: [] },
//   { day: 'Tuesday', entries: [] },
//   { day: 'Wednesday', entries: [] },
//   { day: 'Thursday', entries: [] },
//   { day: 'Friday', entries: [] },
//   { day: 'Saturday', entries: [] },
//   { day: 'Sunday', entries: [] },
// ];

// const ScheduleInput = () => {
//   const [schedules, setSchedules] = useState(initialSchedule);

//   const handleInputChange = (dayIndex, entryIndex, field, value) => {
//     const newSchedules = [...schedules];
//     newSchedules[dayIndex].entries[entryIndex][field] = value;
//     setSchedules(newSchedules);
//   };

//   const handleAddEntry = (dayIndex) => {
//     const newSchedules = [...schedules];
//     newSchedules[dayIndex].entries.push({ departureTime: '', arrivalTime: '' });
//     setSchedules(newSchedules);
//   };

//   const handleRemoveEntry = (dayIndex, entryIndex) => {
//     const newSchedules = [...schedules];
//     newSchedules[dayIndex].entries.splice(entryIndex, 1);
//     setSchedules(newSchedules);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Schedules:', schedules);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="schedule-form">
//       {schedules.map((schedule, dayIndex) => (
//         <div key={dayIndex} className="schedule-day">
//           <h3>{schedule.day}</h3>
//           {schedule.entries.map((entry, entryIndex) => (
//             <div key={entryIndex} className="schedule-entry">
//               <label>
//                 Departure Time:
//                 <input
//                   type="time"
//                   value={entry.departureTime}
//                   onChange={(e) => handleInputChange(dayIndex, entryIndex, 'departureTime', e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Arrival Time:
//                 <input
//                   type="time"
//                   value={entry.arrivalTime}
//                   onChange={(e) => handleInputChange(dayIndex, entryIndex, 'arrivalTime', e.target.value)}
//                   required
//                 />
//               </label>
//               <button className='remove-entry-button' type="button" onClick={() => handleRemoveEntry(dayIndex, entryIndex)}>
//                 Remove Entry
//               </button>
//             </div>
//           ))}
//           <button className='add-entry-button' type="button" onClick={() => handleAddEntry(dayIndex)}>
//             Add Another Entry
//           </button>
//         </div>
//       ))}
//       <button type="submit">Submit Weekly Schedule</button>
//     </form>
//   );
// };

// export default ScheduleInput;
