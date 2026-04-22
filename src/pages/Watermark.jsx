import { useState } from "react";
import API from "../api/axios";
import SingleFileUploader from "../components/SingleFileUploader";
import Navbar from "../components/Navbar";

const Watermark = () => {
  const [fileId, setFileId] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addWatermark = async () => {
    if (!fileId) {
      alert("Please upload a PDF first");
      return;
    }
    if (!text.trim()) {
      alert("Please enter watermark text");
      return;
    }
    setIsLoading(true);
    try {
      const res = await API.post("/tools/watermark", {
        fileId,
        text,
      });
      setSuccess(true);
      setTimeout(() => {
        window.open(`http://localhost:5000/${res.data.result}`);
        setSuccess(false);
      }, 500);
    } catch (error) {
      console.error("Error adding watermark:", error);
      alert("Failed to add watermark");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-purple-500/20 rounded-full mb-4">
              <span className="text-4xl">💧</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Add Watermark
            </h1>
            <p className="text-gray-400 text-lg">
              Protect your documents by adding a watermark
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 space-y-8">
            {/* Upload Section */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-white">
                Upload PDF File
              </label>
              <SingleFileUploader setFileId={setFileId} />
              {fileId && (
                <p className="text-sm text-green-400 flex items-center gap-2">
                  <span className="text-lg">✓</span> File uploaded successfully
                </p>
              )}
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Watermark Text
              </label>
              <input
                type="text"
                placeholder="Enter your watermark text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength="100"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <div className="flex items-center justify-between text-sm text-gray-400">
                <p>Add text to appear on all pages</p>
                <p>{text.length}/100</p>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-300">Preview</p>
              <div className="h-40 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transform -rotate-45">
                  <span className="text-6xl font-bold text-purple-400 whitespace-nowrap">
                    {text || "Watermark"}
                  </span>
                </div>
                <div className="relative z-10 text-center">
                  <p className="text-gray-400 text-sm">
                    {text
                      ? "This is how your watermark will look"
                      : "Enter text to preview"}
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                <p className="text-green-300 font-semibold">
                  Watermark added successfully! Downloading...
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={addWatermark}
              disabled={!fileId || !text.trim() || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isLoading || !fileId || !text.trim()
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Adding Watermark...
                </span>
              ) : (
                "Apply Watermark"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watermark;
