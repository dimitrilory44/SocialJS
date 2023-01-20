import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  loginSubscription$ :Subscription;
  loginForm :FormGroup;
  errorMessage :string = '';
  submitted = false;

  constructor(
    private _authService :AuthService,
    private _router: Router,
    private _formBuilder :FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnDestroy() {
    this.loginSubscription$?.unsubscribe();
  }

  // getter pour récupérer les accès des champs du formulaire
  get l() { return this.loginForm.controls; }

  onSubmitLogin() {
    this.submitted = true;
    
    this.loginSubscription$ = this._authService.login(this.loginForm.value).subscribe({
      next: result => {
        // Je stocke les informations du token permettant de sécuriser la navigation côté client
        localStorage.setItem("token", JSON.stringify(result.token));
        let respBody = result;

        // Je stocke localement les informations de l'utilisateur
        let user = JSON.stringify(respBody);
        localStorage.setItem('currentUser', user);
        
        this._router.navigate(['/']);
      },
      error: error => {
        this.errorMessage = error.error.error;
      }
    });
  }

}
