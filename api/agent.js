import axios from 'axios'

const agent =  axios.create({
    baseURL: 'https://getjadwal.api.devcode.gethired.id/',
});

agent.interceptors.request.use(config => {
    const email = localStorage.getItem('email');
    return {
        ...config,
        params: {
            ...config.params,
            ...(config.url !== '/checkin' && {
                email: email?.replaceAll('"','')
            })
        }
    }
})

export default agent;