import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Word } from 'src/app/models/words';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { EnvironmentService } from 'src/app/services/environment';

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

  apiUrl = inject(EnvironmentService).apiHost;

  title = inject(Title);
  dictionaryService = inject(DictionaryService);

  videos = [
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img3.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img3.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/img3.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
    {
      bucket: 'words',
      id: 4,
      path: 'static/videos/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.mp4',
      preview: 'static/images/44d8f635-4efc-4b6b-ab05-d6c088e7ccc2.jpg',
      region: 'us',
      state: 'active',
      uploaded_by: {
        email: 'admin@gmail.com',
        first_name: 'Admin',
        first_surname: 'Admin',
        id: 1,
        password:
          'scrypt:32768:8:1$Hq5smcbcyeY5OVFv$1669c0117099265d6b9d0119ec92e3f68087e6242bb047ae0f9f25d0583e1a9bc399fd5b1917d5c1c0bcfa40d64cefae578f3901cbf51d597ac20e1d0a8f2189',
        role: 1,
        second_name: 'Admin',
        second_surname: 'Admin',
        state: 'active',
      },
      uploaded_date: 'Thu, 04 Apr 2024 12:44:54 GMT',
    },
  ];

  private searchSubject = new Subject<string>();

  constructor(private readonly ts: ToastrService) {
    this.title.setTitle('LSB - Diccionario');
  }

  async ngOnInit(): Promise<void> {
    await this.listWords();
    this.selectedWord = this.words[0];
    if (this.selectedWord) await this.updateVideos();

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.dictionaryService.list(query))
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
      const res = await this.dictionaryService.list();
      if (res.data === null) {
        return;
      }
      this.words = res.data;
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      this.ts.error('Error al obtener las palabras', 'Error');
    }
  }

  selectWord(word: Word) {
    this.selectedWord = word;

    this.updateVideos();
  }

  async deleteVideo(videoId: number) {
    try {
      const res = await this.dictionaryService.deleteVideo(videoId);
      this.updateVideos();
      this.ts.success(res.message, 'Éxito');
    } catch (error) {
      console.error(error);
    }
  }

  async updateVideos() {
    try {
      this.selectedWord.videos = this.videos;
      // const res = await this.dictionaryService.getVideosOfWord(
      //   this.selectedWord.id
      // );
      // if (res.data === null) {
      //   return;
      // }
      // this.selectedWord.videos = res.data;
      // console.log(res.data);
    } catch (error) {
      console.error(error);
      this.ts.error('Error al obtener los videos', 'Error');
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitCreate(formValue: any) {
    this.isLoading = true;
    this.dictionaryService
      .create(formValue)
      .then(() => {
        this.listWords();
        this.closeModal();
      })
      .catch((error) => {
        console.error(error);
        this.ts.error('Error al crear la palabra', 'Error');
      });
  }
}
