import axios from 'axios'

export default {
    login(payload){
        return axios.post('/login', payload)
            .then(response => {
                return response.data
            }).catch(err => {
                return 'Authentication failed'
            })
    },
    logout(){
        return axios.get('/logout')
            .then(response => {
                return response.data
            }).catch(err => {
                return 'Error in Logout.'
            })
    }
}