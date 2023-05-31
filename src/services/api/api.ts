import axios from 'axios';
import { Student } from '../../types/Student';
import { EditStudent } from '../../types/EditStudent';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

// Configure Axios instance to include the token in request headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});


// Fetch API call
export const fetchStudentsData = async () => {
    try {
        const { data } = await api.get<Student[]>(`${API_URL}/students-data`);
        return data;
    } catch (error) {
        console.log(`Server Error While Fetching Students Data ${error}`);
        throw error;
    }
};

// Post API call
export const addStudent = async (formData: Student) => {
    try {
        await api.post(`${API_URL}/add-student`, formData);
    } catch (error) {
        console.error(`Failed to add student ${error}`);
        throw error;
    }
};

// Delete API call
export const deleteStudent = async (_id: string | number) => {
    try {
        await api.delete(`${API_URL}/delete-student/${_id}`);
    } catch (error) {
        console.error(`Failed to delete student ${error}`);
        throw error;
    }
};

// Update API call
export const updateStudent = async (student: EditStudent) => {
    try {
        await api.put(`${API_URL}/update-student/${student.id}`, student);
    } catch (error) {
        console.error(`Failed to update student ${error}`);
        throw error;
    }
};
