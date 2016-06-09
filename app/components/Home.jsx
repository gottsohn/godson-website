import React from 'react';
import styles from '../App.css';
import classnames from 'classnames';
import SocialMediaLink from './shared/SocialMediaLink.jsx';
import Proficiency from './shared/Proficiency.jsx';
import Portfolio from './shared/Portfolio.jsx';

// Data imports
import socialMediaLinks from '../data/SocialMediaLinks.json';
import portfolio from '../data/Portfolio.json';
import proficiency from '../data/Proficiency.json';
import opensource from '../data/OpenSource.json';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  getProductionYears() {
    return (new Date().getFullYear()) - 2010;
  }

  render() {
    return (
      <div className={styles.container}>
        <main>
          <section className={styles.section}>
            <h1 className={styles.headerTitle}>Godson Ukpere</h1>
          </section>
          <section className={classnames(styles.section, styles.sectionText)}>
            <h4>Über / About</h4>
            <p><small>I'm a trained Electrical Engineer (B.Eng) with a passion for calisthenics. I've written <i>production</i> code for {this.getProductionYears()} years. Calisthenics und Javascript über alle.</small></p>
            <br/>
            <h4>Lernen / Learnings</h4>
            <p><small>In the past year, I have learnt and practiced:</small></p>
            <ul className={styles.list}>
              <li>A few chords on the Guitar</li>
              <li>Siwft+iOS App development</li>
              <li>A couple of Calisthenic moves</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h4>Sozial / Social</h4>
            <SocialMediaLink items={socialMediaLinks} />
          </section>
          <section className={styles.section}>
            <h4>Können / Proficiency</h4>
            <Proficiency items={proficiency} />
          </section>
          <section className={styles.section}>
            <h4>Portefeuille / Portfolio</h4>
            <Portfolio items={portfolio} />
          </section>
          <section className={styles.section}>
            <h4>Open Source</h4>
            <Portfolio items={opensource} />
          </section>
        </main>
        <footer>
          <section>
            <p>
              <small>Built with <a className={styles.underline} target="_blank" href="//facebook.github.io/react/">ReactJS</a> and <a className={styles.underline} target="_blank" href="//material-ui.com">Material-ui</a></small>
            </p>
          </section>
        </footer>
      </div>
    );
  }
}
