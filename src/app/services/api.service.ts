import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prediction } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl = '/v1/predictions';
	headers: HttpHeaders;

  	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Token ${environment.REPLICATE_API_TOKEN}`,
		});
	}

	post(prompt: string): Observable<Prediction> {
		const body = {
			version: "2af375da21c5b824a84e1c459f45b69a117ec8649c2aa974112d7cf1840fc0ce",
			input: { text: prompt, grid_size: 1 },
		}
		return this.http.post<Prediction>(this.baseUrl, body, { headers: this.headers });
	}

	setPrediction(id: string): Observable<Prediction> {
		return this.http.get<Prediction>(this.baseUrl + `/${id}`, { headers: this.headers });
	}
}
