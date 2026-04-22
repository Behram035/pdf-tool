import { useState } from "react";
import API from "../api/axios";
import DropUploader from "../components/DropUploader";
import FilePreviewPanel from "../components/FilePreviewPanel";
import Navbar from "../components/Navbar";

const Compress = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  const compressPDF = async () => {
    if (files.length === 0) {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/tools/compress", { fileId: files[0]._id });
      setProcessedFile(res.data.result);
    } catch (err) {
      setError("Failed to compress PDF. Please try again.");
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
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-green-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <div className="text-6xl mb-4">📦</div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">Compress PDF</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Reduce file size while maintaining crystal-clear quality
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
                <p className="font-semibold">Compression Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 hover:border-green-400/50 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Upload PDF</h2>
            <p className="text-gray-300 text-sm mb-6">
              Select a PDF file to compress and reduce its file size
            </p>
            <DropUploader setFiles={setFiles} />
          </div>

          {/* File Preview Section */}
          {files.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Selected File
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Your file will be compressed using advanced algorithms
              </p>
              <FilePreviewPanel files={files} removeFile={removeFile} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={compressPDF}
              disabled={loading || files.length === 0}
              className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Compressing PDF...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Compress PDF
                </>
              )}
            </button>

            {processedFile && (
              <button
                onClick={downloadFile}
                className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span>⬇️</span>
                Download Compressed PDF
              </button>
            )}
          </div>

          {/* Success Message */}
          {processedFile && (
            <div className="mt-6 bg-green-900/30 border border-green-500/50 backdrop-blur-sm text-green-200 px-6 py-4 rounded-xl flex gap-3 animate-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Compression Complete!</p>
                <p className="text-sm opacity-90">
                  Your PDF has been successfully compressed. Download your
                  optimized file now.
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all">
              <div className="text-3xl mb-3">📉</div>
              <h3 className="text-white font-bold mb-2">Smaller Size</h3>
              <p className="text-gray-400 text-sm">
                Reduce file size by up to 90% without losing quality
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-white font-bold mb-2">Quality Preserved</h3>
              <p className="text-gray-400 text-sm">
                Smart compression maintains visual clarity
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Share Faster</h3>
              <p className="text-gray-400 text-sm">
                Send and upload compressed PDFs in seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compress;
