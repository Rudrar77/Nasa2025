class RealTimeEventsService {
    constructor() {
        this.eventListeners = new Map();
        this.isConnected = false;
    }

    // Simulate real-time connection (in production, use WebSocket or Server-Sent Events)
    connect() {
        if (this.isConnected) return;
        
        this.isConnected = true;
        this.startEventSimulation();
    }

    disconnect() {
        this.isConnected = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    subscribe(eventType, callback) {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, []);
        }
        this.eventListeners.get(eventType).push(callback);
    }

    unsubscribe(eventType, callback) {
        if (this.eventListeners.has(eventType)) {
            const callbacks = this.eventListeners.get(eventType);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emit(eventType, data) {
        if (this.eventListeners.has(eventType)) {
            this.eventListeners.get(eventType).forEach(callback => callback(data));
        }
    }

    startEventSimulation() {
        // Simulate live events every 30 seconds
        this.intervalId = setInterval(() => {
            this.generateRandomEvent();
        }, 30000);

        // Initial events
        this.generateInitialEvents();
    }

    generateInitialEvents() {
        const events = [
            {
                type: 'launch',
                title: 'SpaceX Falcon Heavy Launch',
                description: 'Live coverage of Falcon Heavy mission to Mars',
                status: 'live',
                time: new Date(),
                viewers: 125000
            },
            {
                type: 'spacewalk',
                title: 'ISS Spacewalk EVA-96',
                description: 'Astronauts conducting maintenance on solar arrays',
                status: 'upcoming',
                time: new Date(Date.now() + 2 * 60 * 60 * 1000),
                duration: '6 hours'
            },
            {
                type: 'alignment',
                title: 'Jupiter-Saturn Alignment',
                description: 'Rare planetary alignment visible tonight',
                status: 'active',
                time: new Date(),
                visibility: 'Global'
            },
            {
                type: 'meteor',
                title: 'Perseid Meteor Shower Peak',
                description: 'Peak activity with 60+ meteors per hour',
                status: 'active',
                time: new Date(),
                intensity: 'High'
            }
        ];

        events.forEach(event => {
            this.emit(event.type, event);
        });
    }

    generateRandomEvent() {
        const eventTypes = ['launch', 'spacewalk', 'alignment', 'meteor'];
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        const events = {
            launch: {
                type: 'launch',
                title: 'Artemis Mission Update',
                description: 'Live updates from Mission Control',
                status: 'live',
                time: new Date(),
                viewers: Math.floor(Math.random() * 200000) + 50000
            },
            spacewalk: {
                type: 'spacewalk',
                title: 'Emergency EVA Scheduled',
                description: 'Unscheduled spacewalk for critical repairs',
                status: 'upcoming',
                time: new Date(Date.now() + Math.random() * 4 * 60 * 60 * 1000),
                duration: '4 hours'
            },
            alignment: {
                type: 'alignment',
                title: 'Mars Opposition',
                description: 'Mars at closest approach to Earth',
                status: 'active',
                time: new Date(),
                visibility: 'Worldwide'
            },
            meteor: {
                type: 'meteor',
                title: 'Unexpected Meteor Activity',
                description: 'Unusual meteor shower detected',
                status: 'active',
                time: new Date(),
                intensity: 'Moderate'
            }
        };

        this.emit(randomType, events[randomType]);
    }
}

export default new RealTimeEventsService();