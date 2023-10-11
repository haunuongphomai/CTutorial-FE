import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  isMatch: boolean = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
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
          this.toastr.success('Đăng kí thành công', 'Thông báo', {
            timeOut: 1000,
            positionClass: 'toast-bottom-right',
          });
          this.route.navigate(['/sign-in']);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }
}
