import { useState } from "react";
import API from "../api/axios";
import SingleFileUploader from "../components/SingleFileUploader";
import Navbar from "../components/Navbar";
import { RotateCw } from "lucide-react";

const Rotate = () => {
  const [fileId, setFileId] = useState(null);
  const [angle, setAngle] = useState(90);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const rotatePDF = async () => {
    if (!fileId) {
      alert("Please upload a PDF first");
      return;
    }
    setIsLoading(true);
    try {
      const res = await API.post("/tools/rotate", {
        fileId,
        angle,
      });
      setSuccess(true);
      setTimeout(() => {
        window.open(`http://localhost:5000/${res.data.result}`);
        setSuccess(false);
      }, 500);
    } catch (error) {
      console.error("Error rotating PDF:", error);
      alert("Failed to rotate PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center mb-2">
            <div className="inline-block mb-2">
              <div className="text-6xl text-yellow-500 animate-bounce">
                <RotateCw className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Rotate PDF Pages
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Rotate your PDF pages in any direction with ease
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
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

            {/* Rotation Options */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Rotation Angle
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[90, 180, 270, 360].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className={`p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      angle === deg
                        ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-orange-300 text-sm font-medium">
                Selected: <span className="font-bold">{angle}°</span> rotation
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                <p className="text-green-300 font-semibold">
                  PDF rotated successfully! Downloading...
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={rotatePDF}
              disabled={!fileId || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isLoading || !fileId
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Rotating PDF...
                </span>
              ) : (
                "Rotate PDF"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rotate;
