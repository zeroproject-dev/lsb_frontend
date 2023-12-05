import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Word } from '../models/words';
import { Response } from '../models/user';
import { TOKEN_STORAGE_KEY } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private httpClient = inject(HttpClient);

  private baseUrl;

  constructor() {
    this.baseUrl = 'http://18.231.27.17:3300/api/v1';
  }

  listOfWords(search: string = ''): Promise<Response<Word[]>> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    let res;
    if (search == '')
      res = this.httpClient.get<Response<any>>(`${this.baseUrl}/words/`, {
        headers,
      });
    else
      res = this.httpClient.get<Response<any>>(
        `${this.baseUrl}/words/?search=${encodeURIComponent(search)}`,
        { headers },
      );

    return firstValueFrom(res);
  }
}
