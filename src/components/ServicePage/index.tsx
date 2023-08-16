'use client';

import { IServicePageContent } from '@/app/services/apiService/serviceAPI';
import { useRef, useState } from 'react';
import { H2 } from '../H2';
import OurProcess from '../HomePage/OurProcess';
import { IOurProcessData } from '../HomePage/OurProcess/interfaces';
import Testimonials from '../HomePage/Testimonials';
import { Li } from '../Li';
import { Ul } from '../Ul';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { ServiceDescription } from './Description';
import { WhyChoose } from './WhyChoose';
import { WhyRooton } from './WhyRooton';
import { ServicePageWrapper } from './Wrapper';
import Accordion from '../UIElements/Accordions';
import ToggleIcon from '../HomePage/ChallengesListing/ToggleIcon';
import { AccordionBody, AccordionHeader } from '../HomePage/ChallengesListing/ChallengeListingElements';
import BlogListings from '../HomePage/BlogListings';
import NextImage from '../UIElements/NextImage';
import RootOnBanner from '../HomePage/RootOnBanner';
import { appendAssetUrl, isVideo } from '@/utils';
import CalenderIconYellow from '../Icons/CalendarIconYellow';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
// eslint-disable-next-line import/no-named-as-default
import LeadFormStepper from './LeadFormStepper';
import RootOnCTAWrapper from './RootOnCTAWrapper';

type ServicePageProps = {
  response: IServicePageContent;
};

export const ServicePageComponent = ({ response }: ServicePageProps) => {
  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);
  const [formStepperProgress, setFormStepperProgress] = useState(0);
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);

  const leadFormRef = useRef<HTMLDivElement>(null);

  const whyChooseOpen = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 1;
  });

  const eligibility = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 2;
  });

  const leadForm = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 4;
  });

  const process = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 3;
  });

  const faqs = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 5;
  })?.attributes.json_content.faq;

  const blogs = response.data.attributes.blogs ?? [];

  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    setTimeout(() => {
      window.scrollTo({
        top: (leadFormRef.current!.getBoundingClientRect().top - 150) + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  return (
    <div>
      <RootOnBanner
        isVideoBanner={isVideo(response.data?.attributes.media_url?.data?.[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(response.data?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={response.data?.attributes?.title}
        description={response.data?.attributes?.sub_title}
        button={<BookAnAppointmentButton onClick={handleCTAButtonClick} />}
      />
      <ServicePageWrapper className="pt-10 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <>
          <ServiceDescription text={response.data.attributes.description} />
          <WhyChoose
            onClickCTA={handleCTAButtonClick}
            title={whyChooseOpen?.attributes.title ?? ''}
            description={whyChooseOpen?.attributes.description ?? ''}
            imageAlt="A man with laptop"
            imageUrl="/group-14-copy@3x.png"
          />
          <WhyRooton
            title={eligibility?.attributes.title ?? ''}
            description={eligibility?.attributes.description ?? ''}
          />
          <Ul>
            {(eligibility?.attributes.json_content.eligibility ?? []).map((e) => {
              return <Li key={e.position + e.key}> {e.value} </Li>;
            })}
          </Ul>
        </>
      </ServicePageWrapper>
      <div className=" mt-20 m-auto max-w-screen-2k">
        <OurProcess
          className=" !py-0"
          title={''}
          sub_title={process?.attributes.title ?? ''}
          json_content={process?.attributes.json_content as IOurProcessData}
        />
      </div>
      <ServicePageWrapper
        className={`${
          showBookAnAppointment ? 'block' : 'hidden'
        } p-5 lg:px-[80px] lg:pt-[84] lg:pb-[80px] m-auto max-w-[1440px]`}
      >
        <div
          ref={leadFormRef}
          className="
            flex
            gap-[34px]
            shadow-hubspot-form-shadow
            border
            border-golden-yellow
            justify-between
            relative
            overflow-hidden
          "
        >
          <div className=" absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
          <div className="p-12 lg:pl-[60px] w-full lg:w-[75%] py-12 lg:pb-16">
            <H2>{leadForm?.attributes.title ?? ''}</H2>
            <div className="" id="lead-form">
              <LeadFormStepper
                onProgress={(progress) => {
                  setFormStepperProgress(progress);
                }}
                region={
                  (leadForm?.attributes.json_content.lead_forms &&
                    leadForm?.attributes.json_content.lead_forms[0].region) ??
                  ''
                }
                portalId={
                  (leadForm?.attributes.json_content.lead_forms &&
                    leadForm?.attributes.json_content.lead_forms[0].portalId) ??
                  ''
                }
                formId={
                  (leadForm?.attributes.json_content.lead_forms &&
                    leadForm?.attributes.json_content.lead_forms[0].formId) ??
                  ''
                }
                target="LeadForm"
              />
            </div>
          </div>
          <div className=" hidden lg:block w-[25%] h-[714px] relative">
            <NextImage
              classSelector=" object-right"
              src={'/images/my-project-46@3x.png'}
              style={{ objectFit: 'contain' }}
              altText="a man"
              sizes="100vw"
              fill
              title=""
            />
          </div>
        </div>
      </ServicePageWrapper>
      <ServicePageWrapper className="m-auto max-w-screen-2k px-6 lg:px-[80px]">
        <RootOnCTAWrapper
          buttonAriaLabel={SERVICES_TITLE.appointment1.title}
          buttonText={SERVICES_TITLE.appointment1.title}
          buttonIcon={<CalenderIconYellow />}
          onClick={handleCTAButtonClick}
          imageSrc={SERVICES_TITLE.appointment1.image}
          imageAlt={SERVICES_TITLE.appointment1.imageAlt}
          imageTitle={SERVICES_TITLE.appointment1.imageTitle}
          heading={
            <>
              {SERVICES_TITLE.appointment1.contentLine1} <br /> {SERVICES_TITLE.appointment1.contentLine2}
            </>
          }
        />
      </ServicePageWrapper>
      <div className=" mt-10 m-auto max-w-screen-2k">
        <Testimonials title={SERVICES_TITLE.testimonial.title} subTitle={SERVICES_TITLE.testimonial.subtitle} />
      </div>
      <ServicePageWrapper className="px-6 mt-10 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <>
          <H2>{SERVICES_TITLE.faq.title}</H2>
          {faqs?.map((faq) => {
            return (
              <Accordion
                openAccordion={faq.position.toString() === selectedAccordionId}
                accordionId={faq.position.toString()}
                handleOnClick={(id) => {
                  setSelectedAccordionId(id === selectedAccordionId ? null : id);
                }}
                customToggle={<ToggleIcon isOpen={faq.position.toString() === selectedAccordionId} />}
                customSpacer={<span></span>}
                cssClass="challenges-accordion border-b-[1px] border-b-sandal "
                key={faq.position}
                header={<AccordionHeader value={faq.title} />}
                accordionBody={<AccordionBody value={faq.description} />}
              />
            );
          })}
        </>
      </ServicePageWrapper>
      <div className=" w-full bg-secondary-grey">
        <div className=" mt-20 m-auto max-w-screen-2k">
          <BlogListings
            blogs={{
              data: blogs?.data ?? [],
            }}
            title={''}
            sub_title={SERVICES_TITLE.blogs.title}
          />
        </div>
      </div>
      <ServicePageWrapper className="m-auto mt-20 max-w-screen-2k pb-20 px-6 lg:px-[80px]">
        <RootOnCTAWrapper
          buttonAriaLabel={SERVICES_TITLE.appointment2.title}
          buttonText={SERVICES_TITLE.appointment2.title}
          buttonIcon={<CalenderIconYellow />}
          onClick={handleCTAButtonClick}
          imageSrc={SERVICES_TITLE.appointment2.image}
          imageAlt={SERVICES_TITLE.appointment2.imageAlt}
          imageTitle={SERVICES_TITLE.appointment2.imageTitle}
          heading={
            <>
              {SERVICES_TITLE.appointment2.contentLine1} <br /> {SERVICES_TITLE.appointment2.contentLine2}
            </>
          }
        />
      </ServicePageWrapper>
    </div>
  );
};
