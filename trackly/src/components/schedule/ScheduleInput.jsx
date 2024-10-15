import './scheduleInput.css'
import { useAddBusContext } from '../../contexts/driver/AddBusContext';
import { React, useEffect, useState } from 'react';

const ScheduleInput = () => {
  const { setSchedules, schedules, endPlaces } = useAddBusContext();
  
  // Create a state for available places
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // useEffect to update available places when endPlaces changes
  useEffect(() => {
    if (endPlaces.endPlaceOne && endPlaces.endPlaceTwo) {
      setAvailablePlaces([endPlaces.endPlaceOne, endPlaces.endPlaceTwo]);
    }
  }, [endPlaces]);

  const handleAddEntry = (dayIndex) => {
    const newSchedules = schedules.slice();
    newSchedules[dayIndex].entries.push({ departureTime: '', arrivalTime: '', departurePlace: '', arrivalPlace: '' });
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
    e.preventDefault();
    // Handle the form submission logic
  };

  return (
    <div className="schedule-container">
      <form onSubmit={handleSubmit}>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Departure Place</th>
              <th>Departure Time</th>
              <th>Arrival Place</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, dayIndex) => (
              schedule.entries.map((entry, entryIndex) => (
                <tr key={`${dayIndex}-${entryIndex}`} style={{ border: "1px solid black" }}>
                  {entryIndex === 0 && (
                    <td rowSpan={schedule.entries.length}>
                      {schedule.day}
                    </td>
                  )}
                  <td>
                    <select
                      value={entry.departurePlace}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'departurePlace', e.target.value)}
                      required
                    >
                      <option value="">Select Departure Place</option>
                      {availablePlaces.map((place, index) => (
                        <option 
                          key={index} 
                          value={place} 
                          disabled={entry.arrivalPlace === place}  // Disable if selected in arrival
                        >
                          {place}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="time"
                      value={entry.departureTime}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'departureTime', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <select
                      value={entry.arrivalPlace}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'arrivalPlace', e.target.value)}
                      required
                    >
                      <option value="">Select Arrival Place</option>
                      {availablePlaces.map((place, index) => (
                        <option 
                          key={index} 
                          value={place} 
                          disabled={entry.departurePlace === place}  // Disable if selected in departure
                        >
                          {place}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="time"
                      value={entry.arrivalTime}
                      onChange={(e) => handleInputChange(dayIndex, entryIndex, 'arrivalTime', e.target.value)}
                      required
                    />
                  </td>
                  {entryIndex !== schedule.entries.length - 1 && (
                    <td>
                      <button type="button" className="add-entry-button" onClick={() => handleRemoveEntry(dayIndex, entryIndex)}>
                        Remove Entry
                      </button>
                    </td>
                  )}
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
