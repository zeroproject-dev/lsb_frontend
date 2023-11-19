import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  title = inject(Title);
  dictionaryService = inject(DictionaryService);

  constructor(private formBuilder: FormBuilder) {
    this.title.setTitle('LSB - Diccionario');
  }

  async ngOnInit(): Promise<void> {
    await this.listWords();
    this.selectedWord = this.words[0];
  }

  async listWords() {
    try {
      const res = await this.dictionaryService.listOfWords();
      this.words = res.data;
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }

  selectWord(word: Word) {
    this.selectedWord = word;
  }
}
