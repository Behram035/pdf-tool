import { useState, useRef } from "react";
import API from "../api/axios";

const SingleFileUploader = ({ setFileId, setFiles, multiple = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await API.post("/tools/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });

      if (multiple && setFiles) {
        setFiles((prev) => [...prev, res.data]);
      } else if (setFileId) {
        setFileId(res.data._id);
      }

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadFiles = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      let uploadedCount = 0;
      const totalFiles = files.length;

      for (let file of files) {
        if (!file || file.type !== "application/pdf") {
          alert(`File ${file.name} is not a valid PDF`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await API.post("/tools/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const fileProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            const overallProgress = Math.round(
              ((uploadedCount + fileProgress / 100) / totalFiles) * 100,
            );
            setUploadProgress(overallProgress);
          },
        });

        setFiles((prev) => [...prev, res.data]);
        uploadedCount++;
      }

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + (error.response?.data?.error || error.message));
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (multiple) {
        uploadFiles(files);
      } else {
        uploadFile(files[0]);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (multiple) {
        uploadFiles(files);
      } else {
        uploadFile(files[0]);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative p-8 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-blue-400 bg-blue-500/20 scale-105"
            : "border-white/30 bg-white/5 hover:bg-white/10"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        <div className="text-center">
          <div className="mb-4">
            <span className="text-5xl block mb-2">📁</span>
          </div>

          {isUploading ? (
            <>
              <p className="text-white font-semibold mb-3">
                Uploading {multiple ? "files" : "your PDF"}...
              </p>
              <div className="w-full bg-white/10 rounded-full h-2 mb-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-500 to-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm">{uploadProgress}%</p>
            </>
          ) : (
            <>
              <p className="text-white font-semibold mb-2">
                {isDragging
                  ? `Drop your PDF${multiple ? "s" : ""} here`
                  : `Drag & drop your PDF${multiple ? "s" : ""} here`}
              </p>
              <p className="text-gray-400 text-sm mb-3">or click to select</p>
              <p className="text-gray-500 text-xs">Maximum file size: 50MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFileUploader;

//   return (
//     <div className="w-full">
//       <div
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         className={`relative p-8 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
//           isDragging
//             ? "border-blue-400 bg-blue-500/20 scale-105"
//             : "border-white/30 bg-white/5 hover:bg-white/10"
//         }`}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="hidden"
//           disabled={isUploading}
//         />

//         <div className="text-center">
//           <div className="mb-4">
//             <span className="text-5xl block mb-2">📁</span>
//           </div>

//           {isUploading ? (
//             <>
//               <p className="text-white font-semibold mb-3">
//                 Uploading your PDF...
//               </p>
//               <div className="w-full bg-white/10 rounded-full h-2 mb-3 overflow-hidden">
//                 <div
//                   className="bg-Linear-to-r from-blue-500 to-cyan-500 h-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-gray-400 text-sm">{uploadProgress}%</p>
//             </>
//           ) : (
//             <>
//               <p className="text-white font-semibold mb-2">
//                 {isDragging
//                   ? "Drop your PDF here"
//                   : "Drag & drop your PDF here"}
//               </p>
//               <p className="text-gray-400 text-sm mb-3">or click to select</p>
//               <p className="text-gray-500 text-xs">Maximum file size: 50MB</p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleFileUploader;
