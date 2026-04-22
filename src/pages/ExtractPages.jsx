import { useState } from "react";
import API from "../api/axios";
import SingleFileUploader from "../components/SingleFileUploader";
import Navbar from "../components/Navbar";

const ExtractPages = () => {
  const [fileId, setFileId] = useState(null);
  const [pages, setPages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const extractPages = async () => {
    if (!fileId) {
      alert("Please upload a PDF first");
      return;
    }
    if (!pages.trim()) {
      alert("Please enter page numbers to extract");
      return;
    }
    setIsLoading(true);
    try {
      const res = await API.post("/tools/extract-pages", {
        fileId,
        pages: pages.split(",").map((p) => parseInt(p.trim())),
      });
      setSuccess(true);
      setTimeout(() => {
        window.open(`http://localhost:5000/${res.data.result}`);
        setSuccess(false);
      }, 500);
    } catch (error) {
      console.error("Error extracting pages:", error);
      alert("Failed to extract pages");
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
            <div className="inline-block p-3 bg-green-500/20 rounded-full mb-4">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Extract Pages
            </h1>
            <p className="text-gray-400 text-lg">
              Extract specific pages from your PDF into a new document
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
                Page Numbers to Extract
              </label>
              <textarea
                placeholder="Enter page numbers separated by commas&#10;Example: 2, 4, 6"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                rows="4"
              />
              <p className="text-sm text-gray-400">
                Separate page numbers with commas. Example: 2, 4, 6
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-300 text-sm font-medium">
                Pages to extract:{" "}
                <span className="font-bold">{pages || "None selected"}</span>
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                <p className="text-green-300 font-semibold">
                  Pages extracted successfully! Downloading...
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={extractPages}
              disabled={!fileId || !pages.trim() || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isLoading || !fileId || !pages.trim()
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50 hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Extracting Pages...
                </span>
              ) : (
                "Extract Pages"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtractPages;
