import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 border-2 border-gray-300 rounded-lg">
      <form className="space-y-8 w-full">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-b-2 border-gray-400 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-4"
            />
          </div>
          <div className="flex-1">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b-2 border-gray-400 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-4"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Wedding Date"
              className="w-full border-b-2 border-gray-400 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-4"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Wedding Address"
              className="w-full border-b-2 border-gray-400 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none py-4"
            />
          </div>
        </div>

        <div>
          <textarea
            placeholder="Tell Us More"
            className="w-full border-b-2 border-gray-400 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none resize-none h-32 py-4"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
