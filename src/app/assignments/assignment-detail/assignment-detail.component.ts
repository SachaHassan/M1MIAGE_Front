import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, RouterModule, MatButtonModule], 
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignementTransmis!:Assignment;

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => {
      this.assignementTransmis = assignment;
    });
  }

  isAdmin() {
    if (this.authService.loggedIn && this.authService.currentUserRole === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  onAssignmentRendu() {
    this.assignementTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignementTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });

    //this.router.navigate(['/home']);
  }

  onDeleteAssignment() {
    this.assignmentService.deleteAssignment(this.assignementTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });

    //this.router.navigate(['/home']);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignementTransmis.id, 'edit'],
      {queryParams:{nom:this.assignementTransmis.nom}, fragment:'edition'}
    );
  }
}
