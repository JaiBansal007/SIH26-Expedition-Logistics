import axios from 'axios';
import { polarDemoAlerts } from "../polar/demoData"

export async function fetchAllAlerts(): Promise<any> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/alerts`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    );
    return response.data?.data?.length ? response.data : { data: polarDemoAlerts }
  } catch (error) {
    console.warn("Alert feed unavailable; showing curated expedition alerts.", error);
    return { data: polarDemoAlerts };
  }
}


// By USER ID

export async function fetchAlertsByUser(userId: string): Promise<any> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/alerts/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    );
    return response.data?.data?.length ? response.data : { data: polarDemoAlerts }
  } catch (error) {
    console.warn("User alert feed unavailable; showing curated expedition alerts.", error);
    return { data: polarDemoAlerts };
  }
}


