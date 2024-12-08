import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from './assignment.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list'
import { MatListItem } from '@angular/material/list';
import { AssignmentDetailComponent } from "./assignment-detail/assignment-detail.component";
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, FormsModule, MatInputModule,
    MatDatepickerModule, MatFormFieldModule, MatButtonModule, MatToolbarModule,
    MatIcon, MatSidenavModule, MatDivider, MatList, MatListItem, AssignmentDetailComponent, AddAssignmentComponent, RouterLink, RouterOutlet],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit {

  page:number =1;
  limit:number = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;

  titre = "Mon appplication sur les Assignments !"
  opened = false;
  formVisible = false;
  assignments!:Assignment[];

  constructor(private assignmentService : AssignmentsService, private router: Router) {}

  ngOnInit(): void {
    //this.getAssignments();
    //pour gérer la pagination
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log("Données reçues");
      }
    );
  }

  goToFirstPage() {
    this.page = 1;
    this.fetchAssignments();
  }
  
  goToPreviousPage() {
    if (this.hasPrevPage) {
      this.page--;
      this.fetchAssignments();
    }
  }
  
  goToNextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.fetchAssignments();
    }
  }
  
  goToLastPage() {
    this.page = this.totalPages;
    this.fetchAssignments();
  }
  
  fetchAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }
  

  getAssignments() {
    this.assignmentService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

  assignmentSelectionne!:Assignment;

  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  /*
  onNouvelAssignment(event:Assignment) {
    //this.assignments.push(new Assignment());
    this.assignmentService.addAssignment(event).subscribe(message => console.log(message));
    this.formVisible = false;
  }
  */


}
