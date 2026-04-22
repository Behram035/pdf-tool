import { useState } from "react";
import API from "../api/axios";

const DropUploader = ({ setFiles }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadFiles(e.target.files);
    }
  };

  const uploadFiles = async (files) => {
    setUploading(true);

    try {
      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await API.post("/tools/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedFile = res.data.file || res.data;

        if (uploadedFile?._id) {
          setFiles((prev) => [...prev, uploadedFile]);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 border-2 border-dashed ${
        dragActive
          ? "bg-blue-500/20 border-blue-400 shadow-2xl shadow-blue-500/20"
          : "bg-white/5 border-white/30 hover:border-blue-400/50 hover:bg-blue-500/10"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        multiple
        onChange={handleChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label
        htmlFor="fileInput"
        className="block p-12 cursor-pointer text-center"
      >
        {uploading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-blue-400/30 border-t-blue-400 animate-spin"></div>
            </div>
            <p className="text-white font-semibold">Uploading files...</p>
            <p className="text-gray-400 text-sm">
              Please wait while we process your files
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl animate-bounce">📁</div>
            <div>
              <p className="text-white font-bold text-xl">
                Drag and drop files here
              </p>
              <p className="text-gray-300 text-sm mt-2">
                or click to select from your computer
              </p>
            </div>
            <div className="pt-4 flex justify-center">
              <span className="inline-block bg-linear-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Browse Files
              </span>
            </div>
            <p className="text-gray-400 text-xs pt-4">
              Supported: PDF, JPG, PNG (Max 100MB per file)
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default DropUploader;
