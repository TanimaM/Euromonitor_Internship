"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var EmployeeManagementSystem = /** @class */ (function () {
    function EmployeeManagementSystem() {
        this.employees = [];
        this.r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    EmployeeManagementSystem.prototype.questionA = function (query) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.r1.question(query, resolve);
        });
    };
    EmployeeManagementSystem.prototype.displayEmployees = function () {
        console.log('List of Employees: ');
        this.employees.forEach(function (emp) {
            console.log("ID: ".concat(emp.id, ", Name: ").concat(emp.name, ", Position: ").concat(emp.position));
        });
    };
    EmployeeManagementSystem.prototype.addEmployee = function () {
        var _this = this;
        this.r1.question('Enter the name of the Employee:', function (name) { return __awaiter(_this, void 0, void 0, function () {
            var position, id, newEmployee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.questionA('Enter the position of the employee: ')];
                    case 1:
                        position = _a.sent();
                        id = this.employees.length + 1;
                        newEmployee = { id: id, name: name, position: position };
                        this.employees.push(newEmployee);
                        console.log('Employee added successfully! \n');
                        this.menu();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EmployeeManagementSystem.prototype.updateEmployee = function () {
        var _this = this;
        this.displayEmployees();
        this.r1.question('Enter the ID of the employee to update: ', function (i) { return __awaiter(_this, void 0, void 0, function () {
            var id, employeeIndex, newName, newPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(i);
                        employeeIndex = this.employees.findIndex(function (employee) { return employee.id === id; });
                        if (!(employeeIndex !== -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.questionA('Enter the new name: ')];
                    case 1:
                        newName = _a.sent();
                        return [4 /*yield*/, this.questionA('Enter the new position: ')];
                    case 2:
                        newPosition = _a.sent();
                        this.employees[employeeIndex].name = newName;
                        this.employees[employeeIndex].position = newPosition;
                        console.log('Employee details updated successfully!\n');
                        return [3 /*break*/, 4];
                    case 3:
                        console.log('Employee not found.\n');
                        _a.label = 4;
                    case 4:
                        this.menu();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EmployeeManagementSystem.prototype.menu = function () {
        var _this = this;
        console.log('Employee Management System - ');
        console.log('1. Display Employees');
        console.log('2. Add Employee');
        console.log('3. Update Employee Information');
        console.log('4. Exit');
        this.r1.question('Select an option: ', function (option) {
            if (option === '1') {
                _this.displayEmployees();
                _this.menu();
            }
            else if (option === '2') {
                _this.addEmployee();
            }
            else if (option === '3') {
                _this.updateEmployee();
            }
            else if (option === '4') {
                console.log('Exiting Employee Management System.\n');
                _this.r1.close();
            }
            else {
                console.log('Invalid option. Please enter (1-4).\n');
            }
        });
    };
    EmployeeManagementSystem.prototype.run = function () {
        this.menu();
    };
    return EmployeeManagementSystem;
}());
var empSystem = new EmployeeManagementSystem();
empSystem.run();
