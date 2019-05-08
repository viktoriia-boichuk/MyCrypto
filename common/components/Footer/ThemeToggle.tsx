import React from 'react';
import { connect } from 'react-redux';
import { configMetaActions, configMetaSelectors } from 'features/config';
import { AppState } from 'features/reducers';
import './ThemeToggle.scss';

interface ActionProps {
  changeTheme: typeof configMetaActions.changeTheme;
}

interface StateProps {
  theme: ReturnType<typeof configMetaSelectors.getTheme>;
}

type Props = ActionProps & StateProps;

class ThemeToggle extends React.Component<Props> {
  public render() {
    return (
      <button className="ThemeToggle" aria-hidden={true}>
        <div className="ThemeToggle-control">
          <span className="ThemeToggle-control-icon is-dark" />
          <span className="ThemeToggle-control-icon is-light" />
        </div>
      </button>
    );
  }
}

export default connect(
  (state: AppState) => ({
    theme: configMetaSelectors.getTheme(state)
  }),
  {
    changeTheme: configMetaActions.changeTheme
  }
)(ThemeToggle);
