import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  
  private baseURL ="http://localhost:8081/api/v1/employee";
  private baseURLd ="http://localhost:8081/api/v1/employees";
  private baseURLk ="http://localhost:8081/api/v1/addemployee";
  constructor(private httpClient : HttpClient) { }

  getemployeeList(): Observable<EmployeeModel[]>{
    return this.httpClient.get<EmployeeModel[]>(`${this.baseURL}`);
  }

  createEmployees(employees: EmployeeModel): Observable<object>{
    return this.httpClient.post(`${this.baseURLk}`, employees);
  }

  getEmployeeById(id:string):Observable<EmployeeModel>{
    return this.httpClient.get<EmployeeModel>(`${this.baseURL}/${id}`);
  }

  updateEmployees(id:string ,employees: EmployeeModel): Observable<object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employees);
  }

  deleteEmployee(id:string):Observable<object>{
    return this.httpClient.delete(`${this.baseURLd}/${id}`);
  }
   
  
}
