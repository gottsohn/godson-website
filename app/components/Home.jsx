import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styles from '../App.css';
import classnames from 'classnames';
import SocialMedia from './shared/SocialMedia.jsx';
import Proficiency from './shared/Proficiency.jsx';
import Portfolio from './shared/Portfolio.jsx';
import Footer from './shared/Footer.jsx';

// Data imports
import firebase from '../data/db.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      portfolio: null,
      proficiency: null,
      opensource: null,
      socialmedia: null
    };
  }

  componentDidMount() {
    this.getData('portfolio');
    this.getData('proficiency');
    this.getData('socialmedia');
    this.getData('opensource');
  }

  getData(key) {
    firebase.database.ref(key).on('value', (snap) => {
      if (snap.val()) {
        let state = {};
        state[key] = snap.val();
        this.setState(state);
      }
    });
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
            <br/>
            <h4>Kontakt / Contact</h4>
            <p><i className={classnames('fa', 'fa-envelope-o', styles.marginRight)}></i><a href='mailto:godson.ukpere@gmail.com'>godson.ukpere@gmail.com</a></p>
            <p><i className={classnames('fa', 'fa-phone', styles.marginRight)}></i><a href='tel:+234-809-613-2990'>+234-809-613-2990</a></p>
            <p><i className={classnames('fa', 'fa-skype', styles.marginRight)}></i><a href='skype:godson.ukpere'>godson.ukpere</a></p>
          </section>
          <section className={styles.section} id="socialmedia">
            <h4>Sozial / Social</h4>
            {this.state.socialmedia ? <SocialMedia items={this.state.socialmedia}/> : <CircularProgress color="#fff" size={1} />}
          </section>
          <section className={styles.section} id="proficiency">
            <h4>Können / Proficiency</h4>
            {this.state.proficiency ? <Proficiency items={this.state.proficiency}/> : <CircularProgress color="#fff" size={1} />}
          </section>
          <section className={styles.section} id="portfolio">
            <h4>Portefeuille / Portfolio</h4>
            {this.state.portfolio ? <Portfolio items={this.state.portfolio} /> : <CircularProgress color="#fff" size={1} />}
          </section>
          <section className={styles.section} id="opensource">
            <h4>Open Source</h4>
            {this.state.opensource ? <Portfolio items={this.state.opensource}/> : <CircularProgress color="#fff" size={1} />}
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
