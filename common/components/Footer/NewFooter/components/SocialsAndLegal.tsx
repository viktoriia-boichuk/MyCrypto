import React, { Component } from 'react';

import { socialMediaLinks, VERSION } from 'config';
import { translateRaw } from 'translations';
import { NewTabLink } from 'components/ui';
import './SocialsAndLegal.scss';

const SocialMediaLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <NewTabLink className="SocialMediaLink" key={link} href={link} aria-label={text}>
      <img width="20px" height="20px" src={require(`common/assets/images/socials/${text}.svg`)} />
    </NewTabLink>
  );
};

function Socials() {
  return (
    <section className="Socials">
      {socialMediaLinks.map((socialMediaItem, idx) => (
        <SocialMediaLink link={socialMediaItem.link} key={idx} text={socialMediaItem.text} />
      ))}
    </section>
  );
}

interface LegalState {
  modalOpen: boolean;
}

class Legal extends Component {
  public state: LegalState = {
    modalOpen: false
  };

  public render() {
    return (
      <React.Fragment>
        <section className="Legal">
          <p>© {new Date().getFullYear()} Auxilium Global</p>
          <a onClick={this.openTermsAndServices}>{translateRaw('DISCLAIMER')}</a>
          <p>{VERSION}</p>
        </section>
      </React.Fragment>
    );
  }

  private openTermsAndServices() {
    window.open(
      'https://auxilium.global/wp-content/uploads/2018/11/Auxilium-Global-Privacy-Policy.pdf'
    );
  }
}

export default function SocialsAndLegal() {
  return (
    <section className="SocialsAndLegal">
      <Socials />
      <Legal />
    </section>
  );
}
