-- جدول الطلاب
CREATE TABLE info_student (
  id_stud INT PRIMARY KEY,
  golos_student VARCHAR(100),
  name_student NVARCHAR(255),
  school NVARCHAR(255),
  Sum INT,
  nsba FLOAT,
  tkder NVARCHAR(100),
  level NVARCHAR(100),
  tkhsos NVARCHAR(255),
  shoaba NVARCHAR(100),
  door NVARCHAR(50),
  Year INT,
  saf NVARCHAR(50),
  id_ked VARCHAR(100)
);

-- جدول المستخدمين
CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  preemision VARCHAR(255)
);

-- جدول المعاهد
CREATE TABLE mahd (
  id_stud INT PRIMARY KEY,
  golos_student VARCHAR(100),
  name_student NVARCHAR(255),
  school NVARCHAR(255),
  Sum INT,
  tkder NVARCHAR(100),
  tkhsos NVARCHAR(255),
  shoaba NVARCHAR(100),
  door VARCHAR(50),
  Year INT
);
