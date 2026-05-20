const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const { Sequelize } = require("sequelize");
const Minio = require("minio");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "db",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  },
);

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "minio",
  port: Number(process.env.MINIO_PORT || 9000),
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin123",
});

const upload = multer({ storage: multer.memoryStorage() });

async function ensureBucket(bucketName) {
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName);
  }
}

app.get("/api/students/health", async (req, res) => {
  try {
    await sequelize.authenticate();

    return res.status(200).json({
      message: "Backend sehat",
      database: "connected",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database gagal",
      error: error.message,
    });
  }
});

app.post("/api/students/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File wajib diupload",
      });
    }

    const bucketName = process.env.MINIO_BUCKET || "siakad-documents";
    const fileName = `${Date.now()}-${req.file.originalname}`;

    await ensureBucket(bucketName);

    await minioClient.putObject(
      bucketName,
      fileName,
      req.file.buffer,
      req.file.size,
      {
        "Content-Type": req.file.mimetype,
      },
    );

    return res.status(200).json({
      message: "Upload berhasil",
      fileName,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload gagal",
      error: error.message,
    });
  }
});

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`Backend berjalan di port ${port}`);
});