-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE access_level (
  id SERIAL PRIMARY KEY,
  level INT,
  access_label VARCHAR(50)
);

CREATE TABLE sex (
  id SERIAL PRIMARY KEY,
  sex_label VARCHAR(20)
);

CREATE TABLE race (
  id SERIAL PRIMARY KEY,
  race_label varchar(100)
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  is_active  BOOLEAN,
  username VARCHAR(50),
  user_password VARCHAR(100),
  access_level INT DEFAULT 0 REFERENCES "access_level"(id),
  first_name VARCHAR(50),
  middle_name VARCHAR(50),
  last_name VARCHAR(50),
  posting_date DATE DEFAULT CURRENT_DATE,
  sex INT REFERENCES "sex"(id),
  race INT REFERENCES "race"(id),
  zip_code INT,
  company VARCHAR,
  job_title VARCHAR,
  motivation_bio TEXT,
  experience_bio TEXT,
  background_check_permission BOOLEAN,
  custom_entry_skills TEXT
);

CREATE TABLE admin_note (
  id SERIAL PRIMARY KEY,
  user_id_creator int,
  user_id_subject int,
  note_on_subject text
);


CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  skills_label VARCHAR(100)
);

CREATE TABLE user_skills (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id),
  skills_id INT REFERENCES "skills"(id)
);

CREATE TABLE time_slot (
  id SERIAL PRIMARY KEY,
  day_of_week INT,
  date_time_start TIMESTAMP WITH TIME ZONE,
  date_time_end TIMESTAMP WITH TIME ZONE
  );

CREATE TABLE user_time_slot (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id), 
  time_slot_id INT REFERENCES "time_slot"
);

CREATE TABLE education_level(
  id SERIAL PRIMARY KEY,
  education_label varchar(100)
);

CREATE TABLE user_education_level (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id),
  education_level INT REFERENCES "education_level"
);

CREATE TABLE event_type (
  id SERIAL PRIMARY KEY,
  type_label INT
);

CREATE TABLE "event" (
  id SERIAL PRIMARY KEY,
  event_type INT REFERENCES "event_type"(id),
  reccuring BOOLEAN,
  reccuring_time_slot INT REFERENCES "time_slot"(id),
  creator INT REFERENCES "user"(id),
  event_address VARCHAR(500),
  event_start TIMESTAMP WITH TIME ZONE,
  event_end TIMESTAMP WITH TIME ZONE,
  event_description TEXT
);

CREATE TABLE user_event (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id),
  event_id INT REFERENCES "event"(id),
  approved BOOLEAN
);