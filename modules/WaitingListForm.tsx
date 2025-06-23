import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
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

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      setStatus("")
      const response = await axios.post("/api/contact", { email });
      return response.data
    },
    onSuccess: (data) => {
      if(data.message == "Success"){
      router.push("/success");
      } else {
        setStatus(data.message)
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
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
