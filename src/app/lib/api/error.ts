// lib/api/error.ts
import axios from "axios"

export interface ApiError {
  status: number
  message: string
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 500,
      message:
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.error ||
        "Something went wrong. Please try again.",
    }
  }

  return {
    status: 500,
    message: "Unexpected error occurred.",
  }
}
