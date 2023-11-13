import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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
    // return this.http.get<any>(`${lessonsUrl}GetLessonById/`, id);
    return this.http.get<any>(
      `https://localhost:7096/api/Lessons/GetLessonById/` + id
    );
  }
}
