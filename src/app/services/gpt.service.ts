import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  private apiKey = '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';
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  callGptAPI(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const data = {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      // max_tokens: 50, // Adjust as needed
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}
