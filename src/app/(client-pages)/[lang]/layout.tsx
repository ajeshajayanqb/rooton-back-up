'use client';

import useClient from '@/hooks/useClient';
import React, { ReactNode } from 'react';
import Translator from './translator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TranslationLoadingProvider } from '@/providers/translationLoadingProvider';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';

const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();
  const { data } = useClientAPI({ apiFn: getHeaderFooterData });

  return (
    <section>
      {isClient && (
        <TranslationLoadingProvider>
          <HeaderFooterDataProvider headerFooterAPIData={data}>
            <Header />
            <Translator />
            {children}
            <Footer />
          </HeaderFooterDataProvider>
        </TranslationLoadingProvider>
      )}
    </section>
  );
};

export default ClientPageLayout;
