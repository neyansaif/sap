interface Student {
    id: number;
    name: string;
    gender: string;
    placedob: string;
    groups: string[];
}

const API_URL = "http://localhost:8000/students";


//For Fetch API call 
const fetchStudentsData = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`Server Error While Fetching Students Data ${error}`);
        throw error; // rethrow the error to handle it in the main component
    }
};

//For Post API call
const addStudent = async (formData: FormData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }
    } catch (error) {
        console.error(`Failed to add student ${error}`);
        throw error; // rethrow the error to handle it in the main component
    }
};


//For Delete API call
const deleteStudent = (id: number): Promise<void> => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to delete student");
        }
    });
};


//For Update API call
const updateStudent = (student: Student): Promise<Student> => {
    return fetch(`${API_URL}/${student.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to update student");
        }
        return res.json();
    });
};



export { fetchStudentsData, addStudent, deleteStudent, updateStudent };

