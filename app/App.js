import React from 'react';
import Home from './components/Home.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    injectTapEventPlugin();
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Home />
      </MuiThemeProvider>
    );
  }
}
