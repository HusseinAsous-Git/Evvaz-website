import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    currentUser;
    constructor(private http: HttpClient, private router: Router) { }

    signIn(user) {
        return this.http.post(environment.apiPath + 'login/isLogged', user);
    }

    setUser(Data) {
        this.currentUser = Data;
        localStorage.setItem('@MYUSER', JSON.stringify(this.currentUser));
    }

    isAuthenticated(): boolean {
        if (this.checkUser() == false) {
            return false;
        } else {
            return true;
        }
    }

     isCompanyLogin() : boolean {
         if(this.isAuthenticated()) {
             if(this.currentUser.login_role === "company") {
                 return true;
             }else {
                 return false;
             }
         }
     }
     isSchoolLogin(){
        if(this.isAuthenticated()) {
            if(this.currentUser.login_role === "school") {
                return true;
            }else {
                return false;
            }
        }
     }
     isAdminLogin(){
        if(this.isAuthenticated()) {
            if(this.currentUser.login_role === "admin") {
                return true;
            }else {
                return false;
            }
        }
     }
    checkUser() {
        const user = localStorage.getItem('@MYUSER');

        if (user) {
            this.currentUser = JSON.parse(user);
        } else {
            return false;
        }
    }

    getToken() {
        // return 'Bearer ' + this.currentUser.token;
        return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYWhtb3VkIEFobWVkIiwidXNlcklkIjoiOCIsInJvbGUiOiJhZG1pbiJ9.hwkLA3MHa1Zz54PMrS1Geg1vQtwunKD7HUHCNXFDjDcaXk3c3Fdqc9LEmhYHhSU09n6-8otvzqbR0QCbZFYGrQ';
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('@MYUSER');
        this.router.navigate(['']);
    }

}
