import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 
  putDataInStorage(storageKey:any, storageData:any){
      localStorage.setItem(storageKey, storageData);
  }
  getDataFromStorage(storageKey:any){
      return localStorage.getItem(storageKey);
  }
  removeDataFromStorage(storageKey:any){
      return localStorage.removeItem(storageKey);
  }
}
