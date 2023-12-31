import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Word } from 'src/app/models/words';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
})
export class DictionaryComponent implements OnInit {
  form!: FormGroup;
  words!: Word[];
  selectedWord!: Word;

  isLoading = true;
  showModal = false;

  title = inject(Title);
  dictionaryService = inject(DictionaryService);

  private searchSubject = new Subject<string>();

  constructor() {
    this.title.setTitle('LSB - Diccionario');
  }

  async ngOnInit(): Promise<void> {
    await this.listWords();
    this.selectedWord = this.words[0];

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.dictionaryService.listOfWords(query)),
      )
      .subscribe((obj) => {
        this.words = obj.data ?? [];
      });
  }

  onSearchInputChange(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  async listWords() {
    try {
      const res = await this.dictionaryService.listOfWords();
      if (res.data === null) {
        return;
      }
      this.words = res.data;
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }

  selectWord(word: Word) {
    this.selectedWord = word;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitCreate(formValue: any) {
    console.log(formValue);
  }
}
