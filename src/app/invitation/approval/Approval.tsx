import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {Form} from "../../layout/components/form/Form";
import {FormTextField} from "../../layout/components/form/form-text-field/FormTextField";
import {MAX_LENGTH_PLACEHOLDER} from '../../layout/components/form/validators/MaxLengthValidator';
import {FormButton} from '../../layout/components/form/form-button/FormButton';
import {Item, LinkItem, MailToItem} from '../../layout/components/item/Item';
import {FormSwitch} from '../../layout/components/form/form-switch/FormSwitch';
import {Card} from '../../layout/components/card/Card';
import {Headline} from '../../layout/components/headline/Headline';
import {Icon} from '../../layout/components/icon/Icon';
import {Tile, TileContent, TileIconWrapper} from '../../layout/components/tile/Tile';
import {
  JOURNEY_PATH, MUSIC_REQUESTS_PATH, OVERNIGHT_STAY_PATH, PROCEDURE_PATH,
  Q_AND_A_PATH
} from '../../skeleton/Skeleton';

interface ApprovalProps extends ContentComponentProps<ApprovalData> {
  users: User[];
  currentUser?: User;
  maxPersonCount: number;
  newCompanionName?: string;

  addCompanion(name);

  updateCompanion(companion: User);
}

export function Approval(props: ApprovalProps) {
  const keyPathMap = {
    procedure: PROCEDURE_PATH,
    overnight_stay: OVERNIGHT_STAY_PATH,
    journey: JOURNEY_PATH,
    music_requests: MUSIC_REQUESTS_PATH,
    q_and_a: Q_AND_A_PATH,
  };
  const {users, currentUser, maxPersonCount, newCompanionName, addCompanion, updateCompanion} = props;
  const {content: {greeting, welcome, companions, approval, sitemap, bugs}} = props;
  const isAddCompanionPossible = users && maxPersonCount && users.length < maxPersonCount;
  const hasCompanions = users.length > 1;
  const companion = approval.companion.replace('{{companion}}', getCompanionsStr(currentUser, users));
  const greetingWithUser = greeting.replace('{{username}}', currentUser ? currentUser.name : '');
  return (
    <div>
      <Card>
        <Headline text={greetingWithUser} icon={'favorite'}/>
        <Item>
          <Tile centered>
            <TileContent>
              {welcome}
            </TileContent>
          </Tile>
        </Item>
      </Card>
      <Card>
        <Item>
          <Tile centered>
            <TileContent>
              {approval.text} {hasCompanions ? companion : ''}
            </TileContent>
            <TileIconWrapper>
              <Icon size={'lg'} name={'done_all'}/>
            </TileIconWrapper>
          </Tile>
        </Item>
        {
          users &&
          users.map((user, index) =>
            (<FormSwitch key={index}
                         name={user.name}
                         onChange={({value}) => updateCompanion({...user, accepted: value})}
                         value={user.accepted}/>)
          )
        }
        {
          isAddCompanionPossible &&
          <div>
            <Item>
              <div>{companions.description}</div>
            </Item>
            <Form onSubmit={({isValid, values}) => isValid && addCompanion(values)}>
              <FormTextField name="name"
                             value={newCompanionName || ''}
                             label="Name"
                             maxLength={[255, `Maximale Zeichenlänge überschritten (${MAX_LENGTH_PLACEHOLDER} Zeichen erlaubt)`]}
                             required={'Bitte einen Namen eingeben!'}/>
              <Item>
                <FormButton>Hinzufügen</FormButton>
              </Item>
            </Form>
          </div>
        }
      </Card>
      <Card className={'pt-0 pb-0'}>
        {sitemap.map(({key, icon, content}, index) => (
          <LinkItem key={key} target={keyPathMap[key]}>
            <Tile centered>
              <TileIconWrapper key={'icon'}>
                <Icon size={'lg'} name={icon}/>
              </TileIconWrapper>
              <TileContent key={'content'}>
                {content}
              </TileContent>
            </Tile>
          </LinkItem>
        ))}
        <MailToItem target={bugs.email}>
          <Tile centered>
                <TileIconWrapper>
                  <Icon size={'lg'} name={bugs.icon}/>
                </TileIconWrapper>
                <TileContent>
                  {bugs.content}
                </TileContent>
          </Tile>
        </MailToItem>
      </Card>
    </div>
  );
}

function getCompanionsStr(currentUser: User | undefined, users: User[]) {
  return users
    .filter(({name}) => currentUser && currentUser.name !== name)
    .map(({name}) => name)
    .join(', ');
}
