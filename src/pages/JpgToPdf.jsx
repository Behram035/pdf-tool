import { useState } from "react";
import API from "../api/axios";
import DropUploader from "../components/DropUploader";
import FilePreviewPanel from "../components/FilePreviewPanel";
import Navbar from "../components/Navbar";

const JpgToPdf = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  const convert = async () => {
    if (files.length === 0) {
      setError("Please upload at least one image file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileIds = files.map((f) => f._id);
      const res = await API.post("/tools/jpg-to-pdf", {
        fileIds,
      });
      setProcessedFile(res.data.result);
    } catch (err) {
      setError("Failed to convert images to PDF. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (processedFile) {
      window.open(`http://localhost:5000/${processedFile}`);
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter((f) => f._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-pink-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <div className="text-6xl mb-4">📄</div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">JPG to PDF</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Combine multiple images into a single professional PDF document
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/50 backdrop-blur-sm text-red-200 px-6 py-4 rounded-xl flex gap-3 animate-pulse">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold">Conversion Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 hover:border-pink-400/50 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">
              Upload Images
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Upload one or more JPG/PNG images to convert into a PDF
            </p>
            <DropUploader setFiles={setFiles} />
          </div>

          {/* File Counter */}
          {files.length > 0 && (
            <div className="mb-6 flex items-center justify-between bg-pink-500/20 border border-pink-400/30 rounded-xl px-6 py-4">
              <div>
                <p className="text-white font-semibold">Images Selected</p>
                <p className="text-gray-300 text-sm">
                  {files.length} image{files.length !== 1 ? "s" : ""} ready to
                  convert
                </p>
              </div>
              <div className="text-3xl font-bold text-pink-400">
                {files.length}
              </div>
            </div>
          )}

          {/* File Preview Section */}
          {files.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Selected Images
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Drag to reorder or remove images before converting
              </p>
              <FilePreviewPanel files={files} removeFile={removeFile} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={convert}
              disabled={loading || files.length === 0}
              className="w-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Converting to PDF...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Convert to PDF
                </>
              )}
            </button>

            {processedFile && (
              <button
                onClick={downloadFile}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span>⬇️</span>
                Download PDF
              </button>
            )}
          </div>

          {/* Success Message */}
          {processedFile && (
            <div className="mt-6 bg-green-900/30 border border-green-500/50 backdrop-blur-sm text-green-200 px-6 py-4 rounded-xl flex gap-3 animate-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Conversion Complete!</p>
                <p className="text-sm opacity-90">
                  Your images have been combined into a PDF. Download it now.
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-pink-400/30 transition-all">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="text-white font-bold mb-2">Any Format</h3>
              <p className="text-gray-400 text-sm">
                Support for JPG, PNG, and other image formats
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-pink-400/30 transition-all">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-white font-bold mb-2">Batch Convert</h3>
              <p className="text-gray-400 text-sm">
                Combine multiple images into one PDF
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-pink-400/30 transition-all">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-white font-bold mb-2">Professional</h3>
              <p className="text-gray-400 text-sm">
                Create clean, professional PDF documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JpgToPdf;
