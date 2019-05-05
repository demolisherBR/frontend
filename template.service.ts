import { Injectable } from '@angular/core';
import { Template } from './model/template';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class TemplateService {
  private templateUrl = 'https://api.iobooks.com.br/template';  // URL to web api
  /** GET templates from the server */
  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.templateUrl);
  /** POST: add a new template to the server */
  }
  addTemplates(template: Template): Observable<Template> {
    console.log("NAME: "+template);
    return this.http.post<Template>(this.templateUrl,template,httpOptions);
  }
    /* GET templates whose name contains search term */
  searchTemplates(term: string): Observable<Template[]> {
   if (!term.trim()) {
        // if not search term, return empty hero array.
     return of([]);
     }
    return this.http.get<Template[]>(`${this.templateUrl}/?name=${term}`);
  }
      /** DELETE: delete the template from the server */
      deleteTemplate(template: Template | number): Observable<Template> {
        const id = typeof template === 'number' ? template : template.identifier;
        const url = `${this.templateUrl}/${id}`;
    
        return this.http.delete<Template>(url, httpOptions);
      }
  /** GET template by id. Will 404 if id not found */
  getTemplate(id: number): Observable<Template> {
    const url = `${this.templateUrl}/${id}`;
    return this.http.get<Template>(url);
  }
  /** PUT: update the template on the server */
  updateTemplate(template: Template): Observable<any> {
    return this.http.put(this.templateUrl, template, httpOptions);
  }
  constructor(private http: HttpClient) { }
}
