import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RealTimeEvents from './RealTimeEvents';
// ...existing imports...

const Home = () => {
    // ...existing code...

    return (
        <div className="home">
            {/* ...existing code... */}
            
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Explore the Universe</h1>
                    <p>Discover the wonders of space with NASA's latest missions, real-time events, and astronomical phenomena.</p>
                    <div className="hero-actions">
                        <Link to="/apod" className="btn btn-primary">Astronomy Picture</Link>
                        <Link to="/mars-rover" className="btn btn-secondary">Mars Rover</Link>
                    </div>
                </div>
                
                {/* Real-time Events Panel */}
                <div className="real-time-panel">
                    <RealTimeEvents />
                </div>
            </section>

            {/* Live Events Dashboard */}
            <section className="live-events-dashboard">
                <div className="container">
                    <h2>🔴 Live Space Coverage</h2>
                    <div className="live-events-grid">
                        <div className="live-event-card launch-stream">
                            <div className="live-badge">LIVE</div>
                            <h3>🚀 Launch Streams</h3>
                            <p>Watch rocket launches live from around the world</p>
                            <div className="event-stats">
                                <span>👁️ 1.2M viewers</span>
                                <span>📺 4 active streams</span>
                            </div>
                        </div>

                        <div className="live-event-card spacewalk-coverage">
                            <div className="upcoming-badge">UPCOMING</div>
                            <h3>👨‍🚀 Spacewalk Coverage</h3>
                            <p>Live coverage of EVA missions and ISS activities</p>
                            <div className="event-stats">
                                <span>⏰ Next: 2h 15m</span>
                                <span>🕐 Duration: 6h</span>
                            </div>
                        </div>

                        <div className="live-event-card planetary-alignment">
                            <div className="active-badge">ACTIVE</div>
                            <h3>🪐 Planetary Alignments</h3>
                            <p>Track rare planetary alignments and conjunctions</p>
                            <div className="event-stats">
                                <span>🌍 Visible globally</span>
                                <span>📈 Peak visibility</span>
                            </div>
                        </div>

                        <div className="live-event-card meteor-shower">
                            <div className="active-badge">ACTIVE</div>
                            <h3>☄️ Meteor Showers</h3>
                            <p>Real-time meteor shower tracking and notifications</p>
                            <div className="event-stats">
                                <span>⚡ 60+ per hour</span>
                                <span>🌙 Dark sky optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ...existing sections... */}
        </div>
    );
};

export default Home;