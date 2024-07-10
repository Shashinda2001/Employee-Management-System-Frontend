import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee-model';
import { NgForm, NgModel } from '@angular/forms';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] = [];


  constructor(private employeeService: EmployeeServiceService, private router: Router) { }


  ngOnInit(): void {
    this.getEmployees();

  }

  private getEmployees() {
    this.employeeService.getemployeeList().subscribe(data => {
      this.employees = data;
    })

  }

  updateEmployee(id: string) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: string) {

    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.gotoEmployeeList();
    },
      error => console.log(error))

  }
  gotoEmployeeList() {
    // this.router.navigate(['/'])
    window.location.reload();
  }
  

}
