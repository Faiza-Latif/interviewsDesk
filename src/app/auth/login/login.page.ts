import { Route, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {

  }
  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password;
    console.log(email, password);
    this.authService.login(email, password).subscribe(data => {
      console.log(data);
      this.authService.userIsAuthenticated = true;
      this.router.navigateByUrl('/home');
    }, error => {
      this.showAlert(error.error.error.message);
    });
  }

  private showAlert(message: string) {
    this.alertCtrl.create({ header: 'Login Failed', message, buttons: ['Okay'] })
      .then(alertEl => alertEl.present());
  }
}
