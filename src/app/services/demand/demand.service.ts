import { Injectable } from '@angular/core';
import { BaseService } from '../service.base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewDemand } from './demand.interface';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemandService extends BaseService {
  constructor(http: HttpClient) {
    super(http, {
      host: 'http://localhost:3000/demand/',
    });
  }

  getAll(): Observable<any> {
    return this.get('');
  }

  remove(demandGuid: string): Observable<any> {
    return this.delete('delete/' + demandGuid);
  }

  create(data: ViewDemand[]): Observable<any> {
    const body = {
      products: data.map((demand) => {
        return {
          productGuid: demand.productGuid,
          amount: demand.amount,
        };
      }),
    };

    return this.post('create', body);
  }
}
