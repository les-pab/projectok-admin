import axios from "axios";

export const fetchProfile = async (_id) => {
    try {
        const response = await axios.get(`/api/ched/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchStudents = async () => {
    try {
        const response = await axios.get(`/api/student`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchStudentsWithFilters = async (form) => {
    try {
        const response = await axios.post(`/api/student/filter`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchCounselors = async () => {
    try {
        const response = await axios.get(`/api/counselor`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchCounselorsWithFilters = async (form) => {
    try {
        const response = await axios.post(`/api/counselor/filter`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAppointments = async () => {
    try {
        const response = await axios.get(`/api/appointment`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAppointmentsWithFilters = async (form) => {
    try {
        const response = await axios.post(`/api/appointment/filter`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const storeCounselor = async (form) => {
    try {
        const response = await axios.post(`/api/counselor/store`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateCounselorCredentials = async (form) => {
    try {
        const response = await axios.put(`/api/counselor/update`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteCounselor = async (_id) => {
    try {
        const response = await axios.delete(`/api/counselor/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
