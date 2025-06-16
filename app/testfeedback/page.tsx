"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Feedback() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Feedback submitted!");
    toast.success("Thank you for your feedback! We appreciate it.");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-center" richColors />
      <div className="w-full bg-white p-4 flex items-center shadow-sm fixed top-0 left-0 z-40">
        <button onClick={handleGoBack} className="text-gray-600 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>
      {/* Main Content Area */}
      <main className="flex flex-1 flex-col justify-start items-center pt-16 px-4 pb-8 sm:px-6 md:px-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-xl font-bold mb-3 text-gray-800">
            Help us Improve Caredo
          </h1>
          <p className="text-xs text-gray-600 mb-6">
            If you are facing any problem with Caredo, such as doctors not
            functioning properly,any missing feature, website problems or any
            other issue, please let us know. We are always looking for ways to
            improve your Caredo....
          </p>

          <form onSubmit={handleSubmitFeedback}>
            {" "}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder=""
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Any missing feature or improvement / Any other problem facing?
              </label>
              <textarea
                id="feedback"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                placeholder=""
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-1 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
