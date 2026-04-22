import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await API.get("/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/history/${id}`);
      fetchHistory();
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
  };

  const getToolIcon = (tool) => {
    const icons = {
      merge: "🔗",
      split: "✂️",
      compress: "📦",
      "pdf-to-jpg": "🖼️",
      "jpg-to-pdf": "📄",
    };
    return icons[tool.toLowerCase()] || "📄";
  };

  const getToolColor = (tool) => {
    const colors = {
      merge: "from-blue-500 to-blue-600",
      split: "from-purple-500 to-purple-600",
      compress: "from-green-500 to-green-600",
      "pdf-to-jpg": "from-orange-500 to-orange-600",
      "jpg-to-pdf": "from-pink-500 to-pink-600",
    };
    return colors[tool.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⏱️</span>
            <h1 className="text-3xl font-bold text-gray-300">
              Activity History
            </h1>
          </div>
          <p className="text-gray-400">
            View and manage your recent PDF conversions
          </p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <span className="text-4xl animate-spin">⏳</span>
                <p className="text-gray-600 mt-4">Loading your history...</p>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Activity Yet
              </h3>
              <p className="text-gray-600">
                Your PDF conversions will appear here. Start by using one of our
                tools!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Top color bar */}
                  <div
                    className={`h-1 bg-linear-to-r ${getToolColor(item.tool)}`}
                  ></div>

                  <div className="p-2">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left section */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-2xl mt-1">
                          {getToolIcon(item.tool)}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 capitalize mb-2">
                            {item.tool.replace("-", " ")}
                          </h4>

                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p>
                              <span className="font-semibold text-gray-700">
                                File:
                              </span>{" "}
                              {item.outputFile.filename}
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">
                                Date:
                              </span>{" "}
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-3">
                            <a
                              href={`http://localhost:5000/${item.outputFile.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg transition"
                            >
                              <span>⬇️</span>
                              Download
                            </a>

                            <button
                              onClick={() => deleteItem(item._id)}
                              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-lg transition"
                            >
                              <span>🗑️</span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right section - Status badge */}
                      <div
                        className={`bg-linear-to-r ${getToolColor(item.tool)} text-white px-3 py-1.5 rounded-lg font-semibold text-sm whitespace-nowrap`}
                      >
                        ✅ Completed
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
