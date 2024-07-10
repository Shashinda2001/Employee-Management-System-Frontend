import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee-model';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { noSpace } from '../validators/nospace.validators';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  id: string | null = null;
  form: any;
  emailRegex: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  contactRegex: string = '[789][0-9]{9}'

  constructor(private employeeService: EmployeeServiceService, private router: Router, fb: FormBuilder, private route: ActivatedRoute) {
    this.form = fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        noSpace.noSpaceValidations
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        noSpace.noSpaceValidations
      ]],
      emailId: ['', [
        Validators.required,
        // Validators.pattern(this.emailRegex)
        Validators.email
      ]],


    })


  }



  get fc() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];  //url eke athi id eka ganna
    if (this.id) {
      this.employeeService.getEmployeeById(this.id).subscribe(data => {
        this.form.patchValue(data);

      }, error => console.log(error));
    }
  }

   
  


  onSubmit() {
    console.log(this.form.value);
    
    if (this.id) {
      this.employeeService.updateEmployees(this.id, this.form.value).subscribe(data => {
        this.gotoEmployeeList();
      },
        error => console.log(error))

    }

  }

  gotoEmployeeList() {
    this.router.navigate(['/employees'])
  }
}
