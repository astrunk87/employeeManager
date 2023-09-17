INSERT INTO department(id, name)
-- pulled some of dummy data from hw assingment video
VALUES 
    (1, 'sales'),
    (2, 'engineering'),
    (3, 'finance'),
    (4, 'legal');

INSERT INTO role (id, title, salary, department_id)
VALUES  (01,'sales lead', 100000, 1),
        (10,'salesperson', 90000, 1),
        (02,'lead engineer', 100000, 2),
        (20,'software engineer', 90000, 2),
        (03,'account manager', 100000, 3),
        (30,'accountant', 90000, 3),
        (04,'legal team lead', 100000, 4),
        (40,'lawyer', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('mike', 'carter', 10, 01),
        ('leah', 'smith', 01, NULL),
        ('brent', 'walker', 02, NULL),
        ('sam', 'kash', 20, 02),
        ('lee', 'trent', 30, 03),
        ('auden', 'rubio', 30, 03),
        ('travis', 'allen', 40, 04),
        ('dean', 'porter', 20, 02),
        ('rory', 'gilmore', 04, NULL),
        ('dorothy', 'zbornak', 03, NULL);
        
