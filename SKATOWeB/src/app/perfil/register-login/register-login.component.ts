import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  levels = [
    { id: 1, name: 'Posser' },
    { id: 2, name: 'Intermedio' },
    { id: 3, name: 'Maestro' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      idLevelUser: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post<any>('http://localhost:3000/users/login', loginData)
        .subscribe(
          response => {
            console.log('Login exitoso', response);
            localStorage.setItem('authToken', response.token); 
            this.router.navigate(['/perfil']);  
          },
          error => {
            console.error('Error al iniciar sesión', error);
            alert('Error al iniciar sesión. Verifica tus credenciales.');
          }
        );
    } else {
      alert('Por favor, ingresa un correo y contraseña válidos.');
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      console.log('Datos de registro:', registerData);  

      this.http.post('http://localhost:3000/users/add', registerData)
        .subscribe(
          response => {
            console.log('Usuario creado exitosamente', response);
            alert('Usuario creado exitosamente');
            this.router.navigate(['/login']);  
          },
          error => {
            console.error('Error al registrar', error);
            alert('Hubo un error al crear el usuario. Intenta nuevamente.');
          }
        );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
