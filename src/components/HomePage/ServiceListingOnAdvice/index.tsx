import React from 'react';
import ListWrapper from './ListWrapper';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { IServiceData } from '../ServicesListing/interafces';

const ServiceListingOnAdvice = () => {
  const { headerFooterData } = useHeaderFooterContext();
  const getServiceListing = () => {
    const ServicesList = headerFooterData && headerFooterData[0]?.attributes?.core_services;
    const ServiceListright: IServiceData[] = [];
    const ServiceListLeft: IServiceData[] = [];
    ServicesList?.data?.forEach((listItem, index: number) => {
      if (index % 2 === 0) ServiceListLeft.push(listItem);
      else ServiceListright.push(listItem);
    });
    return [[...ServiceListLeft], [...ServiceListright]].map((listItem,index) => {
      // eslint-disable-next-line react/no-array-index-key
      return <ListWrapper key={index+1} services={listItem || []} />;
    });
  };

  return (
    <div className="w-100vw h-100vh  w-[703px]  h-[741px]  shadow-lg bg-white  pl-9  pt-[41px]  pb-[36px]">
      <h1 className=" mb-10 text-[22px] tracking-normal font-bold text-black ">
        Select a service for which you need advice on.
      </h1>
      <div className="hideScrollBar flex  flex-row  gap-[6.8vw] overflow-y-scroll  h-[590px]">
        {getServiceListing()}
      </div>
    </div>
  );
};

export default ServiceListingOnAdvice;