import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../service.base';
import { Observable } from 'rxjs';
import { ViewProduct } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(http: HttpClient) {
    super(http, {
      host: 'http://localhost:3000/product/',
    });
  }

  create(dataBody: Partial<ViewProduct>): Observable<ViewProduct> {
    return this.post('create', dataBody);
  }

  getAll(): Observable<ViewProduct[]> {
    return this.get('');
  }

  getByGuid(guid: string): Observable<ViewProduct> {
    return this.get(guid);
  }

  remove(guid: string): Observable<ViewProduct> {
    return this.put('delete/' + guid, {});
  }

  update(product: ViewProduct): Observable<ViewProduct> {
    return this.put('update/' + product.guid, product);
  }

  uploadImage(productGuid: string, data: FormData): Observable<any> {
    return this.post('upload-image/' + productGuid, data);
  }

  downloadImages(productGuid: string) {
    this.get('download-image/' + productGuid).subscribe({
      next: (res) => {
        console.log('res', res);
      },
    });
  }
}
