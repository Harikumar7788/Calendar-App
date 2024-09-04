// src/pages/Home.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

const HomeWrapper = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;

  .react-calendar {
    width: 80%; /* Adjust the width for larger display */
    max-width: 800px; /* Max width to prevent it from getting too large */
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      width: 90%;
      padding: 15px;
    }

    @media (max-width: 480px) {
      width: 95%;
      padding: 10px;
    }

    .react-calendar__tile--now {
      background: #e0f7fa !important; /* Highlight today */
      color: black;
    }

    .react-calendar__tile--active {
      background: #007bff !important; /* Active date color */
      color: white !important;
    }

    .highlight {
      background: #ffeb3b !important; /* Highlight event dates */
      color: black !important;
    }
  }
`;

const EventForm = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    padding: 10px;
    margin-right: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    margin-top: 10px;
    padding: 8px 15px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #0056b3;
    }

    svg {
      margin-right: 5px;
    }
  }
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EventListItem = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  button {
    margin: 0 5px;
    padding: 5px 10px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.9;
    }

    svg {
      margin-right: 3px;
    }
  }

  .view-btn {
    background-color: #28a745; 
    margin:12px; 
    width:100px;
  }

  .edit-btn {
    background-color: #ffc107; 
     margin:12px; 
     width:100px;
  }

  .delete-btn {
    background-color: #dc3545; 
     margin:12px; 
     width:100px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
`;

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [modalEvent, setModalEvent] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, index: null, description: '' });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    if (eventDescription.trim()) {
      setEvents([...events, { date: selectedDate.toDateString(), description: eventDescription }]);
      setEventDescription('');
    }
  };


  const openEditModal = (index) => {
    setEditModal({ open: true, index, description: events[index].description });
  };

  
  const handleUpdateEvent = () => {
    if (editModal.description.trim()) {
      const updatedEvents = events.map((event, i) =>
        i === editModal.index ? { ...event, description: editModal.description } : event
      );
      setEvents(updatedEvents);
      setEditModal({ open: false, index: null, description: '' });
    }
  };


  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };


  const eventsForSelectedDate = events.filter((event) => event.date === selectedDate.toDateString());

  const highlightEvents = ({ date, view }) => {
    if (view === 'month') {
      const eventDate = events.some((event) => event.date === date.toDateString());
      return eventDate ? 'highlight' : null;
    }
  };

  return (
    <HomeWrapper>
      <h1>Calendar Application</h1>

      <CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={highlightEvents}
        />
      </CalendarWrapper>

      <EventForm>
        <h2>Add Event</h2>
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event description"
        />
        <button onClick={handleAddEvent}>
          <FaPlus /> Add Event
        </button>
      </EventForm>

      <div>
        <h2>Events on {selectedDate.toDateString()}</h2>
        <EventList>
          {eventsForSelectedDate.map((event, index) => (
            <EventListItem key={index}>
              <span>{event.description}</span>
              <ButtonGroup>
                <button className="view-btn" onClick={() => setModalEvent(event)}>
                  <FaEye /> View
                </button>
                <button className="edit-btn" onClick={() => openEditModal(index)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteEvent(index)}>
                  <FaTrash /> Delete
                </button>
              </ButtonGroup>
            </EventListItem>
          ))}
        </EventList>
      </div>

      {modalEvent && (
        <Modal>
          <ModalContent>
            <h2>Event Details</h2>
            <p>{modalEvent.description}</p>
            <button onClick={() => setModalEvent(null)}>Close</button>
          </ModalContent>
        </Modal>
      )}

      {editModal.open && (
        <Modal>
          <ModalContent>
            <h2>Edit Event</h2>
            <input
              type="text"
              value={editModal.description}
              onChange={(e) => setEditModal({ ...editModal, description: e.target.value })}
            />
            <button  className='delete-btn' onClick={handleUpdateEvent}>Save</button>
            <button className='view-btn' onClick={() => setEditModal({ open: false, index: null, description: '' })}>
              Cancel
            </button>
          </ModalContent>
        </Modal>
      )}
    </HomeWrapper>
  );
};

export default Home;
