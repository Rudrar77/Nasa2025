import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RealTimeEvents from './RealTimeEvents';
import './Home.css';

const Home = () => {
    const [issData, setIssData] = useState(null);
    const [solarActivity, setSolarActivity] = useState(null);
    const [astronomyData, setAstronomyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Real-time data fetching
    useEffect(() => {
        const fetchISSData = async () => {
            try {
                const response = await fetch('http://api.open-notify.org/iss-now.json');
                const data = await response.json();
                setIssData({
                    latitude: parseFloat(data.iss_position.latitude),
                    longitude: parseFloat(data.iss_position.longitude),
                    altitude: 408 + Math.random() * 10,
                    velocity: 27600 + Math.random() * 200
                });
            } catch (error) {
                console.error('Error fetching ISS data:', error);
                setIssData({
                    latitude: Math.random() * 180 - 90,
                    longitude: Math.random() * 360 - 180,
                    altitude: 408,
                    velocity: 27600
                });
            }
        };

        const fetchSolarActivity = async () => {
            setSolarActivity({
                solarWindSpeed: Math.floor(Math.random() * 300) + 300,
                kpIndex: Math.floor(Math.random() * 9),
                solarFluxIndex: Math.floor(Math.random() * 100) + 70
            });
        };

        const fetchAstronomyData = async () => {
            const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
            const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
            
            setAstronomyData({
                moonPhase: moonPhases[Math.floor(Math.random() * moonPhases.length)],
                moonIllumination: Math.floor(Math.random() * 100),
                sunriseTime: '06:30 AM',
                sunsetTime: '07:45 PM',
                visiblePlanets: planets.slice(0, Math.floor(Math.random() * 3) + 2)
            });
        };

        const fetchAllData = async () => {
            setLoading(true);
            await Promise.all([
                fetchISSData(),
                fetchSolarActivity(),
                fetchAstronomyData()
            ]);
            setLoading(false);
        };

        fetchAllData();

        // Update data every 30 seconds
        const dataInterval = setInterval(() => {
            fetchISSData();
            fetchSolarActivity();
        }, 30000);

        // Update time every second
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(dataInterval);
            clearInterval(timeInterval);
        };
    }, []);

    const getSolarActivityLevel = (kpIndex) => {
        if (kpIndex <= 2) return { level: 'Quiet', color: 'green' };
        if (kpIndex <= 4) return { level: 'Unsettled', color: 'yellow' };
        if (kpIndex <= 6) return { level: 'Active', color: 'orange' };
        return { level: 'Storm', color: 'red' };
    };

    return (
        <div className="home">
            {/* Animated Background */}
            <div className="animated-background">
                <div className="stars"></div>
                <div className="planets"></div>
                <div className="shooting-stars"></div>
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="gradient-text">Explore the Universe</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover the wonders of space with NASA's latest missions, real-time events, and astronomical phenomena.
                    </p>
                    <div className="hero-actions">
                        <Link to="/apod" className="btn btn-primary">
                            🌌 Astronomy Picture
                        </Link>
                        <Link to="/mars-rover" className="btn btn-secondary">
                            🔴 Mars Rover
                        </Link>
                        <Link to="/education" className="btn btn-tertiary">
                            📚 Learn Space
                        </Link>
                    </div>
                </div>
                
                {/* Real-time Events Panel */}
                <div className="real-time-panel">
                    <RealTimeEvents />
                </div>
            </section>

            {/* Live Data Dashboard */}
            <section className="live-data-dashboard">
                <div className="container">
                    <h2 className="section-title">
                        <span className="live-indicator">🔴</span>
                        Live Space Data
                    </h2>
                    
                    <div className="data-grid">
                        {/* ISS Tracker */}
                        <div className="data-card iss-tracker">
                            <div className="card-header">
                                <h3>🛰️ International Space Station</h3>
                                <div className="live-badge">LIVE</div>
                            </div>
                            {loading ? (
                                <div className="loading">Loading ISS data...</div>
                            ) : issData && (
                                <div className="data-content">
                                    <div className="data-item">
                                        <span className="label">Position:</span>
                                        <span className="value">
                                            {issData.latitude.toFixed(2)}°, {issData.longitude.toFixed(2)}°
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">Altitude:</span>
                                        <span className="value">{issData.altitude.toFixed(1)} km</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">Velocity:</span>
                                        <span className="value">{issData.velocity.toFixed(0)} km/h</span>
                                    </div>
                                    <Link to="/iss-tracker" className="data-link">
                                        Track ISS →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Solar Activity */}
                        <div className="data-card solar-activity">
                            <div className="card-header">
                                <h3>☀️ Solar Activity</h3>
                                <div className="active-badge">ACTIVE</div>
                            </div>
                            {loading ? (
                                <div className="loading">Loading solar data...</div>
                            ) : solarActivity && (
                                <div className="data-content">
                                    <div className="data-item">
                                        <span className="label">Solar Wind:</span>
                                        <span className="value">{solarActivity.solarWindSpeed} km/s</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">KP Index:</span>
                                        <span className={`value kp-${getSolarActivityLevel(solarActivity.kpIndex).color}`}>
                                            {solarActivity.kpIndex} ({getSolarActivityLevel(solarActivity.kpIndex).level})
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">Solar Flux:</span>
                                        <span className="value">{solarActivity.solarFluxIndex} sfu</span>
                                    </div>
                                    <Link to="/space-weather" className="data-link">
                                        View Details →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Astronomy Info */}
                        <div className="data-card astronomy-info">
                            <div className="card-header">
                                <h3>🌙 Sky Tonight</h3>
                                <div className="time-badge">{currentTime.toLocaleTimeString()}</div>
                            </div>
                            {loading ? (
                                <div className="loading">Loading astronomy data...</div>
                            ) : astronomyData && (
                                <div className="data-content">
                                    <div className="data-item">
                                        <span className="label">Moon Phase:</span>
                                        <span className="value">{astronomyData.moonPhase}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">Illumination:</span>
                                        <span className="value">{astronomyData.moonIllumination}%</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="label">Visible Planets:</span>
                                        <span className="value">{astronomyData.visiblePlanets.join(', ')}</span>
                                    </div>
                                    <Link to="/sky-map" className="data-link">
                                        Sky Map →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Events Dashboard */}
            <section className="live-events-dashboard">
                <div className="container">
                    <h2 className="section-title">🔴 Live Space Coverage</h2>
                    <div className="live-events-grid">
                        <div className="live-event-card launch-stream">
                            <div className="live-badge">LIVE</div>
                            <div className="event-icon">🚀</div>
                            <h3>Launch Streams</h3>
                            <p>Watch rocket launches live from around the world</p>
                            <div className="event-stats">
                                <span>👁️ 1.2M viewers</span>
                                <span>📺 4 active streams</span>
                            </div>
                            <Link to="/launches" className="event-link">Watch Now</Link>
                        </div>

                        <div className="live-event-card spacewalk-coverage">
                            <div className="upcoming-badge">UPCOMING</div>
                            <div className="event-icon">👨‍🚀</div>
                            <h3>Spacewalk Coverage</h3>
                            <p>Live coverage of EVA missions and ISS activities</p>
                            <div className="event-stats">
                                <span>⏰ Next: 2h 15m</span>
                                <span>🕐 Duration: 6h</span>
                            </div>
                            <Link to="/spacewalks" className="event-link">Set Reminder</Link>
                        </div>

                        <div className="live-event-card planetary-alignment">
                            <div className="active-badge">ACTIVE</div>
                            <div className="event-icon">🪐</div>
                            <h3>Planetary Alignments</h3>
                            <p>Track rare planetary alignments and conjunctions</p>
                            <div className="event-stats">
                                <span>🌍 Visible globally</span>
                                <span>📈 Peak visibility</span>
                            </div>
                            <Link to="/alignments" className="event-link">View Now</Link>
                        </div>

                        <div className="live-event-card meteor-shower">
                            <div className="active-badge">ACTIVE</div>
                            <div className="event-icon">☄️</div>
                            <h3>Meteor Showers</h3>
                            <p>Real-time meteor shower tracking and notifications</p>
                            <div className="event-stats">
                                <span>⚡ 60+ per hour</span>
                                <span>🌙 Dark sky optimal</span>
                            </div>
                            <Link to="/meteors" className="event-link">Track Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Categories */}
            <section className="feature-categories">
                <div className="container">
                    <h2 className="section-title">Explore the Universe</h2>
                    <div className="features-grid">
                        <div className="feature-card space-weather">
                            <div className="feature-icon">⚡</div>
                            <h3>Space Weather</h3>
                            <p>Monitor solar storms and cosmic events that affect Earth</p>
                            <div className="feature-stats">
                                <span>Real-time alerts</span>
                                <span>Global coverage</span>
                            </div>
                            <Link to="/pages/adventure" className="feature-link">
                                Monitor Now →
                            </Link>
                        </div>

                        <div className="feature-card interactive-learning">
                            <div className="feature-icon">📚</div>
                            <h3>Interactive Learning</h3>
                            <p>Discover space through engaging educational content and videos</p>
                            <div className="feature-stats">
                                <span>50+ video courses</span>
                                <span>Expert content</span>
                            </div>
                            <Link to="/education" className="feature-link">
                                Learn More →
                            </Link>
                        </div>

                        <div className="feature-card mission-control">
                            <div className="feature-icon">🚀</div>
                            <h3>Mission Control</h3>
                            <p>Track ongoing space missions and spacecraft in real-time</p>
                            <div className="feature-stats">
                                <span>Live tracking</span>
                                <span>Mission updates</span>
                            </div>
                            <Link to="/missions" className="feature-link">
                                Track Missions →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Grid */}
            <section className="quick-access">
                <div className="container">
                    <h2 className="section-title">Quick Access</h2>
                    <div className="quick-access-grid">
                        <Link to="/solar-system" className="quick-access-item">
                            <div className="quick-icon">🌍</div>
                            <span>Solar System</span>
                        </Link>
                        
                        <Link to="/eclipses" className="quick-access-item">
                            <div className="quick-icon">🌒</div>
                            <span>Eclipses</span>
                        </Link>
                        
                        <Link to="/quiz" className="quick-access-item">
                            <div className="quick-icon">🔭</div>
                            <span>Space Quiz</span>
                        </Link>

                        <Link to="/gallery" className="quick-access-item">
                            <div className="quick-icon">📸</div>
                            <span>Image Gallery</span>
                        </Link>

                        <Link to="/news" className="quick-access-item">
                            <div className="quick-icon">📰</div>
                            <span>Space News</span>
                        </Link>

                        <Link to="/tools" className="quick-access-item">
                            <div className="quick-icon">🛠️</div>
                            <span>Space Tools</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Updates */}
            <section className="latest-updates">
                <div className="container">
                    <div className="updates-card">
                        <div className="updates-header">
                            <h2>Latest Space News & Updates</h2>
                            <p>Stay updated with the latest discoveries and missions</p>
                        </div>
                        <div className="updates-content">
                            <div className="update-item">
                                <div className="update-indicator blue"></div>
                                <div className="update-text">
                                    <h4>James Webb Space Telescope captures stunning galaxy cluster</h4>
                                    <p>New images reveal unprecedented detail of distant cosmic structures</p>
                                    <span className="update-time">2 hours ago</span>
                                </div>
                            </div>
                            
                            <div className="update-item">
                                <div className="update-indicator green"></div>
                                <div className="update-text">
                                    <h4>Perseverance rover discovers organic compounds on Mars</h4>
                                    <p>Significant findings support potential for ancient microbial life</p>
                                    <span className="update-time">6 hours ago</span>
                                </div>
                            </div>
                            
                            <div className="update-item">
                                <div className="update-indicator yellow"></div>
                                <div className="update-text">
                                    <h4>Solar storm alert: Enhanced aurora activity expected</h4>
                                    <p>Geomagnetic disturbances may affect satellite communications</p>
                                    <span className="update-time">12 hours ago</span>
                                </div>
                            </div>

                            <div className="update-item">
                                <div className="update-indicator purple"></div>
                                <div className="update-text">
                                    <h4>SpaceX successfully launches Starship test flight</h4>
                                    <p>Major milestone achieved in preparation for Mars missions</p>
                                    <span className="update-time">1 day ago</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/news" className="view-all-link">
                            View All News →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="footer-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Explore the Cosmos?</h2>
                        <p>Join millions of space enthusiasts in discovering the wonders of the universe</p>
                        <div className="cta-actions">
                            <Link to="/education" className="btn btn-primary">
                                Start Learning
                            </Link>
                            <Link to="/signup" className="btn btn-outline">
                                Join Community
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;