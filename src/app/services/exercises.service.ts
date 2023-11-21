import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exercisesUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  getAllExercises() {
    return this.http.get<any>(`${exercisesUrl}GetExercises`);
  }
}
