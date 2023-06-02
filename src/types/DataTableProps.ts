import { Student } from "../types/Student";

export type DataTableProps = {
    students: Student[];
    isLoading: boolean;
    error: string | unknown;
    searchTerm: string;
};