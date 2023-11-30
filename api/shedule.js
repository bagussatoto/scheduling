import agent from "./agent"

export default {
    all: () => agent.get('/schedule'),
    details: ({ day }) => agent.get('/schedule', {
        params: {
            day,
        }
    }),
    add: ({ title, day }) => agent.post('/schedule', {
        title,
        day,
    }),
    edit: (id, { title }) => agent.patch(`/schedule`, {
        title,
    }, {
        params: { id },
    }),
    delete: (id) => agent.delete('/schedule', {
        params: {
            id,
        },
    })
}