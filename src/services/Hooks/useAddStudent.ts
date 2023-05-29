import { useMutation, useQueryClient } from 'react-query';
import { addStudent } from '../api/api';

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