import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  hide = true;
  hide2 = true;
  registerSubscription$ :Subscription;
  registerCheckAdmin$ :Subscription;
  registerForm :FormGroup;
  submitted = false;
  errorMessage = "";
  isAdmin :boolean = false;
  checkAdmin :boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.registerCheckAdmin$ = this._authService.checkAdmin().subscribe({
      next: result => {
        this.checkAdmin = result.message;
      },
      error: error => {
        console.log(error.error);
      }
    })

    this.registerForm = this._formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
	    isAdmin: [this.isAdmin, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnDestroy() {
    this.registerSubscription$?.unsubscribe();
	this.registerCheckAdmin$?.unsubscribe();
  }

  // getter pour récupérer les accès des champs du formulaire
  get f() { return this.registerForm.controls; }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmitRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.registerSubscription$ = this._authService.register(this.registerForm.value).subscribe({
      next: result => {
        console.log(result.message);
        this.openSnackBar(result.message, 'fermer');
        location.reload();
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

}
