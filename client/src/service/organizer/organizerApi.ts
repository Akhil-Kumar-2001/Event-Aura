import axios from "axios";
import { toast } from "react-toastify";
import { apiClient } from "../axiosInstance";


export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message);
    } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

export const createEvent = async (formData: FormData) => {
    try {
        const response = await apiClient.post("/organizer/create-event", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        console.error("Error creating event:", error);
        handleAxiosError(error);
    }
};

export const updateEvent = async (eventId: string, formData: FormData) => {
    try {
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await apiClient.put(`/organizer/update-event/${eventId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: unknown) {
        console.error("Error creating event:", error);
        handleAxiosError(error);
    }
};


export const getEvents = async () => {
    try {
        const response = await apiClient.get("/organizer/events");
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching events:", error);
        handleAxiosError(error);
    }
}

export const deleteEvent = async (eventId: string) => {
    try {
        const response = await apiClient.delete(`/organizer/delete-event/${eventId}`);
        return response.data;
    } catch (error: unknown) {
        console.error("Error deleting event:", error);
        handleAxiosError(error);
    }
};


export const getAttendees = async (eventId: string) => {
    try {
        console.log("iam called")
        const response = await apiClient.get(`/organizer/get-attendees/${eventId}`);
        return response.data;
    } catch (error: unknown) {
        console.error("Error deleting event:", error);
        handleAxiosError(error);
    }
}

