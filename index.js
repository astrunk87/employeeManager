const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Noelle#35',
        database: 'employees_db'
    },
    console.log('connected to employees_db database')
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
            'update an employee role'            
        ],
    },
];

function start(){
    return inquirer.prompt(menu)
    .then((data) =>{ 
        const actions = {
        'view all departments':view_all_departments,
        'view all roles':view_all_roles,
        // 'view all employees':view_all_employees,
        // 'add a department':add_a_department,
        // 'add a role':add_a_role,
        // 'add an employee':add_an_employee,
        // 'update an employee role':update_an_employee_role
        };
        const selected_action = actions[data.action];
        selected_action();
    })  



    function view_all_departments(){
        db.query('SELECT * FROM departments', function(err, results){
            console.table(results);
            start();
        });
    };

    function view_all_roles(){
        db.query('SELECT * FROM roles', function(err, results){
            console.table(results);
            start(); 
        });
    };

};


start();