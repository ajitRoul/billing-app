import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-help-line',
  standalone: true,
  imports: [SharedModule, MatCardModule],
  templateUrl: './help-line.component.html',
  styleUrl: './help-line.component.scss'
})
export class HelpLineComponent {

}
