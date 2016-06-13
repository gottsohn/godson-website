import React from 'react';
import classnames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import styles from '../App.css';

import SocialMedia from './shared/SocialMedia.jsx';
import Proficiency from './shared/Proficiency.jsx';
import Portfolio from './shared/Portfolio.jsx';
import Footer from './shared/Footer.jsx';
import firebase from '../database';
import Anchor from './shared/Anchor.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      portfolio: null,
      proficiency: null,
      opensource: null,
      socialmedia: null,
      content: null
    };
  }

  componentDidMount() {
    this.getData('portfolio');
    this.getData('proficiency');
    this.getData('socialmedia');
    this.getData('opensource');
    this.getData('content');
  }

  getZDepth() {
    return 3;
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
            <h1 className={styles.headerTitle}>Godson Ukpere<span className={styles.fancyAnim}>&nbsp;</span></h1>
          </section>
          <Paper className={classnames(styles.section, styles.sectionText)} rounded zDepth={this.getZDepth()}>
            <h4>Über / About</h4>
            <p><small>A human with a passion for calisthenics <img src="http://emojipedia-us.s3.amazonaws.com/cache/4a/d7/4ad7acf1055461c7bee61952af7b35e4.png" style={{height: '14px'}} title="Ich haben abdominal muscles"/>. I've written production code for {this.getProductionYears()} years, started out as a unaethestic nerd, but this site though <img src="http://emojipedia-us.s3.amazonaws.com/cache/fc/67/fc6749acb440bde74cdde660c796f1e1.png" style={{height: '14px'}}/>. I work with NodeJS, PHP and Python servers, Angular or React JS for front end, native mobile SDKs (Java / Android and Swift / iOS). For UI/UX, <Anchor href="https://material.google.com/" label="Material Design"/> is bae. Lest I forget, my soft skill level, an astute Human Resource Manager <img src="http://emojipedia-us.s3.amazonaws.com/cache/fe/9f/fe9fd3657ed6faa5319f5357b2de48eb.png" style={{height: '14px'}} title="Boss"/>.</small></p>
            <p><small><img src="http://emojipedia-us.s3.amazonaws.com/cache/10/46/1046faae6fca73fff175423593ed5ef0.png" style={{height: '12px'}}/> Calisthenics und JavaScript über alle.</small></p>
            {this.state.content ? <p><br/>{this.state.content.text}</p> : <CircularProgress color="#009090" size={0.2} title="Something might load here"/>}
            <br/>
            <h4>Kontakt / Contact</h4>
            <p><i className={classnames('fa', 'fa-envelope-o', styles.marginRight)}></i><a href='mailto:godson.ukpere@gmail.com'>godson.ukpere@gmail.com</a></p>
            <p><i className={classnames('fa', 'fa-phone', styles.marginRight)}></i><a href='tel:+234-809-613-2990'>+234-809-613-2990</a></p>
            <p><i className={classnames('fa', 'fa-skype', styles.marginRight)}></i><a href='skype:godson.ukpere'>godson.ukpere</a></p>
          </Paper>
          <Paper className={styles.section} id="socialmedia" rounded zDepth={this.getZDepth()}>
            <h4>Sozial / Social</h4>
            {this.state.socialmedia ? <SocialMedia items={this.state.socialmedia}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="proficiency" rounded zDepth={this.getZDepth()}>
            <h4>Können / Proficiency</h4>
            {this.state.proficiency ? <Proficiency items={this.state.proficiency}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="portfolio" rounded zDepth={this.getZDepth()}>
            <h4>Portefeuille / Portfolio</h4>
            {this.state.portfolio ? <Portfolio items={this.state.portfolio} /> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="opensource" rounded zDepth={this.getZDepth()}>
            <h4>Open Source</h4>
            {this.state.opensource ? <Portfolio items={this.state.opensource}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
        </main>
        <Footer />
      </div>
    );
  }
}
