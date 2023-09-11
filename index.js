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
        db.query('SELECT * FROM role', function(err, results){
            if (err) throw err;
            console.table(results);
            start();
        });
    };

    function view_all_employees(){
        db.query('SELECT * FROM employee', function(err, results){
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
            // view_all_departments();
            inquirer.prompt([                
                // {
                //     type: 'input',
                //     name: 'department',
                //     message: 'refrenceing the departmenst list, which number department does the new role belong to?'
                // },
                {
                    type: 'input',
                    name: 'title',
                    message: 'what is the new role title?'
                }

            ])
            .then((add_role)=> {
            db.query(`INSERT INTO role (id, title, salary, department) 
                        VALUES ('11, ${add_role.title}, 10, 2');
                `);
            // db.query(`INSERT INTO role (name) VALUES('${add_role.department}');`);                
            //     console.log('role added')
            //     view_all_roles();
               
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
                }

            ])
            .then((add_an_employee)=> {
            db.query(`INSERT INTO employee (name) 
                        VALUES ('${add_an_employee.first_name}');
                `);                
                console.log('employee added')
                view_all_employees();
               
            });
        };
        
        
        
        // update_an_employee_role
    
    

};


start();