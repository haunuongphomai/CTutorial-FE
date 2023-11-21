import { exercisesUrl } from './../../environments/environment.development';
import { Component } from '@angular/core';
import { ExercisesService } from '../services/exercises.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent {
  userName: any;
  exercises: any[] = [];

  constructor(private ex: ExercisesService) {}

  ngOnInit(): void {
    let a: any = localStorage.getItem('userName');
    const b = JSON.parse(a);
    this.userName = b.userName;
    this.getAllExercises();
  }

  getAllExercises() {
    this.ex.getAllExercises().subscribe({
      next: (res) => {
        this.exercises = res;
      },
    });
  }
}
