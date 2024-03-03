import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private http = inject(HttpClient);

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
