

SELECT *
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee 
JOIN role ON employee.role_id = role.id;

-- join below was provided to the class from our prof trey
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;