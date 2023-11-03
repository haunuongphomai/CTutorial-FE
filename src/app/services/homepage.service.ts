import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sectionsUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAllSectionsInfo() {
    return this.http.get<any>(`${sectionsUrl}GetAllSection`);
  }
}
