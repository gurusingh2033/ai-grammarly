"use client";
import "./home.css";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { clearLocalStorage } from "../utils/localStorageUtils/clearLocalStorage";
import { useDebounce } from "../utils/customHooks/useDebounce";
import { useEffect, useState } from "react";

export default function HomeComponent() {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [textResponse, setTextResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userInput = watch("userInput");

  const debouncedInputValue = useDebounce(userInput, 1000);

  useEffect(() => {
    if (Boolean(userInput)) {
      checkGrammerHandler();
    }
  }, [debouncedInputValue]);

  const checkGrammerHandler = async () => {
    setIsLoading(true);
    const userLoginData = await fetch("/api/ai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userInput }),
    });
    const userData = await userLoginData.json();
    setTextResponse(userData);

    setIsLoading(false);
  };
  const logoutUserHandler = () => {
    clearLocalStorage();
    redirect("/login");
  };

  return (
    <div className="home-container">
      <button className="logout-btn" onClick={logoutUserHandler}>
        Logout
      </button>
      <div className="home-content">
        <div className="output-box">
          <label>Output</label>
          <div className="output-box-inner">
            <p
              dangerouslySetInnerHTML={{ __html: textResponse.correctedText }}
            />
          </div>
          <div className={`loader-box ${isLoading ? "active" : ""} `}>
            <div className="loader"></div>
          </div>
        </div>

        <div className="input-box">
          <textarea
            {...register("userInput")}
            placeholder="User's plain text input goes here."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
