import React from 'react';

import translate from 'translations';
import { OnboardingButton } from '../components';
import './FourthSlide.scss';

export default function FourthSlide() {
  return (
    <section className="FourthSlide">
      <section>
        <h1>{translate('ONBOARDING_TEXT_25')}</h1>
        <p>
          {translate('ONBOARDING_TEXT_29', {
            $link: 'https://forum.auxilium.global/c/support'
          })}
        </p>
        <OnboardingButton />
      </section>
    </section>
  );
}
