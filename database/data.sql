INSERT INTO "race" (race_label) VALUES 
  ('White not Hispanic'),
  ('Hispanic or Latino'),
  ('Black or African American Alone'),
  ('Native American or Alaskan Native'),
  ('Native Hawaiian or Pacific Islander'),
  ('Asian'),
  ('Two or More Races')
  ('Prefer not to answer');

INSERT INTO "sex" (sex_label) VALUES 
  ('Male'),
  ('Female'),
  ('Other')
  ('Prefer not to answer');;

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
  (0 , 'unverified'),
  (1, 'volunteer'),
  (2, 'mentor'),
  (3, 'admin'),
  (4, 'super'),
  (9, 'rejected');

    INSERT INTO "volunteer_role" (role_label) VALUES 
  ('Tech Instructor'),
  ('Tech Assistant'),
  ('Classroom Assistant'),
  ('Non Tech Volunteer'),
  ('Social Media Volunteer'),
  ('General Office_Admin Help'),
  ('General IT_Technical Support');

  INSERT INTO "time_slot_day" (day_number, day_name) VALUES 
  (1 , 'Monday'),
  (2 , 'Tuesday'),
  (3 , 'Wednesday'),
  (4 , 'Thursday'),
  (5 , 'Friday'),
  (6 , 'Saturday'),
  (7 , 'Sunday'); 

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
