import { EditStudent } from "./EditStudent";

export type EditStudentFormProps = {
    editStudent: EditStudent | null;
    onSave: (values: EditStudent) => void;
    onCancel: () => void;
};