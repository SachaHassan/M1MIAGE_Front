import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from './assignments/assignment.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list'
import { MatListItem } from '@angular/material/list';
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AssignmentsComponent, MatSlideToggleModule, 
    CommonModule, RenduDirective, FormsModule, MatInputModule, MatDatepickerModule, 
    MatFormFieldModule, MatButtonModule, MatToolbarModule, MatIcon, MatSidenavModule, 
    MatDivider, MatList, MatListItem, AssignmentDetailComponent, AddAssignmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  opened = false;

  constructor(private assignmentService : AssignmentsService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
