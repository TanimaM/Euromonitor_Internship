import * as readline from 'readline';
import { iEmployee } from './iEmployee';

class EmployeeManagementSystem {
    public employees: iEmployee[] = [];
    public r1: readline.Interface;

    constructor(){
        this.r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public questionA(query:string): Promise<string> {
        return new Promise((resolve)=>{
            this.r1.question(query,resolve);
        })
    }
    
    public displayEmployees(): void{
        console.log('List of Employees: ');
        this.employees.forEach((emp)=>{
            console.log(`ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}`);
        });
    }
    
    public addEmployee(): void {
        this.r1.question('Enter the name of the Employee:', async (name) => {
            const position = await this.questionA('Enter the position of the employee: ');
            const id = this.employees.length + 1;
            
            const newEmployee: iEmployee = {id, name, position};
            this.employees.push(newEmployee);

            console.log('Employee added successfully! \n');
            this.menu();
        });
    }

    public updateEmployee(): void {
        this.displayEmployees();
        this.r1.question('Enter the ID of the employee to update: ', async(i)=>{
            const id = parseInt(i);
            const employeeIndex = this.employees.findIndex((employee)=> employee.id === id)

            if(employeeIndex !== -1){
                const newName = await this.questionA('Enter the new name: ');
                const newPosition = await this.questionA('Enter the new position: ');

                this.employees[employeeIndex].name = newName;
                this.employees[employeeIndex].position = newPosition;

                console.log('Employee details updated successfully!\n');
            }
            else{
                console.log('Employee not found.\n')
            }
            this.menu();
        });
    }

    public menu(): void{
        console.log('Employee Management System - ');
        console.log('1. Display Employees');
        console.log('2. Add Employee');
        console.log('3. Update Employee Information');
        console.log('4. Exit');

        this.r1.question('Select an option: ', (option) => {
            if(option==='1'){
                this.displayEmployees();
                this.menu();
            }
            else if(option === '2'){
                this.addEmployee();
            }
            else if(option === '3'){
                this.updateEmployee();
            }
            else if(option === '4'){
                console.log('Exiting Employee Management System.\n');
                this.r1.close();
            }
            else{
                console.log('Invalid option. Please enter (1-4).\n');
            }
        });
    }
    
   public run(): void{
    this.menu();
   }    
}
const empSystem = new EmployeeManagementSystem();
empSystem.run();