import { useQuery } from 'react-query';
import { fetchStudentsData } from '../api/api';

// Custom hook for fetching data using React Query
export const useFetchStudentsData = () => {
    return useQuery('students', fetchStudentsData);
};
