const FilePreviewPanel = ({ files, removeFile }) => {
  const getFileIcon = (filename) => {
    if (!filename) return "📎";
    const ext = filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return "📄";
    if (["jpg", "jpeg", "png"].includes(ext)) return "🖼️";
    return "📎";
  };

  // Filter out invalid files
  const validFiles = files.filter((file) => file && file._id && file.filename);

  return (
    <div className="space-y-3">
      {validFiles.map((file, idx) => (
        <div
          key={file._id}
          className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition group"
        >
          {/* File Icon and Info */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl">{getFileIcon(file.filename)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {idx + 1}. {file.filename}
              </p>
              <p className="text-xs text-gray-600">Uploaded</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              ✅ Ready
            </span>

            {/* Remove Button */}
            <button
              onClick={() => removeFile(file._id)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition opacity-0 group-hover:opacity-100"
              title="Remove file"
            >
              <span className="text-lg">🗑️</span>
            </button>
          </div>
        </div>
      ))}

      {/* Summary */}
      {validFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          <p className="font-semibold">
            ℹ️ {validFiles.length} file{validFiles.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default FilePreviewPanel;
