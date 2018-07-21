import * as React from 'react';
import {GallerySectionTile} from './GallerySectionTile';
import {Item, LinkItem} from '../../layout/components/item/Item';
import {Button} from '../../layout/components/button/Button';

export const GallerySections = ({user, sections, onCreateSection, onDeleteSection}) => (
  <div>
    <Item>
      <Button htmlType={'button'}
              block
              onClick={onCreateSection}>
        Neue Gallerie
      </Button>
    </Item>
    {sections.map((section, index) => (
      <LinkItem target={`/gallery/sections/${section.id}`}
                key={index}>
        <GallerySectionTile onDelete={() => onDeleteSection(section)}
                            user={user}
                            section={section}/>
      </LinkItem>
    ))}
  </div>
);
