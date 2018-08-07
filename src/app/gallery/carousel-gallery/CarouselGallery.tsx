import * as React from 'react';
import Slider from 'react-slick';
import {Button} from '../../layout/components/button/Button';
import {Image} from '../../layout/components/image/Image';
import {Icon} from '../../layout/components/icon/Icon';
import {ExtLinkButton} from '../../layout/components/link-button/LinkButton';
import './CarouselGallery.scss';

export const CarouselGallery = ({items, onClose, currentIndex, onIndexChange}) => (
  <div className={'carousel-gallery'}>
    <div className={'carousel-gallery-nav'}>
      <ExtLinkButton type={'link'}
                     download
                     target={items[currentIndex].originalUrl}>
        <Icon name={'cloud_download'}/>
      </ExtLinkButton>
      <Button type={'link'}
              htmlType={'button'}
              onClick={onClose}>
        <Icon name={'close'}/>
      </Button>
    </div>
    <Slider speed={200}
            initialSlide={currentIndex}
            afterChange={onIndexChange}>
      {items
        .map((item, i) => (
          isInRange(i, currentIndex)
            ? (/video/.test(item.type)
              ? <video width={'100%'} controls>
                <source src={item.originalUrl} type={item.type}/>
              </video>
              : <Image key={i} src={item.resizedUrl}/>
            )
            : <div key={i}></div>
        ))
      }
    </Slider>
  </div>
);

const isInRange = (index, currentIndex) =>
  index === currentIndex
  || index === (currentIndex - 1)
  || index === (currentIndex - 2)
  || index === (currentIndex + 1)
  || index === (currentIndex + 2);
