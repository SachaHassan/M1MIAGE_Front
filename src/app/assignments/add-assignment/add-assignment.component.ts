import { Component, OnInit/*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDatepickerModule, MatButton],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AddAssignmentComponent {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomDevoir:string = "";
  dateDeRendu = new Date();
  ajoutActive = false;

  constructor (private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
}

  onSubmit(event:any){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    // this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
    });
  }

  generateRandomAssignments() {
    const assignmentsToCreate = 50; 
    const assignments: Assignment[] = [];
  
    for (let i = 0; i < assignmentsToCreate; i++) {
      const newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random() * 10000); 
      newAssignment.nom = `Devoir ${i + 1}`; 
      newAssignment.dateDeRendu = this.getRandomDate(); 
      newAssignment.rendu = Math.random() < 0.3;
  
      assignments.push(newAssignment);
    }

    assignments.forEach(assignment => {
      this.assignmentsService.addAssignment(assignment).subscribe(message => {
        console.log(`Assignment ${assignment.nom} ajouté : ${message}`);
      });
    });
  }
  
  // Fonction utilitaire pour générer une date aléatoire
  getRandomDate(): Date {
    const start = new Date(2023, 0, 1); // Début des dates possibles
    const end = new Date(2024, 11, 31); // Fin des dates possibles
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  

}
