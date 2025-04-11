import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PyFilesService {
  constructor(private http: HttpClient) {}

  getFileContent(id: number): Observable<string> {
    return this.http.get(`/py/${id}.py`, { 
      responseType: 'text',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }).pipe(
      map(response => response || ''),
      catchError(error => {
        console.error('Error loading file:', error);
        return of('');
      })
    );
  }
} 