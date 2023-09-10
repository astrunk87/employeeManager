INSERT INTO department(name)
-- pulled some of dummy data from hw assingment video
VALUES 
    ('sales'),
    ('engineering'),
    ('finance'),
    ('legal');

INSERT INTO role (id, title, department)
VALUES  (01,'sales lead', 1),
        (10,'salesperson', 1),
        (02,'lead engineer', 2),
        (20,'software engineer', 2),
        (03,'account manager', 3),
        (30,'accountant', 3),
        (04,'legal team lead', 4),
        (40,'lawyer', 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('mike', 'carter', 10),
        ('leah', 'smith', 01),
        ('brent', 'walker', 02),
        ('sam', 'kash', 20),
        ('lee', 'trent', 30),
        ('auden', 'rubio', 30),
        ('travis', 'allen', 40),
        ('dean', 'porter', 20),
        ('rory', 'gilmore', 04),
        ('dorothy', 'zbornak', 03);
        
