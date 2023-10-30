import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lessonsUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAllLessons() {
    return this.http.get<any>(`${lessonsUrl}GetAllLessons`);
  }
}
