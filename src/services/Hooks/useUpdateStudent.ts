import { useMutation, useQueryClient } from 'react-query';
import { updateStudent } from '../api/api';


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