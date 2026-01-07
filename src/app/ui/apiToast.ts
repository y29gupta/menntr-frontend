// // ui/apiToast.ts
// import { toast } from "react-toastify"
// import { ApiError } from "@/app/lib/api/error"

// export function showApiError(error: ApiError) {
//   switch (error.status) {
//     case 400:
//       toast.error(error.message || "Invalid request")
//       break

//     case 401:
//       toast.error("Session expired. Please log in again.")
//       break

//     case 403:
//       toast.warn(error.message || "You don’t have permission")
//       break

//     case 404:
//       toast.error("Resource not found")
//       break

//     default:
//       if (error.status >= 500) {
//         toast.error("Server error. Please try again later.")
//       } else {
//         toast.error(error.message || "Something went wrong")
//       }
//   }
// }

// export function showSuccess(message: string) {
//   toast.success(message)
// }
import { toast } from 'react-toastify';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  ) {
    return (error as any).message;
  }

  return 'Something went wrong';
}

export function showApiError(error: unknown) {
  toast.error(getErrorMessage(error));
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function toastApiPromise<T>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string | ((data: T) => string);
    error?: string | ((error: unknown) => string);
  }
): Promise<T> {
  toast.promise(
    promise,
    {
      pending: messages.pending,
      success: {
        render({ data }) {
          return typeof messages.success === 'function'
            ? messages.success(data as T)
            : messages.success;
        },
      },
      error: {
        render({ data }) {
          if (typeof messages.error === 'function') {
            return messages.error(data);
          }

          if (typeof messages.error === 'string') {
            return messages.error;
          }

          return getErrorMessage(data);
        },
      },
    }
  );

  return promise;
}
