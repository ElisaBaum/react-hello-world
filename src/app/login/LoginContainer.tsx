import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {UserHttpService} from '../user/UserHttpService';
import {AuthService} from '../auth/AuthService';
import {HISTORY_TOKEN, History} from '../common/history';
import {toast} from "react-toastify";
import {Inject} from 'react.di';
import {UserAuthHttpService} from '../auth/UserAuthHttpService';

interface LoginContainerState {
  loading: boolean;
}

export class LoginContainer extends Component<{}, LoginContainerState> {

  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;
  @Inject userHttpService: UserHttpService;
  @Inject userAuthHttpService: UserAuthHttpService;

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  async handleLogin({name, code}) {
    this.setState({loading: true});
    try {
      const {data: {csrfToken}} = await this.userAuthHttpService.login(name, code);
      await this.authService.setCSRFToken(csrfToken);
      toast.dismiss();
      this.history.replace(this.history.getPrevPath());
    } catch (e) {
      this.setState({loading: false});
      toast.error(<p>Fehler beim Login. Bitte versuche es erneut.</p>);
    }
  }

  render() {
    return (<Login onSubmit={e => this.handleLogin(e)} loading={this.state.loading}/>);
  }
}
