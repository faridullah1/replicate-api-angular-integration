import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	exports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatProgressSpinnerModule
	]
})
export class MaterialModule { }
 