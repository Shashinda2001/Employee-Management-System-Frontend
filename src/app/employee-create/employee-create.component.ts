import { Component ,OnInit} from '@angular/core';
import { EmployeeModel } from '../models/employee-model';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { Router } from '@angular/router';
import { Form, FormArray, FormControl,FormGroup, Validators,FormBuilder } from '@angular/forms';
import { noSpace } from '../validators/nospace.validators';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent implements OnInit {

     
  

  form :any;
  emailRegex:string="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  contactRegex:string='[789][0-9]{9}'

  constructor(private employeeService : EmployeeServiceService , private router : Router ,fb:FormBuilder){
    this.form=fb.group({
      firstName:['',[
        Validators.required,
        Validators.minLength(2),
        noSpace.noSpaceValidations
       ]],
       lastName:['',[
        Validators.required,
        Validators.minLength(2),
        noSpace.noSpaceValidations
       ]],
       emailId:['',[
        Validators.required,
        // Validators.pattern(this.emailRegex)
        Validators.email
       ]],
       
       
    })
  

  }

  saveEmployee(){
    const formValues = this.form.value;
    this.employeeService.createEmployees(formValues).subscribe(data=>{
      console.log(data);
      this.gotoEmployeeList();
    },
    error => console.log(error));
  }

  
  gotoEmployeeList(){
    this.router.navigate(['/employees'])
  }

  ngOnInit(): void {
      
  }
   
  onSubmit(){
    console.log(this.form.value);
   this.saveEmployee();
  }

  get fc(){
    return this.form.controls;
  }
  

}
