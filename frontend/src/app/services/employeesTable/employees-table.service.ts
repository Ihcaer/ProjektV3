import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesTableService {
  private baseUrl = 'http://localhost:3000';
  private employeesTableUrl = '/cms/employeesTable';
  private employeeDataUrl = '/cms/employeeData';
  private deleteEmployeeUrl = '/cms/deleteEmployee';
  private checkVerCodeUrl = '/cms/checkVerCode'

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.baseUrl + this.employeesTableUrl);
  }

  getEmployeeData(id: number): Observable<any> {
    return this.http.get(this.baseUrl + this.employeeDataUrl + '/' + id);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.deleteEmployeeUrl + '/' + id);
  }

  checkVerCode(verCode: string) {
    return this.http.post<any>(this.baseUrl + this.checkVerCodeUrl, { verCode });
  }
}
