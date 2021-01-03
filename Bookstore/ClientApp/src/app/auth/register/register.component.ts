import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public registrationForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  register() {
    this.authService.register({
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password
    })
      .subscribe(result => {
        this.router.navigateByUrl('login');
      });
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
