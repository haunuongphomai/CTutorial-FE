import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getCTaskUrl,
  lessonsUrl,
  sectionsUrl,
} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAllSections() {
    return this.http.get<any>(`${sectionsUrl}GetAllSection`);
  }

  getLessonsById(id: any) {
    return this.http.get<any>(`${lessonsUrl}` + id);
  }

  getTaskState(userName: string) {
    const a: any = localStorage.getItem('userName');
    const b: any = JSON.parse(a);
    userName = b.userName;
    return this.http.get<any>(
      `${getCTaskUrl}GetUserTaskState?user=` + userName
    );
  }
}
