import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertWine = payload => api.post(`/wine`, payload)
export const getAllWines = () => api.get(`/wines`)
export const updateWineById = (id, payload) => api.put(`/wine/${id}`, payload)
export const deleteWineById = id => api.delete(`/wine/${id}`)
export const getWineById = id => api.get(`/wine/${id}`)

const apis = {
    insertWine,
    getAllWines,
    updateWineById,
    deleteWineById,
    getWineById,
}

export default apis