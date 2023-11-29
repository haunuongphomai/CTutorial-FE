import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addCTaskUrl,
  exercisesUrl,
  getCTaskUrl,
  taskUrl,
} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  getAllExercises(userName: any) {
    return this.http.get<any>(`${exercisesUrl}GetExercises?user=` + userName);
  }

  getTaskById(id: any) {
    return this.http.get<any>(`${taskUrl}GetTask/` + id);
  }

  addCompleteTask(id: any) {
    const a: any = localStorage.getItem('userName');
    const b: any = JSON.parse(a);
    const user: any = b.userName;
    const requestBody = {
      completedTaskId: 0,
      user: user,
      taskId: id,
    };
    return this.http.post<any>(`${addCTaskUrl}AddCompletedTask`, requestBody);
  }

  getCompleteTask() {
    return this.http.get<any>(`${getCTaskUrl}GetCompletedTasks`);
  }
}
