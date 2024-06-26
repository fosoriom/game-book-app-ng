import { HttpInterceptorFn } from '@angular/common/http';

export const CustomeInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  const reqInterceptor  = req.clone({
    headers : req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(reqInterceptor);
};
