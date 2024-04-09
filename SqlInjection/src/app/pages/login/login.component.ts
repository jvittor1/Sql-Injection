import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { SqlInjectionService } from '../../service/sql-injection.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';


interface LoginForm {
  login: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  noSqlInjectionForm!: FormGroup<LoginForm>;
  sqlInjectionForm!: FormGroup<LoginForm>;

  constructor(
    private sqlService: SqlInjectionService, 
    private toastService: ToastrService, 
    private router: Router,
    private dialog: MatDialog
  ) {

    this.noSqlInjectionForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    this.sqlInjectionForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

  
  handleSqlInjectionFormSubmit(){
    this.sqlService.getUser(this.sqlInjectionForm.value.login, this.sqlInjectionForm.value.password, true).subscribe({
      next: (data) => {
        this.toastService.success("Login Success")
        this.openDialog(data)
      },
      error: () => this.toastService.error("Unexpected Error")
    })
  }

  handleNoSqlInjectionFormSubmit(){
    this.sqlService.getUser(this.noSqlInjectionForm.value.login, this.noSqlInjectionForm.value.password, false).subscribe({
      next: (data) => {
        this.toastService.success("Login Success")
        this.openDialog(data)
      },
      error: () => this.toastService.error("Unexpected Error")
    })
  }

  navigateCreateUser(){
    this.router.navigate(['/create-user']);
  }

}
