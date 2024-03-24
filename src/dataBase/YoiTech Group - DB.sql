-- Active: 1691592561728@@127.0.0.1@3306

-- 1 = FALSE AND 0 = TRUE IN CASE OF INTEGER
CREATE TABLE user (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  gender TEXT NOT NULL,
  nationality TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  status TEXT NOT NULL,
  email_status TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM "user";

-- CREATE TABLE region (
--   id TEXT UNIQUE PRIMARY KEY NOT NULL,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE state_province (
--   id TEXT UNIQUE PRIMARY KEY NOT NULL,
--   region_id TEXT NOT NULL,
--   name TEXT NOT NULL,
--   Foreign Key (region_id) REFERENCES region(id)
-- );

-- CREATE TABLE city (
--   id TEXT PRIMARY KEY NOT NULL,
--   state_province_id TEXT NOT NULL,
--   name TEXT NOT NULL,
--   Foreign Key (state_province_id) REFERENCES state_province(id)
-- );

CREATE TABLE line_of_business (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  content TEXT NOT NULL
);

CREATE TABLE function_performed (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  line_of_business_id TEXT NOT NULL,
  content TEXT NOT NULL,
  Foreign Key (line_of_business_id) REFERENCES line_of_business(id)
);

CREATE TABLE profissional_license (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  content TEXT NOT NULL
);

CREATE TABLE user_adress (
  user_id TEXT NOT NULL,
  cep TEXT NOT NULL,
  state_province TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT,
  apartment TEXT,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE driving_license_type(
  id TEXT NOT NULL PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE user_detail (
  user_id TEXT NOT NULL,
  driving_license INTEGER NOT NULL,
  license_type_id TEXT NOT NULL,
  means_of_transport TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  profissional_license_id TEXT NOT NULL,
  japenese_conversation_status TEXT NOT NULL DEFAULT(0),
  japenese_reading_status TEXT NOT NULL,
  japenese_descent_degree TEXT NOT NULL,
  japenese_visa_type TEXT NOT NULL,
  japenese_child_status TEXT NOT NULL,
  child_number NUMBER NOT NULL,
  child_school_age TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (user_id) REFERENCES user(id),
  Foreign Key (profissional_license_id) REFERENCES profissional_license(id),
  Foreign Key (license_type_id) REFERENCES driving_license_type(id)
);


CREATE TABLE user_job (
  user_id TEXT NOT NULL,
  working_status TEXT NOT NULL,
  salary_claim TEXT NOT NULL,
  start_up_forecast TEXT NOT NULL,
  overtime_availability TEXT NOT NULL,
  Foreign Key (user_id) REFERENCES user(id)
);

CREATE TABLE user_measurement_details (
  user_id TEXT NOT NULL,
  height TEXT NOT NULL,
  weight TEXT NOT NULL,
  uniform_shirt TEXT NOT NULL,
  uniform_pants TEXT NOT NULL,
  dominant_hand TEXT NOT NULL,
  glasses INTEGER NOT NULL DEFAULT(1),
  tatoo TEXT NOT NULL,
  piercing INTEGER DEFAULT(1),
  smooker INTEGER DEFAULT(1) NOT NULL,
  medical_treatment INTEGER DEFAULT(1) NOT NULL,
  type_of_treatment TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (user_id) REFERENCES user(id)
);

CREATE TABLE work_history (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  factory_name TEXT NOT NULL,
  state_province TEXT NOT NULL,
  line_of_business_id TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  function_performed_id TEXT NOT NULL,
  reason_termination TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (user_id) REFERENCES user(id),
  Foreign Key (line_of_business_id) REFERENCES line_of_business(id),
  Foreign Key (function_performed_id) REFERENCES function_performed(id)
);

CREATE TABLE move_disponibility (
  user_id TEXT NOT NULL,
  availability_to_move INTEGER NOT NULL,
  need_housing INTEGER NOT NULL,
  need_transportation_to_move INTEGER NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  pet INTEGER DEFAULT(1) NOT NULL,
  pet_type TEXT NOT NULL,
  Foreign Key (user_id) REFERENCES user(id)
);

CREATE TABLE user_img (
  user_id TEXT NOT NULL,
  img TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (user_id) REFERENCES user(id)
);

CREATE TABLE company (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  responsible_company_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL,
  phone_number NUMBER NOT NULL,
  cell_phone_number NUMBER NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  email_status TEXT NOT NULL,  
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

-- DROP TABLE "company";


CREATE TABLE company_adress (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  company_id TEXT NOT NULL,
  cep NUMBER NOT NULL,
  state_province TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  apartment TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (company_id) REFERENCES company(id)  
);

CREATE TABLE company_logo (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  company_id TEXT NOT NULL,
  logo_img TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (company_id) REFERENCES company(id)
);

CREATE TABLE job_opportunity (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  company_id TEXT NOT NULL,
  function_performed_id TEXT NOT NULL,
  city TEXT NOT NULL,
  cep TEXT NOT NULL,
  state_province TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  hourly_wage TEXT NOT NULL,
  shift TEXT NOT NULL,
  overtime TEXT NOT NULL,
  min_age NUMBER NOT NULL,
  max_age NUMBER NOT NULL,
  japanese_conversation_status NUMBER DEFAULT(0) NOT NULL,
  japanese_reading_status NUMBER DEFAULT(0) NOT NULL,
  driver_license INTEGER DEFAULT(1) NOT NULL,
  type_driver_license TEXT NOT NULL,
  profissional_license_id TEXT NOT NULL,
  min_height NUMBER NOT NULL,
  max_height NUMBER NOT NULL,
  min_weight NUMBER NOT NULL,
  max_weight NUMBER NOT NULL,
  min_uniform_size TEXT NOT NULL,
  max_uniform_size TEXT NOT NULL,
  glass TEXT NOT NULL ,
  tatoo TEXT NOT NULL,
  pircing TEXT  NOT NULL,
  smooker TEXT  NOT NULL,
  dominant_hand TEXT NOT NULL,
  details_job_oppotunity TEXT NOT NULL,
  evaluation NUMBER NOT NULL ,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (company_id) REFERENCES company(id),
  Foreign Key (function_performed_id) REFERENCES function_performed(id),
  Foreign Key (profissional_license_id) REFERENCES profissional_license(id)
);



CREATE TABLE job_application (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  job_opportunity_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (job_opportunity_id) REFERENCES job_opportunity(id),
  Foreign Key (user_id) REFERENCES user(id)
);


CREATE TABLE message (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  creator_id TEXT NOT NULL,
  company_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (company_id) REFERENCES company(id),
  Foreign Key (user_id) REFERENCES user(id)
);

DROP TABLE "message";


CREATE TABLE rating_company (
  id TEXT UNIQUE PRIMARY KEY,
  application_id TEXT,
  rating number,
  message TEXT,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (application_id) REFERENCES job_application(id)
);


CREATE TABLE site_rating (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  company_id TEXT NOT NULL,
  rating NUMBER NOT NULL,
  message TEXT,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (company_id) REFERENCES company(id)
);

