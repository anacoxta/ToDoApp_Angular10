import { Component } from '@angular/core';
import { RecruiterMessageService } from './shared/services/recruiter-message/recruiter-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private recruiterMessage: RecruiterMessageService) {}

  ngOnInit(): void {
    this.recruiterMessage.showRecruiterMessage();
  }
}
