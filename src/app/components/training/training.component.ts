import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { interval, startWith, switchMap } from 'rxjs';
import { TrainService } from 'src/app/services/train.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
})
export class TrainingComponent implements OnInit {
  form!: FormGroup;

  title = inject(Title);
  status: string = '';

  trainService = inject(TrainService);
  toast = inject(ToastrService);

  training = false;

  constructor(private formBuilder: FormBuilder) {
    this.title.setTitle('LSB - Actualizar datos');
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      host: ['', Validators.required],
    });
    interval(60000)
      .pipe(
        startWith(0),
        switchMap(() => this.checkStatus()),
      )
      .subscribe();
    await this.getService();
  }

  async getService() {
    const res = await this.trainService.getService();
    this.form.get('host')?.setValue(res.data.host);
  }

  async startTraining() {
    const res = await this.trainService.train();
    await this.checkStatus();
    this.toast.success(res.message, 'Activado');
  }

  async checkStatus() {
    const res = await this.trainService.checkStatus();
    switch (res.data.status) {
      case 0:
        this.status = '¿Acutalizar la traducción?';
        this.training = false;
        break;
      case 1:
        this.status = 'Entrenando';
        this.training = true;
        break;
      case 2:
        this.status = 'Entrenamiento finalizado';
        this.training = false;
        break;
      default:
        this.status = '¿Acutalizar la traducción?';
        this.training = false;
        break;
    }
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;
        this.trainService.updateService(formData);
        await this.getService();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
