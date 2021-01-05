INSERT INTO "race" (race_label) VALUES 
  ('WHITE'),
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
  ('Bachelor’s degree'),
  ('Master’s degree'),
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

  INSERT INTO "access_level" (level, access_label) VALUES 
  (0 , 'unverified'),
  (1, 'volunteer'),
  (2, 'Mentor'),
  (3, 'admin'),
  (4, 'Super'),
  (9, 'rejected');
