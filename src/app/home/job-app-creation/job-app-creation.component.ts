import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-job-app-creation',
  templateUrl: './job-app-creation.component.html',
  styleUrls: ['./job-app-creation.component.scss'],
})
export class JobAppCreationComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onAdd() {
    this.modalCtrl.dismiss('hello', 'create');
  }
}
