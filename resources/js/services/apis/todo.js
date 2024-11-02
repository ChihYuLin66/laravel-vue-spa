
import BaseAxios from '@/plugins/axios';

const API_URL = '/todos'

export const fetchIndex = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const store = async (todo) => {
    const response = await axios.post(API_URL, todo)
    return response.data
}

export const update = async (id, todo) => {
    const response = await axios.put(`${API_URL}/${id}`, todo)
    return response.data
}

export const destroy = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
}