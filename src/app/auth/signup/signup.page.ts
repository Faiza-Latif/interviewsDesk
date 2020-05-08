import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private authService: AuthService, private translate: TranslateService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password;
    console.log(email, password);
    this.authService.signup(email, password).subscribe(data => {}, error => {       
      this.showAlert(error.error.error.message);
    });
  }

  private showAlert(text: string) {
    let message: string;
    this.translate.get(text).subscribe(translation => {
      message = translation;
});
    this.alertCtrl.create({ header: 'Login Failed', message, buttons: ['Okay'] })
      .then(alertEl => alertEl.present());
  }
}
