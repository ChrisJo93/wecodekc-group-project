INSERT INTO "ethnicity" (ethnicity_label) VALUES 
  ('White not Hispanic'),
  ('Hispanic or Latino'),
  ('Black or African American'),
  ('Native American or Alaskan Native'),
  ('Native Hawaiian or Pacific Islander'),
  ('Asian'),
  ('Two or more of the above'),
  ('Prefer not to answer');

INSERT INTO "gender" (gender_label) VALUES 
  ('Male'),
  ('Female'),
  ('Transgender'),
  ('Non-binary'),
  ('Gender Neutral'),
  ('Not listed');


INSERT INTO "education_level" (education_label) VALUES 
  ('No schooling completed'),
  ('Nursery school to 8th grade'),
  ('Some high school, no diploma'),
  ('High school graduate, diploma or the equivalent (for example: GED)'),
  ('Some college credit, no degree'),
  ('Trade/technical/vocational training'),
  ('Associate degree'),
  ('Bachelor''s degree'),
  ('Master''s degree'),
  ('Professional degree'),
  ('Doctorate degree');

INSERT INTO "skills" (skills_label) VALUES 
  ('JavaScript'),
  ('CSS'),
  ('HTML'),
  ('React'),
  ('Angular'),
  ('Python'),
  ('C#'),
  ('C++'),
  ('C'),
  ('Java'),
  ('PostgreSQL'),
  ('MongoDB');

  INSERT INTO "access_level" (access_level, access_label) VALUES 
  (1 , 'unverified'),
  (2, 'volunteer'),
  (3, 'mentor'),
  (4, 'admin'),
  (5, 'super'),
  (6, 'rejected');

    INSERT INTO "volunteer_role" (role_label) VALUES 
  ('None Assigned'),
  ('Tech Instructor'),
  ('Tech Assistant'),
  ('Classroom Assistant'),
  ('Non Tech Volunteer'),
  ('Social Media Volunteer'),
  ('General Office_Admin Help'),
  ('General IT_Technical Support');

  INSERT INTO "time_slot_day" (day_number, day_name) VALUES 
  (0 , 'Sunday'),
  (1 , 'Monday'),
  (2 , 'Tuesday'),
  (3 , 'Wednesday'),
  (4 , 'Thursday'),
  (5 , 'Friday'),
  (6 , 'Saturday');

  INSERT INTO "event_type" (type_label) VALUES 
  ('Course'),
  ('Event');

  INSERT INTO "languages" (languages_label) VALUES 
  ('English'),
  ('Spanish'),
  ('German'),
  ('French'),
  ('Chinese Mandarin'),
  ('Chinese Cantonese'),
  ('Japanese'),
  ('Arabic');

  INSERT INTO "time_slot"(day_of_week, time_slot_label) VALUES
  (2, '5pm to 9pm'),
  (3, '5pm to 9pm'),
  (4, '5pm to 9pm'),
  (5, '5pm to 9pm'),
  (6, '5pm to 9pm'),
  (7, '10am to 2pm');

INSERT INTO "images" (image_name, link_url) VALUES
('event photo', 'https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6515_edited-2.jpg'),
('event photo', 'https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6521.JPG'),
('event photo', 'https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6522.JPG'),
('event photo', 'https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6523-1.jpg'),
('event photo', 'https://wecodekc.s3.us-east-2.amazonaws.com/_W4A0816-1.jpg');