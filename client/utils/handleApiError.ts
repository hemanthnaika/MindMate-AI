export const handleApiError = (err: any): Error => {
  // Backend returned a structured error
  if (err?.error) {
    return new Error(
      err.error.message || err.error.code || "Authentication failed"
    );
  }

  // Request reached server but failed (4xx / 5xx)
  if (err?.response) {
    return new Error(err.response.data?.message || "Request failed");
  }

  // Request made but no response (network issue)
  if (err?.request) {
    return new Error("Network error. Please check your internet connection.");
  }

  // Fallback for unknown errors
  return new Error(err?.message || "Something went wrong");
};
