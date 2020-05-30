import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-app-creation',
  templateUrl: './job-app-creation.component.html',
  styleUrls: ['./job-app-creation.component.scss'],
})
export class JobAppCreationComponent implements OnInit {

  constructor() { }

    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;
  
  ngOnInit() {}

}
