'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import React, { useState } from 'react';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import HtmlParser from 'react-html-parser';
import Accordion from '@/components/UIElements/Accordions';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import { MediaUrl } from '@/app/services/apiService/interfaces';
import { ITitleAttributes } from '../ServicesListing/interafces';
import ToggleIcon from './ToggleIcon';

export interface IChallenge {
  key: string;
  value: string;
  position: string;
}

export interface IChallenges {
  challenges: IChallenge[];
}

export interface IChallengesListing extends ITitleAttributes {
  json_content: IChallenges;
  media_url: MediaUrl;
}

const ChallengesListing = ({ title, sub_title, description, json_content, media_url }: IChallengesListing) => {
  const [accordionId, setAccordionId] = useState<string | null>(null);

  return (
    <section className="bg-pale-yellow-black">
      <SectionContainer>
        <div className="md:flex">
          <div className="md:w-[48%] md:pr-[80px]">
            <SectionHeadings title={title} subTitle={sub_title} />
            <p
              className="mt-[34px] md:mt-[24px] text-light-brown md:text-faded-black text-sm font-medium not-italic leading-[1.71] tracking-[normal]
           md:text-base
           "
            >
              {HtmlParser(description ?? '')}
            </p>
            <div className='relative autoh-image'>
              <NextImage
               sizes="(max-width: 768px) 100vw, 50vw"
                title={media_url?.data[0].attributes.alternativeText}
                altText={media_url?.data[0].attributes.alternativeText}
                fill
                style={{ objectFit: 'contain' }}
                src={appendAssetUrl(media_url?.data[0].attributes.url)}
              />
            </div>
          </div>
          <div className="md:w-[52%]">
            {json_content.challenges.map((challengObj) => {
              return (
                <Accordion
                  openAccordion={challengObj.position.toString() === accordionId}
                  accordionId={challengObj.position.toString()}
                  handleOnClick={(selectedAccordionId) => {
                    setAccordionId(selectedAccordionId === accordionId ? null : selectedAccordionId);
                  }}
                  customToggle={<ToggleIcon isOpen={challengObj.position.toString() === accordionId} />}
                  customSpacer={<span></span>}
                  cssClass="challenges-accordion border-b-[1px] border-b-sandal "
                  key={challengObj.position}
                  header={<div className="pt-[16px] pb-[19px] md:py-[24px]">{challengObj.key}</div>}
                  accordionBody={<div className="pb-[18px] md:pb-[24px]">{challengObj.value}</div>}
                />
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ChallengesListing;
