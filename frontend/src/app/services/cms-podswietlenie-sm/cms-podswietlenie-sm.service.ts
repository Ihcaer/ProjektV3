import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmsPodswietlenieSMService {
  activeAktywnosc: boolean = false;
  activePracownicy: boolean = false;

  constructor() { }
}
