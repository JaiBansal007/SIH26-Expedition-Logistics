import type { Vehicle} from "../../types/live/list_type"
import axios from "axios"
import { polarDemoVehicles } from "../polar/demoData"


// Mock data for the vehicles
export const mockVehicles: Vehicle[] = polarDemoVehicles

// Function to simulate API call to fetch vehicles
export async function fetchVehicles(userId: string) {
  // Simulate API delay
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/live/${userId}`,
      { groups: [] },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    )

    const liveVehicles = Array.isArray(res.data.message) ? res.data.message as Vehicle[] : []
    return liveVehicles.length > 0 ? liveVehicles : mockVehicles
  } catch (error) {
    console.warn("Live vehicle feed unavailable; showing curated expedition data.", error)
    return mockVehicles
  }
}
