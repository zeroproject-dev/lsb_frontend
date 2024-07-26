import { Injectable } from '@angular/core';
import { Video, Word } from '../models/words';
import { BaseService } from './base.service';
import { Response } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService extends BaseService<Word> {
  constructor() {
    super();
    this.resource = 'words';
  }

  async getVideosOfWord(wordId: number): Promise<Response<Video[]>> {
    const res = this.httpClient.get<Response<Video[]>>(
      `${this.apiUrl}/videos/${wordId}`
    );
    return firstValueFrom(res);
  }

  async deleteVideo(videoId: number): Promise<Response<Video>> {
    const res = this.httpClient.delete<Response<Video>>(
      `${this.apiUrl}/videos/${videoId}`
    );
    return firstValueFrom(res);
  }
}
