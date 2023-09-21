import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  isMatch: boolean = true;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required],
    });
  }

  onRegister() {
    let password = this.registerForm.get('password')?.value;
    let confPassword = this.registerForm.get('confPassword')?.value;

    if (this.registerForm.valid) {
      if (confPassword != password) {
        this.isMatch = false;
        this.registerForm.get('password')?.setValue('');
        this.registerForm.get('confPassword')?.setValue('');
        return;
      }
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          alert(res.message);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }
}
