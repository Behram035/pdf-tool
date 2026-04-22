import { useState } from "react";
import API from "../api/axios";
import DropUploader from "../components/DropUploader";
import FilePreviewPanel from "../components/FilePreviewPanel";
import Navbar from "../components/Navbar";

const Merge = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  const mergePDF = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 files to merge");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileIds = files.filter((f) => f && f._id).map((f) => f._id);
      const res = await API.post("/tools/merge", { fileIds });
      setProcessedFile(res.data.result);
    } catch (err) {
      setError("Failed to merge PDFs. Please try again.");
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
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <div className="text-6xl mb-4">🔗</div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">Merge PDFs</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Combine multiple PDF files into one seamless document with ease
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
                <p className="font-semibold">Merge Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Upload Files</h2>
            <p className="text-gray-300 text-sm mb-6">
              Upload at least 2 PDF files to merge them together
            </p>
            <DropUploader setFiles={setFiles} />
          </div>

          {/* File Counter */}
          {files.length > 0 && (
            <div className="mb-6 flex items-center justify-between bg-blue-500/20 border border-blue-400/30 rounded-xl px-6 py-4">
              <div>
                <p className="text-white font-semibold">Files Selected</p>
                <p className="text-gray-300 text-sm">
                  {files.length} file{files.length !== 1 ? "s" : ""} ready to
                  merge
                </p>
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {files.length}
              </div>
            </div>
          )}

          {/* File Preview Section */}
          {files.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Selected Files
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Drag to reorder or remove files you don&apos;t want
              </p>
              <FilePreviewPanel files={files} removeFile={removeFile} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={mergePDF}
              disabled={loading || files.length < 2}
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Merging your PDFs...
                </>
              ) : (
                <>
                  <span>🔗</span>
                  Merge PDFs
                </>
              )}
            </button>

            {processedFile && (
              <button
                onClick={downloadFile}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span>⬇️</span>
                Download Merged PDF
              </button>
            )}
          </div>

          {/* Success Message */}
          {processedFile && (
            <div className="mt-6 bg-green-900/30 border border-green-500/50 backdrop-blur-sm text-green-200 px-6 py-4 rounded-xl flex gap-3 animate-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Merge Complete!</p>
                <p className="text-sm opacity-90">
                  Your PDFs have been successfully merged. Download your file
                  now.
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Fast Processing</h3>
              <p className="text-gray-400 text-sm">
                Merge PDFs instantly without quality loss
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-white font-bold mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">
                Your files are encrypted and auto-deleted after processing
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all">
              <div className="text-3xl mb-3">∞</div>
              <h3 className="text-white font-bold mb-2">Unlimited Files</h3>
              <p className="text-gray-400 text-sm">
                Merge as many PDFs as you need in one operation
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Merge;
