INSERT INTO "race" (race_label) VALUES 
  ('White not Hispanic'),
  ('Hispanic or Latino'),
  ('Black or African American'),
  ('Native American or American Indian'),
  ('Asian or Pacific Islander');
INSERT INTO "sex" (sex_label) VALUES 
  ('Male'),
  ('Female'),
  ('Other');
INSERT INTO "education_level" (education_label) VALUES 
  ('No schooling completed'),
  ('Nursery school to 8th grade'),
  ('Some high school, no diploma'),
  ('High school graduate, diploma or the equivalent (for example: GED)'),
  ('Some college credit, no degree'),
  ('Trade/technical/vocational training'),
  ('Associate degree'),
  ('Bachelors degree'),
  ('Masters degree'),
  ('Professional degree'),
  ('Doctorate degree');
INSERT INTO "skills" (skills_label) VALUES 
  ('JavaScript'),
  ('Css'),
  ('Html'),
  ('React'),
  ('Angular'),
  ('Python'),
  ('C#'),
  ('C++'),
  ('C'),
  ('Java'),
  ('Postgresql'),
  ('MongoDB');
  INSERT INTO "access_level" (access_level, access_label) VALUES 
  (0 , 'unverified'),
  (1, 'volunteer'),
  (2, 'Mentor'),
  (3, 'admin'),
  (4, 'Super'),
  (9, 'rejected');
  INSERT INTO "time_slot" (day_of_week, date_time_start, date_time_end)
  (1 , '2017-08-09 07:00:00 -7:00','2017-08-09 07:30:00 -7:00' )
  (2 , '2017-08-09 07:00:00 -7:00','2017-08-09 07:30:00 -7:00')
  (3 , '2017-08-09 07:00:00 -7:00','2017-08-09 07:30:00 -7:00')
  (4 , '2017-08-09 07:00:00 -7:00','2017-08-09 07:30:00 -7:00')
  (5 , '2017-08-09 07:00:00 -7:00','2017-08-09 07:30:00 -7:00')