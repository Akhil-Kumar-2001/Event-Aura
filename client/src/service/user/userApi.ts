import { toast } from 'react-toastify'
import axios from 'axios';
import { apiClient } from '../axiosInstance';



export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message);
    } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};



export const getEvents = async () => {
    try {
        const response = await apiClient.get("/events");
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching events:", error);
        handleAxiosError(error);
    }
}


export const purchaseTicket = async (data: any) => {
    try {
        console.log("I am a foool ////////////////////////////////////////////////////")
        const response = await apiClient.post("/ticket-purchase", { data });
        return response.data;
    } catch (error: unknown) {
        console.error("Error purchasing ticket:", error);
        handleAxiosError(error);
    }
};

// Create Razorpay order
export const createRazorpayOrder = async (amount: number,eventId:string) => {
    try {
        const response = await apiClient.post("/create-razorpay-order", { amount,eventId });
        return response.data;
    } catch (error: unknown) {
        console.error("Error creating Razorpay order:", error);
        handleAxiosError(error);
    }
};

// Confirm Razorpay payment
export const confirmPayment = async (paymentData: {
    eventId: string;
    quantity: number;
    price: number;
    paymentId: string;
}) => {
    try {
        const response = await apiClient.post("/confirm-payment", paymentData);
        return response.data;
    } catch (error: unknown) {
        console.error("Error confirming payment:", error);
        handleAxiosError(error);
    }

}


export const getTickets = async () => {
    try {
        const response = await apiClient.get("/tickets");
        return response.data;
    } catch (error) {
        console.error("Error get tickets:", error);
        handleAxiosError(error);
    }
}


export const cancelTicket = async (id:string) => {
    try {
        const response = await apiClient.post(`/cancel-ticket/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error cancel tickets:", error);
        handleAxiosError(error);
    }
}