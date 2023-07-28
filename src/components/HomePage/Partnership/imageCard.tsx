import { IImageAttributes } from '@/app/services/apiService/interfaces';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import React from 'react';

export interface IimageCard {
  attributes: IImageAttributes;
}


const ImageCard = ({ attributes }: IimageCard) => (
  <div className="relative shadow-[0px_4px_19px_-1px_rgb(178_178_178_/_22%)] flex justify-center items-center mb-4 w-[146px] h-[112.5px] lg:w-[260px] lg:h-[177px]">
    <NextImage
      sizes={'30vw'}
      src={appendAssetUrl(attributes.url)}
      title={attributes.alternativeText ?? ''}
      fill
      style={{ objectFit: 'contain' }}
      altText={attributes.alternativeText ?? ''}
    />
  </div>
);

export default ImageCard;
