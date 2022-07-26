import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {ProductComponent} from "../components/product/product.component";
import {Observable, delay, throwError, retry, tap} from "rxjs";
import {IProduct} from "../models/product";
import {catchError} from "rxjs/operators";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  products: IProduct[] = []

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: {limit: 5}
      })//.append('limit', 5)
    }).pipe(
      delay(700),
      retry(1),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    )
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(prod => this.products.push(prod))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
