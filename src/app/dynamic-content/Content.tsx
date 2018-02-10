import * as React from 'react';
import * as classNames from 'classnames';
import {FadeIn} from '../layout/components/fade-in/FadeIn';
import {FadeGallery, GalleryItem} from '../layout/components/fade-gallery/FadeGallery';
import {Image} from '../layout/components/image/Image';
import './Content.scss';

interface ContentProps {
  header: {
    title: string;
    image: string;
    images?: string[];
  };
  children: any;
  className?: string;
  style?: any;
}

export function Content({header, children, className, style}: ContentProps) {
  return (
    <div className={classNames('content', className)} style={style}>
      <div className={'header'}>
        <div className={'header-content'}>
          <FadeGallery>
            {(header.images || [header.image]).map(image => (
              <GalleryItem>
                <FadeIn whenLoaded>
                  <Image src={image} size={'cover'} positionX={'center'} positionY={'top'}/>
                </FadeIn>
              </GalleryItem>
            ))}
          </FadeGallery>
          <div className={'header-text'}>
            {header.title}
          </div>
        </div>
      </div>
      <div className={'content-content'}>
        {...children}
      </div>
    </div>
  );
}

