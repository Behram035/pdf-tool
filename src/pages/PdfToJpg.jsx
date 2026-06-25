import { useState } from "react";
import API from "../api/axios";
import DropUploader from "../components/DropUploader";
import FilePreviewPanel from "../components/FilePreviewPanel";
import Navbar from "../components/Navbar";
import { Image } from "lucide-react";

const PdfToJpg = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zipFile, setZipFile] = useState(null);
  const [error, setError] = useState(null);

  const convert = async () => {
    if (files.length === 0) {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/tools/pdf-to-jpg", { fileId: files[0]._id });
      setZipFile(res.data.zip);
    } catch (err) {
      setError("Failed to convert PDF to images. Please try again.");
      console.error(err);
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
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-orange-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center mb-2">
            <div className="inline-block mb-2">
              <div className="text-6xl text-orange-500 animate-bounce">
                <Image className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">PDF to JPG</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Convert PDF pages to stunning high-quality image files
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
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 hover:border-orange-400/50 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Upload PDF</h2>
            <p className="text-gray-300 text-sm mb-6">
              Select a PDF file to convert all pages to JPG images
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
                All pages in this PDF will be extracted as high-quality JPG
                images
              </p>
              <FilePreviewPanel files={files} removeFile={removeFile} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={convert}
              disabled={loading || files.length === 0}
              className="w-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Converting PDF...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Convert to JPG
                </>
              )}
            </button>

            {zipFile && (
              <button
                onClick={downloadFile}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span>⬇️</span>
                Download JPG Images
              </button>
            )}
          </div>

          {/* Success Message */}
          {zipFile && (
            <div className="mt-6 bg-green-900/30 border border-green-500/50 backdrop-blur-sm text-green-200 px-6 py-4 rounded-xl flex gap-3 animate-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Conversion Complete!</p>
                <p className="text-sm opacity-90">
                  Your PDF pages have been converted to JPG images. Download
                  them now.
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-400/30 transition-all">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-white font-bold mb-2">High Quality</h3>
              <p className="text-gray-400 text-sm">
                Convert pages to sharp, crystal-clear JPG images
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-400/30 transition-all">
              <div className="text-3xl mb-3">📸</div>
              <h3 className="text-white font-bold mb-2">All Pages</h3>
              <p className="text-gray-400 text-sm">
                Extract every page as a separate image file
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-400/30 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Instant</h3>
              <p className="text-gray-400 text-sm">
                Fast batch conversion for multi-page PDFs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfToJpg;
