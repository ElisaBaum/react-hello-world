import {Module} from 'react.di';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {APIHttpInterceptor} from './APIHttpInterceptor';
import {HISTORY_TOKEN, history} from './history';

@Module({
  providers: [
    {provide: HISTORY_TOKEN, useValue: history},
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: APIHttpInterceptor},
  ]
})
export class CommonModule {
}
