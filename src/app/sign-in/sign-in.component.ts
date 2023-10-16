import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: res.token })
            );
            this.toastr.success('Đăng nhập thành công', 'Thông báo', {
              timeOut: 1000,
              positionClass: 'toast-bottom-right',
            });
            this.route.navigate(['/home-page']);
          }
        },
        error: (err) => {
          this.toastr.error(err, 'Lỗi', {
            timeOut: 1000,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    }
  }
}
