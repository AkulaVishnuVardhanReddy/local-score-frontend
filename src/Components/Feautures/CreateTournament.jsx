import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const CreateTournament = () => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    ownerId: "",
    addressId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Tournament Data:", formData);

    toast.success("🏆 Tournament created successfully!", {
      style: {
        background: "#1e293b",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "10px",
      },
    });

    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      status: "",
      ownerId: "",
      addressId: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-3xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Create Tournament
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Tournament Name", name: "name", type: "text" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "End Date", name: "endDate", type: "date" },
            { label: "Owner ID", name: "ownerId", type: "number" },
            { label: "Address ID", name: "addressId", type: "number" },
          ].map((field) => (
            <motion.div
              key={field.name}
              whileFocus={{ scale: 1.01 }}
              className="transition-all duration-200"
            >
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </motion.div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            >
              <option value="">Select Status</option>
              <option value="UPCOMING">UPCOMING</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div className="md:col-span-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Create Tournament
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTournament;
