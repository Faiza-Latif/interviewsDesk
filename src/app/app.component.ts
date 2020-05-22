import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { Capacitor, Plugins } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private subscription: Subscription;
  private previousAuthState = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private menuCtrl: MenuController,
    private route: Router,
    private authService: AuthService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.initializeApp();
  }
  initializeApp() {
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      Plugins.SplashScreen.hide();
    }
  }
  closeMenu() {
    this.menuCtrl.toggle();
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.subscription = this.authService.userIsAuthenticated.subscribe((isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.route.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    })
    );
  }
}
