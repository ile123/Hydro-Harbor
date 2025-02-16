"use client";

import Modal from "@/components/modal";
import { useAppContext } from "@/context/app-context";
import { login } from "@/lib/authentication";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cookies = useCookies();
  const { setGlobalState } = useAppContext();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { status, token, fullName, email, errorMessage } = await login(formData);
    if (status === 200) {
      cookies.set("token", token);
      setGlobalState((prevState) => ({
        ...prevState,
        user: { fullName: fullName, email: email },
      }));
      redirect("/products");
    } else {
      setErrorMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          onChange={handleInput}
          placeholder="Email"
          required
          className="p-2 border border-gray-300 text-black rounded"
        />
        <input
          type="password"
          name="password"
          onChange={handleInput}
          placeholder="Password"
          required
          className="p-2 border border-gray-300 text-black rounded mb-4"
        />
        <button
          type="submit"
          className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Error">
        <p>{errorMessage}</p>
      </Modal>
    </>
  );
}
