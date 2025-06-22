import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Plus, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 2, 15),
      time: '10:00 AM',
      location: 'Conference Room A',
      attendees: 8,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2024, 2, 20),
      time: '5:00 PM',
      location: 'Online',
      attendees: 5,
      type: 'deadline'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2024, 2, 25),
      time: '2:00 PM',
      location: 'Client Office',
      attendees: 12,
      type: 'presentation'
    },
    {
      id: 4,
      title: 'Code Review',
      date: new Date(2024, 2, 18),
      time: '11:00 AM',
      location: 'Dev Room',
      attendees: 6,
      type: 'review'
    }
  ]);

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '',
    location: '',
    attendees: 0,
    type: 'meeting'
  });

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'var(--accent-primary)';
      case 'deadline':
        return 'var(--accent-danger)';
      case 'presentation':
        return 'var(--accent-secondary)';
      case 'review':
        return 'var(--accent-warning)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      ...newEvent,
      date: new Date(newEvent.date)
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '',
      location: '',
      attendees: 0,
      type: 'meeting'
    });
    setShowEventForm(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '2px',
            marginTop: '4px'
          }}>
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: getEventTypeColor(event.type),
                  borderRadius: '50%'
                }}
              />
            ))}
            {dayEvents.length > 2 && (
              <div style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginLeft: '2px'
              }}>
                +{dayEvents.length - 2}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateEvents = getEventsForDate(date);

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Calendar
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your schedule and upcoming events.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Calendar */}
        <div className="card calendar-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3>Calendar</h3>
            <button 
              className="btn btn-primary"
              onClick={() => setShowEventForm(true)}
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>
          
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            className="react-calendar"
          />
        </div>

        {/* Events for Selected Date */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>
            Events for {format(date, 'MMMM d, yyyy')}
          </h3>
          
          {selectedDateEvents.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: 'var(--text-muted)'
            }}>
              <p>No events scheduled for this date</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${getEventTypeColor(event.type)}`
                  }}
                >
                  <h4 style={{ 
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {event.title}
                  </h4>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '4px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={14} />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '20px' }}>Upcoming Events</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '16px'
        }}>
          {events
            .filter(event => event.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 6)
            .map((event) => (
              <div
                key={event.id}
                className="card"
                style={{
                  padding: '16px',
                  borderLeft: `4px solid ${getEventTypeColor(event.type)}`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600' }}>
                    {event.title}
                  </h4>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: `${getEventTypeColor(event.type)}20`,
                    color: getEventTypeColor(event.type),
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {event.type}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '6px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  <div>📅 {format(event.date, 'MMM d, yyyy')}</div>
                  <div>🕐 {event.time}</div>
                  <div>📍 {event.location}</div>
                  <div>👥 {event.attendees} attendees</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ 
            padding: '24px', 
            width: '90%', 
            maxWidth: '500px',
            margin: '20px'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Event</h3>
            
            <form onSubmit={handleAddEvent}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Event Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Date
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={newEvent.date.toISOString().split('T')[0]}
                    onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Time
                  </label>
                  <input
                    type="time"
                    className="input"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Attendees
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({...newEvent, attendees: parseInt(e.target.value)})}
                    min="0"
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Type
                  </label>
                  <select
                    className="input"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    style={{ width: '100%' }}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="presentation">Presentation</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end'
              }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEventForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;