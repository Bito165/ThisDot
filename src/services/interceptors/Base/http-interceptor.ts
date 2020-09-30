import { Injectable } from "@angular/core";
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse,HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap, finalize, delay } from "rxjs/operators";

import { LoaderService } from 'src/services/classes/loader/loader.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';

@Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
    errorMessage:string;
    constructor(private loaderService:LoaderService, private router:Router, private notification:NotificationsService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show()
        
        return next.handle(request).pipe(tap(evt => {
            // custom api errors
            if (evt instanceof HttpResponse) {
              this.loaderService.hide()
            }
          }),

          catchError((error: HttpErrorResponse) => {
            this.loaderService.hide();

            this.errorMessage = `Error: ${error.error.message}`;

            if (error.status === 401) {
              this.notification.publishMessages('Your Token has expired. Please Login', 'danger', 1)
              this.router.navigateByUrl("/");              
            }
    
            if (error.error instanceof ErrorEvent) {
              //client-side error
              this.notification.publishMessages(this.errorMessage, 'danger', 1)
            } else {
              // server-side error
            
              switch (error.status) {
                case 503: {
                  
                  this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 500: {
                  
                  this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 400: {
                 
                  this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 403: {
                 
                  this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 404: {
                 
                    this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 405: {
                 
                    this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
                case 0: {
                  this.errorMessage = 'A Connection Error Occured. Please Check Your Network Connection';
                  this.notification.publishMessages(this.errorMessage, 'danger', 1)
                  break;
                }
              }
            }
    
            if (error.status === 503 || error.status === 0) {
              return throwError(this.errorMessage);
            }
          })
        );
      }
  }
  