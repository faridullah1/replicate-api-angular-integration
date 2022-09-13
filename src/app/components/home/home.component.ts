import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Prediction } from 'src/app/models';
import { ApiService } from './../../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	prompt = new FormControl('Moai statue giving a TED talk', Validators.required);
	prediction: Prediction | null = null;
	disableSaveBtn = false;

	constructor(private apiService: ApiService) { }

	onSubmit() {
		this.disableSaveBtn = true;
		const prompt = this.prompt.value as string;

		this.apiService.post(prompt).subscribe({
			next: async (resp: Prediction) => {
				this.prediction = resp;

				while (this.prediction.status !== "succeeded" && this.prediction.status !== "failed") 
				{
					await this.sleep(1500);

					this.apiService.setPrediction(this.prediction.id).subscribe((resp: Prediction) => {
						this.prediction = resp;
					});
				}

				this.disableSaveBtn = false;
			},
			error: (error) => {
				console.error(error);
				this.disableSaveBtn = false;
			}
		})
	}

	sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
}
