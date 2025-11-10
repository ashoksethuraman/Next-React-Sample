"use client";

import { useState, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ✅ Reusable debounce function
function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function AboutPage() {
  const [selectedDate, setDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
  });

  // ✅ Actual submit logic
  const submitLogic = () => {
    const formDetails = { ...formData, date: selectedDate };
    console.log("✅ Form submitted:", formDetails);
  };

  // ✅ Create debounced version ONCE per render cycle
  const debouncedSubmit = useDebounce(submitLogic, 500);

  // ✅ Handle submit — call preventDefault immediately
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ⛔ stops the page from refreshing
    debouncedSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded shadow max-w-md">
      <h1 className="text-lg font-semibold">Search Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setDate(date)}
            dateFormat="MM/dd/yyyy"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
