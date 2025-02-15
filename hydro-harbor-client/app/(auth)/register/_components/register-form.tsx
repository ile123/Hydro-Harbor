"use client";

import Modal from "@/components/modal";
import { register } from "@/lib/authentication";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterFrom() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Password and repeat password are not the same.");
      setIsModalOpen(true);
      return;
    }
    const formDataToBeSubmited = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    const { status, errorMessage } = await register(formDataToBeSubmited);
    if (status === 201) {
      redirect("/login");
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
          type="text"
          name="fullName"
          onChange={handleInput}
          placeholder="Full Name"
          required
          className="p-2 border border-gray-300 text-black rounded"
        />
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
        <input
          type="password"
          name="repeatPassword"
          onChange={handleInput}
          placeholder="Repeated Password"
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
