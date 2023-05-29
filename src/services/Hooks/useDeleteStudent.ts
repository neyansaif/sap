import { useMutation, useQueryClient } from 'react-query';
import { deleteStudent } from '../api/api';


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