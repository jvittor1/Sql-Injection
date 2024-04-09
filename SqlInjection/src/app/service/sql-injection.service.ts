import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqlInjectionService {

  constructor(private httpClient: HttpClient) { }


  // Get user by login and password
  getUser(login: string, password: string, sqlInjection: boolean) {
    return this.httpClient.post('http://localhost:3000/user', { login, password, sqlInjection });
  }


  // Create user
  createUser(login: string, password: string, email: string, name: string) {
    return this.httpClient.post('http://localhost:3000/createUser', { login, password, email, name });
  }


}
