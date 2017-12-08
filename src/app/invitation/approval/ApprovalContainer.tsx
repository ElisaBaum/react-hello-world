import * as React from 'react';
import {User} from "../../user/User";
import {Component} from "react";
import {Inject} from "react.di";
import {UserHttpService} from "../../user/UserHttpService";
import {Approval} from "./Approval";
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {ApprovalData} from "./ApprovalData";
import {toast} from "react-toastify";

interface ApprovalContainerState {
  users: User[];
  maxPersonCount: number;
  newCompanionName?: string;
}

export class ApprovalContainer extends Component<{}, ApprovalContainerState> {

  @Inject userService: UserHttpService;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      maxPersonCount: 0
    };
  }

  async componentWillMount() {
    // todo error handling
    const party = await this.userService.getParty();

    this.setState({
      maxPersonCount: party.maxPersonCount,
      users: party.users
    });
  }

  async addCompanion(partialUser: Partial<User> & { name: string }) {
    this.setState({
      newCompanionName: partialUser.name
    });

    try {
      const addedUser = await this.userService.addCompanion(partialUser);

      this.setState(prevState => ({
        users: [...prevState.users, addedUser],
        newCompanionName: undefined
      }));

      toast.dismiss();
    } catch (e) {
      // TODO show error message dependent on type of error?
      toast.error(<p>Fehler</p>);
    }
  }

  async updateCompanionPartially(user: User) {
    try {
      this.userService.updateCompanionPartially(user);
      toast.dismiss();
    } catch (e) {
      // TODO show error message dependent on type of error?
      toast.error(<p>Fehler</p>);
    }
  }

  render() {
    return (
      <ContentContainer contentKey={'approval'} render={(content: ApprovalData) => (
        <Approval users={this.state.users}
                  maxPersonCount={this.state.maxPersonCount}
                  newCompanionName={this.state.newCompanionName}
                  updateCompanion={user => this.updateCompanionPartially(user)}
                  addCompanion={name => this.addCompanion(name)}
                  content={content}/>
      )}/>
    );
  }
}
