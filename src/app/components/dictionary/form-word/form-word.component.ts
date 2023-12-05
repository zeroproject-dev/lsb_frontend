import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-word',
  templateUrl: './form-word.component.html',
})
export class FormWordComponent implements OnInit, OnChanges {
  @Input() word: string | null = null;
  @Output() onSubmitEmitter: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;
  submited: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const word = changes['word']['currentValue'] as string;
    if (!this.form) return;

    this.word = word;
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      state: [true, Validators.required],
    });
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;
        this.onSubmitEmitter.emit(formData);
      }
      this.submited = true;
    } catch (error) {
      console.error(error);
    }
  }

  isValidInput(name: string, field: string) {
    const errors = this.form.get(name)?.errors;
    if (errors) return errors[field];
    return false;
  }
}
