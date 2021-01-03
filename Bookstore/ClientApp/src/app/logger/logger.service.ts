import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(data: any) {
    console.log(new Date() + ': ' + JSON.stringify(data));
  }

  warn(data: any) {
    console.warn(new Date() + ': ' + JSON.stringify(data));
  }

  error(data: any) {
    console.error(new Date() + ': ' + JSON.stringify(data));
  }
}
