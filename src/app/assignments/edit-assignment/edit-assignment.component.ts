import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
  FormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})

export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nomAssignment = '';
  dateDeRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,  // Pour récupérer l'ID depuis l'URL
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();

    // afficher des query params et des fragments
    console.log('Query Params : ', this.route.snapshot.queryParams);
    console.log(this.route.snapshot.queryParams);
    console.log('Fragment : ', this.route.snapshot.fragment);
    console.log(this.route.snapshot.fragment);
  }

  getAssignment(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      if (this.assignment) {
        this.nomAssignment = this.assignment.nom;
        this.dateDeRendu = this.assignment.dateDeRendu;
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (!this.nomAssignment || !this.dateDeRendu) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;

    this.assignmentsService.updateAssignment(this.assignment).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}