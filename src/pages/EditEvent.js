import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = ({ events = [], setEvents }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const eventIndex = Number(index);
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Validate index and set event description if event exists
    if (isNaN(eventIndex) || eventIndex < 0 || eventIndex >= events.length) {
      navigate('/'); // Redirect to home or show error
    } else {
      setDescription(events[eventIndex]?.description || '');
    }
  }, [eventIndex, events, navigate]);

  const handleUpdateEvent = () => {
    if (description.trim()) {
      const updatedEvents = events.map((event, i) =>
        i === eventIndex ? { ...event, description } : event
      );
      setEvents(updatedEvents);
      navigate('/'); // Redirect to home or events list
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      {events[eventIndex] ? (
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdateEvent}>Save</button>
          <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};

export default EditEvent;
