

SELECT *
from role
JOIN department ON role.department = department.id;

SELECT *
FROM employee 
JOIN role ON employee.role_id = role.id;

