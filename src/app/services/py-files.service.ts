import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PyFilesService {
  constructor(private http: HttpClient) {}

  getFileContent(id: number): Observable<string> {
    return this.http.get(`assets/py/${id}.py`, { responseType: 'text' })
      .pipe(
        map(content => content || ''),
        catchError(error => {
          console.error(`Error loading file ${id}.py:`, error);
          return of('');
        })
      );
  }
} 