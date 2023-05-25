import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Student } from '../types/Student';

const API_URL = 'http://localhost:8000/students';



// Fetch API call
const fetchStudentsData = async () => {
    try {
        const res = await axios.get<Student[]>(API_URL);
        return res.data;
    } catch (error) {
        console.log(`Server Error While Fetching Students Data ${error}`);
        throw error;
    }
};

// Post API call
const addStudent = async (formData: Student) => {
    try {
        await axios.post(API_URL, formData);
    } catch (error) {
        console.error(`Failed to add student ${error}`);
        throw error;
    }
};

// Delete API call
const deleteStudent = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Failed to delete student ${error}`);
        throw error;
    }
};

// Update API call
const updateStudent = async (student: Student) => {
    try {
        await axios.put(`${API_URL}/${student.id}`, student);
    } catch (error) {
        console.error(`Failed to update student ${error}`);
        throw error;
    }
};






// Custom hook for fetching data using React Query
export const useFetchStudentsData = () => {
    return useQuery('students', fetchStudentsData);
};

// Custom hook for adding a student using React Query
export const useAddStudent = () => {
    const queryClient = useQueryClient();

    return useMutation(addStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            console.error(`Failed to add student ${error}`);
        },
    });
};

// Custom hook for deleting a student using React Query
export const useDeleteStudent = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            console.error(`Failed to delete student ${error}`);
        },
    });
};

// Custom hook for updating a student using React Query
export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation(updateStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            console.error(`Failed to update student ${error}`);
        },
    });
};