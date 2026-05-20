CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    student_number VARCHAR(100) NOT NULL UNIQUE,
    study_program VARCHAR(255) NOT NULL,
    document_filename VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    students (
        full_name,
        student_number,
        study_program,
        document_filename
    )
VALUES
    ('Budi Santoso', '2024001', 'Informatika', NULL),
    ('Siti Rahma', '2024002', 'Sistem Informasi', NULL);