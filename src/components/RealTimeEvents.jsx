import React, { useState, useEffect } from 'react';
import realTimeEventsService from '../services/realTimeEventsService';
import './RealTimeEvents.css';

const RealTimeEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const handleLaunchEvent = (event) => {
            setEvents(prev => {
                const filtered = prev.filter(e => !(e.type === 'launch' && e.title === event.title));
                return [event, ...filtered].slice(0, 10);
            });
        };

        const handleSpacewalkEvent = (event) => {
            setEvents(prev => {
                const filtered = prev.filter(e => !(e.type === 'spacewalk' && e.title === event.title));
                return [event, ...filtered].slice(0, 10);
            });
        };

        const handleAlignmentEvent = (event) => {
            setEvents(prev => {
                const filtered = prev.filter(e => !(e.type === 'alignment' && e.title === event.title));
                return [event, ...filtered].slice(0, 10);
            });
        };

        const handleMeteorEvent = (event) => {
            setEvents(prev => {
                const filtered = prev.filter(e => !(e.type === 'meteor' && e.title === event.title));
                return [event, ...filtered].slice(0, 10);
            });
        };

        // Subscribe to events
        realTimeEventsService.subscribe('launch', handleLaunchEvent);
        realTimeEventsService.subscribe('spacewalk', handleSpacewalkEvent);
        realTimeEventsService.subscribe('alignment', handleAlignmentEvent);
        realTimeEventsService.subscribe('meteor', handleMeteorEvent);

        // Connect to service
        realTimeEventsService.connect();
        setIsLive(true);

        return () => {
            realTimeEventsService.unsubscribe('launch', handleLaunchEvent);
            realTimeEventsService.unsubscribe('spacewalk', handleSpacewalkEvent);
            realTimeEventsService.unsubscribe('alignment', handleAlignmentEvent);
            realTimeEventsService.unsubscribe('meteor', handleMeteorEvent);
            realTimeEventsService.disconnect();
            setIsLive(false);
        };
    }, []);

    const getEventIcon = (type) => {
        const icons = {
            launch: '🚀',
            spacewalk: '👨‍🚀',
            alignment: '🪐',
            meteor: '☄️'
        };
        return icons[type] || '🌌';
    };

    const getStatusColor = (status) => {
        const colors = {
            live: '#ff4444',
            active: '#44ff44',
            upcoming: '#ffaa44'
        };
        return colors[status] || '#888';
    };

    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString();
    };

    return (
        <div className="real-time-events">
            <div className="events-header">
                <h2>🔴 Live Space Events</h2>
                <div className={`connection-status ${isLive ? 'live' : 'offline'}`}>
                    <span className="status-dot"></span>
                    {isLive ? 'LIVE' : 'OFFLINE'}
                </div>
            </div>

            <div className="events-container">
                {events.length === 0 ? (
                    <div className="no-events">
                        <p>Waiting for live events...</p>
                    </div>
                ) : (
                    events.map((event, index) => (
                        <div key={`${event.type}-${index}`} className={`event-card ${event.status}`}>
                            <div className="event-header">
                                <span className="event-icon">{getEventIcon(event.type)}</span>
                                <div className="event-info">
                                    <h3>{event.title}</h3>
                                    <div className="event-status">
                                        <span 
                                            className="status-badge" 
                                            style={{ backgroundColor: getStatusColor(event.status) }}
                                        >
                                            {event.status.toUpperCase()}
                                        </span>
                                        <span className="event-time">{formatTime(event.time)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="event-description">{event.description}</p>
                            
                            <div className="event-details">
                                {event.viewers && (
                                    <span className="detail">👁️ {event.viewers.toLocaleString()} viewers</span>
                                )}
                                {event.duration && (
                                    <span className="detail">⏱️ {event.duration}</span>
                                )}
                                {event.visibility && (
                                    <span className="detail">🌍 {event.visibility}</span>
                                )}
                                {event.intensity && (
                                    <span className="detail">⚡ {event.intensity} intensity</span>
                                )}
                            </div>

                            {event.status === 'live' && (
                                <button className="watch-live-btn">
                                    🔴 Watch Live
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RealTimeEvents;