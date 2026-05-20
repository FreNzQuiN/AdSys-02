import React, { useEffect, useState } from "react";

import { checkBackendHealth, uploadStudentFile } from "./api";

import "./styles.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkBackendHealth();

        setBackendStatus(data.message);
      } catch (error) {
        setBackendStatus("Backend unreachable");
      }
    };

    fetchHealth();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Pilih file terlebih dahulu");
      return;
    }

    try {
      const result = await uploadStudentFile(selectedFile);

      setUploadMessage(result.message);
    } catch (error) {
      setUploadMessage("Upload gagal");
    }
  };

  return (
    <div className="container">
      <h1>SIAKAD Containerized App</h1>

      <div className="card">
        <h2>Status Backend</h2>

        <p>{backendStatus}</p>
      </div>

      <div className="card">
        <h2>Upload Dokumen Mahasiswa</h2>

        <input type="file" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload File</button>

        <p>{uploadMessage}</p>
      </div>
    </div>
  );
}

export default App;