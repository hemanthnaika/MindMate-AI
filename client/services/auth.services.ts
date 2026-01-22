import { authClient } from "@/lib/auth-client";

export const signUp = async ({ name, email, password }: SignUpProps) => {
  try {
    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (result?.error) {
      throw new Error(
        result.error.message || result.error.code || "Authentication failed"
      );
    }
    return result.data;
  } catch (err: any) {
    if (err?.error) {
      throw new Error(
        err.error.message || err.error.code || "Authentication failed"
      );
    }

    if (err.response) {
      throw new Error(err.response.data?.message || "Request failed");
    }

    if (err.request) {
      throw new Error("Network error. Please check your internet connection.");
    }

    throw new Error(err.message || "Something went wrong");
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const result = await authClient.signIn.email({
      email,
      password,
    });
    if (result?.error) {
      throw new Error(
        result.error.message || result.error.code || "Authentication failed"
      );
    }
    return result.data;
  } catch (err: any) {
    if (err?.error) {
      throw new Error(
        err.error.message || err.error.code || "Authentication failed"
      );
    }

    if (err.response) {
      throw new Error(err.response.data?.message || "Request failed");
    }

    if (err.request) {
      throw new Error("Network error. Please check your internet connection.");
    }

    throw new Error(err.message || "Something went wrong");
  }
};
