import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CComplierService {
  constructor(private http: HttpClient) {}

  compile(code: string, stdin: string) {
    const requestBody = {
      script: code,
      language: 'c',
      versionIndex: '5',
      stdin: stdin,
      clientId: '43e123e9a7c20125bbf4872694c8a408',
      clientSecret:
        'b6a9f64d6271167b6ad448824ea343823cebdcb02ba10aa697cf867b295bcbd2',
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestOptions = {
      headers: headers,
    };

    return this.http.post<any>('/api/v1/execute', requestBody, requestOptions);
  }
}
