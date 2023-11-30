import agent from "./agent";

export default {
    checkin: (email) => agent.post('/checkin', { email }),
}