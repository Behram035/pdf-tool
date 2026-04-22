const uploadFiles = async (files) => {
  setUploading(true);

  try {
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post("/tools/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPLOAD RESPONSE:", res.data);

      const uploadedFile = res.data.file || res.data;

      if (uploadedFile?._id) {
        setFiles((prev) => [...prev, uploadedFile]);
      }
    }
  } catch (error) {
    console.error("Upload error:", error);
  } finally {
    setUploading(false);
  }
};
