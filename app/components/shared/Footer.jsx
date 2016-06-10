import React from 'react';
import Anchor from './Anchor.jsx';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <section>
          <p>
            <small>Built with <Anchor href="//facebook.github.io/react/" label="ReactJS" />, <Anchor href="//firebase.google.com" label="Firebase" /> and <Anchor href="//material-ui.com" label="Material-ui"/></small>
          </p>
        </section>
        <section>
          <small>View the <Anchor href="//github.com/gottsohn/godson-website" label="source code"/>.</small>
        </section>
      </footer>
    );
  }
}
