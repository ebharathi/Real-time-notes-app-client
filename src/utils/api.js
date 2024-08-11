import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Base URL for the API

const getToken = () => {
    return localStorage.getItem("token");
}

// User Authentication
export const SignUp = async (email, name, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/signup`, {
            email,
            name,
            password
        });
        return response.data;
    } catch (error) {
        console.error("ERROR IN SIGNUP:", error);
        return { error: true, message: "Error in signup" };
    }
};

export const SignIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("ERROR IN SIGNIN:", error);
        return { error: true, message: "Error in signin" };
    }
};

// Notes CRUD Operations

// Create Note
export const createNote = async (content) => {
    try {
        const token = getToken();
        console.log("TOKENl ", token);
        const response = await axios.post(
            `${API_BASE_URL}/notes/create`,
            { content },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("ERROR IN CREATING NOTE:", error);
        return { error: true, message: "Error in creating note" };
    }
};

// Read Notes
export const readNotes = async () => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/notes/read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("ERROR IN READING NOTES:", error);
        return { error: true, message: "Error in reading notes" };
    }
};

// Read Notes
export const getNoteById = async (noteId) => {
    try {
        const token = getToken();
        const response = await axios.get(
            `${API_BASE_URL}/notes/getNote?noteId=${noteId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("ERROR IN READING NOTES:", error);
        return { error: true, message: "Error in reading notes" };
    }
};

// Update Note
export const updateNote = async (noteId, content) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/notes/update`,
            { noteId, content },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("ERROR IN UPDATING NOTE:", error);
        return { error: true, message: "Error in updating note" };
    }
};

// Delete Note
export const deleteNote = async (noteId) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/notes/delete`,
            { noteId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("ERROR IN DELETING NOTE:", error);
        return { error: true, message: "Error in deleting note" };
    }
};


// Create access
export const grantAccess = async (noteId, email, accessLevel) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/access/add`,
            { noteId, email, accessLevel },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: "Error in granting/creating access " };
    }
};

export const getAccessList = async (noteId) => {
    try {
        const token = getToken();
        const response = await axios.get(
            `${API_BASE_URL}/access/list?noteId=${noteId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: "Error in getting access list " };
    }
}

export const updateAccessLevel = async (noteId, email, accessLevel) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/access/update`,
            {
                noteId,
                email,
                accessLevel
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: "Error in updating access " };
    }
}
export const revokeAccess = async (noteId, email) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/access/delete`,
            {
                noteId,
                email
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: "Error in revoking access " };
    }
}
export const verifyAccess = async (noteId) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/access/verify`,
            {
                noteId,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: "Error in checking access " };
    }
}

