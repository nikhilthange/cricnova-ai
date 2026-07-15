import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw error;
  }
};
