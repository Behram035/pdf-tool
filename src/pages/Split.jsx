import { useState } from "react";
import API from "../api/axios";
import DropUploader from "../components/DropUploader";
import FilePreviewPanel from "../components/FilePreviewPanel";
import Navbar from "../components/Navbar";

const Split = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zipFile, setZipFile] = useState(null);
  const [error, setError] = useState(null);

  const splitPDF = async () => {
    if (!files.length || !files[0]?._id) {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/tools/split", {
        fileId: files[0]._id,
      });

      setZipFile(res.data.zip);
    } catch (err) {
      console.error(err);
      setError("Failed to split PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!zipFile) return;

    window.open(`http://localhost:5000/${zipFile}`, "_blank");
  };

  const removeFile = (id) => {
    setFiles(files.filter((f) => f._id !== id));
    setZipFile(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <div className="text-6xl mb-4">✂️</div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">Split PDF</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Divide your PDF into individual pages or custom ranges instantly
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
                <p className="font-semibold">Split Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Upload PDF</h2>
            <p className="text-gray-300 text-sm mb-6">
              Select a PDF file to split into individual pages
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
                Your PDF will be split into individual page files
              </p>
              <FilePreviewPanel files={files} removeFile={removeFile} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={splitPDF}
              disabled={loading || files.length === 0}
              className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Splitting PDF...
                </>
              ) : (
                <>
                  <span>✂️</span>
                  Split PDF
                </>
              )}
            </button>

            {zipFile && (
              <button
                onClick={downloadFile}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span>⬇️</span>
                Download ZIP files
              </button>
            )}
          </div>

          {/* Success Message */}
          {zipFile && (
            <div className="mt-6 bg-green-900/30 border border-green-500/50 backdrop-blur-sm text-green-200 px-6 py-4 rounded-xl flex gap-3 animate-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Split Complete!</p>
                <p className="text-sm opacity-90">
                  Your PDF has been successfully split into individual pages.
                  Download now.
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-all">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-white font-bold mb-2">Individual Pages</h3>
              <p className="text-gray-400 text-sm">
                Extract each page as a separate PDF file
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Instant Split</h3>
              <p className="text-gray-400 text-sm">
                Get your files in seconds without quality loss
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-all">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Any PDF Size</h3>
              <p className="text-gray-400 text-sm">
                Works with PDFs of any length or size
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Split;
