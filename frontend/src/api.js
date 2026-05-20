const API_BASE_URL = "/api/students";

export const checkBackendHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);

  return response.json();
};

export const uploadStudentFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};