import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

interface ApiResponse {
  message: string;
  error?: string;
}

interface ApiErrorResponse {
  error: string;
  details?: string;
  allowedMethods?: string[];
  requestDetails?: {
    method?: string;
    url?: string;
    headers?: Record<string, string>;
  };
}
//import {FaShield} from "react-icons/fa"

function WaitingListForm({
  label,
  align = "start",
  buttonColor = "primary",
}: {
  label: string;
  align: string;
  buttonColor: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useMutation<ApiResponse, AxiosError<ApiErrorResponse>>({
    mutationFn: async () => {
      setStatus("");
      const response = await axios.post<ApiResponse>(
        "/api/contact",
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );
      return response.data;
    },
    onSuccess: (data: ApiResponse) => {
      if (data.message === "Success") {
        router.push("/success");
      } else {
        setStatus(data.message || 'Unknown response from server');
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error('Mutation error:', error);
      if (error.response?.data?.error) {
        setStatus(error.response.data.error);
      } else if (error.message) {
        setStatus(error.message);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className={`form-label mb-3 fw-semibold text-${align}`}
        >
          {label}
        </label>
        <div className="form-group d-flex align-items-center mb-2">
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-control me-2 rounded-5"
          />
          <button
            type="submit"
            className={`btn btn-${buttonColor} text-white text-nowrap shadow`}
            disabled={isPending}
          >
            {isPending ? "Adding you..." : "Join today"}
          </button>
        </div>
        <small className="text-muted">
          <FaShieldAlt className="text-primary mb-1" /> We respect your privacy.
          Check your inbox for the free guide.
        </small>
      </form>
      {status && <div className="mt-2 text-center text-danger small">{status}</div>}
    </>
  );
}

export default WaitingListForm;
