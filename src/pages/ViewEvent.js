import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEvent = ({ events = [] }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const eventIndex = Number(index);

  if (!Array.isArray(events) || isNaN(eventIndex) || eventIndex < 0 || eventIndex >= events.length) {
    return <p>Event not found</p>;
  }

  const event = events[eventIndex];

  return (
    <div>
      <h2>Event Details</h2>
      <p>{event.description}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ViewEvent;
