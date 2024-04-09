import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { SqlInjectionService } from '../../service/sql-injection.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface CreateUserForm {
  name: FormControl,
  email: FormControl,
  login: FormControl,
  password: FormControl
}



@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  createUserForm!: FormGroup<CreateUserForm>;

  constructor(private sqlService: SqlInjectionService, private toastService: ToastrService, private router: Router) {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });


  }

  
  handleCreateUserSubmit(){
    this.sqlService.createUser( this.createUserForm.value.login, this.createUserForm.value.password, 
      this.createUserForm.value.email, this.createUserForm.value.name ).subscribe({
      next: () => {
        this.toastService.success("Usuário criado com sucesso!")
        this.router.navigate(['/user']);
      },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }


  navigateToLogin(){
    this.router.navigate(['/user']);
  }

}
