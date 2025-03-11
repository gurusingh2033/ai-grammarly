"use client";
import "./login.css";
import { useForm } from "react-hook-form";
import { setLocalStorageItem } from "../utils/localStorageUtils/setLocalStorageItem";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const userLoginData = await fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userLoginResponse = await userLoginData.json();

      if (userLoginResponse.error) {
        throw {
          error: userLoginResponse.error,
        };
      }
    } catch (error) {
      toast.error(error.error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setLocalStorageItem("isUserLoggedIn", true);
    redirect("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2>Login</h2>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <small className="error-message">{errors.email.message}</small>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <small className="error-message">{errors.password.message}</small>
            )}
          </div>

          <button  disabled={isLoading} type="submit" className={`login-button ${isLoading ? "disable" :""}`}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
