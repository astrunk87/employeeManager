const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Noelle#35',
        database: 'employee_db'
    },
    console.log('connected to employee_db database')
);

const menu = [
    {
        type: 'list',
        name: 'action',
        message: 'what do you want to do in the employee database today?',
        choices:[
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'exit employee database'        
            // ^ idea for exit fuction from class mate greg 
        ],
    },
];

function start(){
    return inquirer.prompt(menu)
    .then((data) =>{ 
        const actions = {
        'view all departments':view_all_departments,
        'view all roles':view_all_roles,
        'view all employees':view_all_employees,
        'add a department':add_a_department,
        'add a role':add_a_role,
        'add an employee':add_an_employee,
        // 'update an employee role':update_an_employee_role,
        'exit employee database':exit_database
        };
        const selected_action = actions[data.action];
        selected_action();
    });  

    function exit_database(){
        db.end();
        console.log("employee database closed");
    };

    function view_all_departments(){
        db.query('SELECT * FROM department', function(err, results){
            if (err) throw err;
            console.table(results);
            // start();
        });
    };

    function view_all_roles(){
        db.query('SELECT *FROM role JOIN department ON role.department_id = department.id', function(err, results){
            if (err) throw err;
            console.table(results);
            start();
        });
    };

    function view_all_employees(){
        db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`, function(err, results){
            if (err) throw err;
            console.table(results);
            start();
        });
    }

    function add_a_department(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'what is the new department name?'
            }
        ])
        .then((add_dept)=> {
        db.query(`INSERT INTO department (name) 
                    VALUES ('${add_dept.department}');
            `);
            
            console.log('dept added')
            view_all_departments();
           
        });
    };


        function add_a_role(){
            view_all_departments();
            inquirer.prompt([                
                {
                    type: 'input',
                    name: 'department',
                    message: 'refrenceing the departmenst list, which number department does the new role belong to?'
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'what is the new role title?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'what is the salary for this role'
                }
            ])
            .then((add_role)=> {
            db.query(`INSERT INTO role (title, salary, department_id) 
                        VALUES ('${add_role.title}', '${add_role.salary}', '${add_role.department_id}');
                `); 
                // ^syntax error fixed with help during office hours
           
                view_all_roles();
               
            });
        };       

            function add_an_employee(){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'what is their first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "what is their last name?"
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'what is their role id'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'what is their managers id? if they dont have a manager leave blank'
                }

            ])
            .then((add_an_employee)=> {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES ('${add_an_employee.first_name}', '${add_an_employee.last_name}', '${add_an_employee.role_id}', '${add_an_employee.manager_id}');
                `);                
                console.log('employee added')
                view_all_employees();
               
            });
        };
        
        
        
        // update_an_employee_role
    
    

};


start();