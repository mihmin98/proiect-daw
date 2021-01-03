import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    this.authService.logout();
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
      .subscribe(result => {
        if (this.authService.isLoggedIn()) {
          this.router.navigateByUrl('home');
        } else {
          alert('Login unsuccsesful');
        }
      }, () => {
        alert('Login unsuccsesful');
      });
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }
}
