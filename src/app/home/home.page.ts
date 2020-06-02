import { JobApplication } from "./../shared/job-application.model";
import { Component, ViewChild, OnInit } from "@angular/core";
import {
  MenuController,
  IonReorderGroup,
  ModalController,
} from "@ionic/angular";
import { JobAppCreationComponent } from "./job-app-creation/job-app-creation.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild(IonReorderGroup, { static: false }) reorderGroup: IonReorderGroup;
  jobApplications: JobApplication[] = [];

  constructor(private modalCtrl: ModalController) {}
  ngOnInit(): void {
    this.jobApplications = [
      {
        label: "AKA",
        companyName: "string",
        state: "string",
        description: "string",
        interviewer: "string",
      },
      {
        label: "AMA",
        companyName: "agap",
        state: "a",
        description: "projectNearshore, description.",
        interviewer: "stanaring",
      },
      {
        label: "string",
        companyName: "ststingring",
        interviewer: "paulo",
      },
      {
        label: "trind",
        companyName: "trind",
        state: "initial",
      },
      {
        label: "string",
      },
      {
        label: "string",
        companyName: "string",
        state: "cool",
        interviewer: "string",
      },
      {
        label: "string",
        companyName: "string",
        state: "cool",
        description: "string",
        interviewer: "string",
      },
      {
        label: "string",
        companyName: "string",
        state: "cool",
        description: "string",
        interviewer: "string",
      },
    ];
  }
  async addJobApplication() {
    const modal = await this.modalCtrl.create({
      component: JobAppCreationComponent,
      cssClass: "popup",
      componentProps: {
        firstName: "Douglas",
        lastName: "Adams",
        middleInitial: "N",
      },
      showBackdrop: true,
      backdropDismiss: false,
    }).then((modalEl) => {
      modalEl.present();
      return modalEl.onWillDismiss();
    }).then((data) => {
console.log(data);
    });


  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", ev.detail.from, "to", ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    this.jobApplications = ev.detail.complete(this.jobApplications);
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
}
