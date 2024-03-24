import { Injectable } from '@angular/core';
import { Word } from '../models/words';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService extends BaseService<Word> {
  constructor() {
    super();
    this.resource = 'words';
  }
}
