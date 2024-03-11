import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HttpConfig {
  host: string;
}

export class BaseService {
  constructor(private httpClient: HttpClient, private config: HttpConfig) {}

  protected get(url: string): Observable<any> {
    return this.httpClient.get(this.mapHost(url));
  }

  protected post(
    url: string,
    body: any,
    headers?: HttpHeaders
  ): Observable<any> {
    return this.httpClient.post(this.mapHost(url), body, {
      headers,
    });
  }

  protected delete(url: string): Observable<any> {
    return this.httpClient.delete(this.mapHost(url));
  }

  protected put(url: string, body: any): Observable<any> {
    return this.httpClient.put(this.mapHost(url), body);
  }

  private mapHost(url: string): string {
    return this.config.host + url;
  }
}
