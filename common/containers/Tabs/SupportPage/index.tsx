import React from 'react';

import { donationAddressMap, socialMediaLinks, VERSION } from 'config';
import translate from 'translations';
import TabSection from 'containers/TabSection';
import DisclaimerModal from 'components/DisclaimerModal';
import { NewTabLink } from 'components/ui';
import './index.scss';

interface State {
  isDisclaimerOpen: boolean;
}

export default class SupportPage extends React.Component<{}, State> {
  public state: State = {
    isDisclaimerOpen: false
  };

  public render() {
    const donationCurrencies: ['ETH', 'BTC'] = ['ETH', 'BTC'];

    return (
      <TabSection>
        <div className="SupportPage Tab-content container">
          <div className="row">
            <div className="col-xs-12">
              <div className="SupportPage-mycrypto Tab-content-pane">
                <div className="SupportPage-mycrypto-logo" />
                <p className="SupportPage-mycrypto-about">{translate('FOOTER_ABOUT')}</p>

                <div className="SupportPage-mycrypto-social">
                  {socialMediaLinks.map(link => (
                    <NewTabLink
                      className="SupportPage-mycrypto-social-link"
                      href={link.link}
                      aria-label={link.text}
                    >
                      <img
                        width="20px"
                        height="20px"
                        src={require(`common/assets/images/socials_desktop/${link.text}.svg`)}
                      />
                    </NewTabLink>
                  ))}
                </div>

                <div className="SupportPage-mycrypto-legal">
                  <div className="SupportPage-mycrypto-legal-text">
                    © {new Date().getFullYear()} Auxilium Global
                  </div>
                  <div className="SupportPage-mycrypto-legal-text">
                    <a onClick={this.openDisclaimer}>{translate('DISCLAIMER')}</a>
                  </div>
                  <div className="SupportPage-mycrypto-legal-text">v{VERSION}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="SupportPage-donate Tab-content-pane">
                <h3 className="SupportPage-donate-title">{translate('FOOTER_DONATIONS')}</h3>

                <div className="row">
                  {donationCurrencies.map(currency => (
                    <div className="col-sm-6 col-xs-12">
                      <div className="SupportPage-donate-type">
                        <div className="SupportPage-donate-type-currency">
                          <span
                            className={`SupportPage-donate-type-currency-icon is-${currency}`}
                          />
                          {`${currency} `}
                          {translate('TOKEN_ADDR')}
                        </div>
                        <span className="SupportPage-donate-type-address">
                          {donationAddressMap[currency]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerModal isOpen={this.state.isDisclaimerOpen} handleClose={this.closeDisclaimer} />
      </TabSection>
    );
  }

  private openDisclaimer = () => this.setState({ isDisclaimerOpen: true });
  private closeDisclaimer = () => this.setState({ isDisclaimerOpen: false });
}
