import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Word } from '../models/words';
import { Response } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private httpClient = inject(HttpClient);

  private baseUrl;

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';
  }

  listOfWords(): Promise<Response<Word[]>> {
    const res = this.httpClient.get<Response<Word[]>>(`${this.baseUrl}/words`);
    return firstValueFrom(res);
  }
}
