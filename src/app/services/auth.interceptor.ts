import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

      constructor(private loginServcice: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Thêm jwt Token request
        let authReq = req;
        const token = this.loginServcice.getToken(); 
        if(token != null) {
            authReq = authReq.clone (
                { setHeaders: { Authorization: `Bearer ${ token }` },
            });
            
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
];