import React from 'react';
import classnames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import styles from '../App.css';

import SocialMedia from './shared/SocialMedia.jsx';
import Proficiency from './shared/Proficiency.jsx';
import Portfolio from './shared/Portfolio.jsx';
import Footer from './shared/Footer.jsx';
import HomeSection from './shared/HomeSection.jsx';
import firebase from '../database';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      portfolio: null,
      proficiency: null,
      opensource: null,
      socialmedia: null,
      developerAccount: null,
      content: null
    };
  }

  componentDidMount() {
    this.getData('portfolio');
    this.getData('proficiency');
    this.getData('socialmedia');
    this.getData('opensource');
    this.getData('developerAccount');
    this.getData('content');
  }

  getZDepth = () => 3

  getData(key) {
    firebase.database.ref(key).on('value', (snap) => {
      if (snap.val()) {
        let state = {};
        state[key] = snap.val();
        this.setState(state);
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <main>
          <section className={styles.section}>
            <h1 className={styles.headerTitle}>Godson Ukpere<span className={styles.fancyAnim}>&nbsp;</span></h1>
          </section>
          <Paper className={classnames(styles.section, styles.sectionText)} rounded zDepth={this.getZDepth()}>
            <HomeSection content={this.state.content} />
          </Paper>
          <Paper className={styles.section} id="socialmedia" rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data.socialmedia.title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data.socialmedia.text : null}</small></p>
            {this.state.socialmedia ? <SocialMedia items={this.state.socialmedia}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="proficiency" rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data.proficiency.title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data.proficiency.text : null}</small></p>
            {this.state.proficiency ? <Proficiency items={this.state.proficiency}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="portfolio" rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data.portfolio.title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data.portfolio.text : null}</small></p>
            {this.state.portfolio ? <Portfolio items={this.state.portfolio} /> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="opensource" rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data.opensource.title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data.opensource.text : null}</small></p>
            {this.state.opensource ? <Portfolio items={this.state.opensource}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
          <Paper className={styles.section} id="developer-account" rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data.developerAccount.title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data.developerAccount.text : null}</small></p>
            {this.state.developerAccount ? <Portfolio items={this.state.developerAccount}/> : <CircularProgress color="#009090" size={0.5} />}
          </Paper>
        </main>
        <Footer />
      </div>
    );
  }
}
