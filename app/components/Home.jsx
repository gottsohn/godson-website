import React from 'react';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';

import styles from '../App.css';
import SocialMedia from './shared/SocialMedia.jsx';
import Proficiency from './shared/Proficiency.jsx';
import Canvas from './shared/Canvas.jsx';
import Portfolio from './shared/Portfolio.jsx';
import Footer from './shared/Footer.jsx';
import HomeSection from './shared/HomeSection.jsx';
import Loading from './shared/Loading.jsx';
import firebase from '../database';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.getDataOrder = this.getDataOrder.bind(this);
    this.createSection = this.createSection.bind(this);
    this.state = {
      portfolio: null,
      proficiency: null,
      opensource: null,
      socialmedia: null,
      developerAccount: null,
      content: null,
      message: '',
      sections: [null, null, null, null]
    };
  }

  componentDidMount() {
    firebase.database.ref('content/order').on('value', this.getDataOrder);
    this.getData('content');
  }

  componentDidWillUnMount() {
    firebase.database.ref('data/order').off('value');
    this.state.sections.forEach((key) =>
      !key || firebase.database.ref(key).off('value'));
  }

  getZDepth = () => 2

  getDataOrder(snap) {
    const data = snap.val();
    if (data) {
      data.forEach(this.getData);
      this.setState({
        sections: data
      });
    } else {
      this.setState({
        message:
          `${this.state.message || ''}\nNein wert einstellung für datenbank ref`
      });
    }
  }

  getData(key) {
    const ref = firebase.database.ref(key);
    ref.off('value');
    ref.on('value', (snap) => {
      if (snap.val()) {
        let state = {};
        state[key] = snap.val();
        this.setState(state);
      } else {
        this.setState({
          message: `${this.state.message || ''}` +
            `\nKeine wert für daten taste: '${key}'`
        });
      }
    });
  }

  createSection(key, index) {
    if (key && this.state[key] && this.state.content) {
      let ComponentData;
      switch (this.state.content.data[key].type) {
        case 'portfolio':
          ComponentData = Portfolio;
          break;
        case 'socialmedia':
          ComponentData = SocialMedia;
          break;
        case 'proficiency':
          ComponentData = Proficiency;
          break;
        default:
          ComponentData = null;
      }

      if (ComponentData) {
        return (
          <Paper className={styles.section} id="developer-account" key={index} rounded zDepth={this.getZDepth()}>
            <h4><p><small>{this.state.content? this.state.content.data[key].title : null}</small></p></h4>
            <p><small>{this.state.content? this.state.content.data[key].text : null}</small></p>
            {
              this.state[key] && ComponentData ?
              <ComponentData items={this.state[key]}/> :
              <Loading />
            }
          </Paper>
        );
      }
    }

    return (
      <Paper className={styles.section} key={index} rounded>
        <Loading size={1}/>
      </Paper>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Canvas />
        <main>
          <section className={styles.section}>
            <h1 className={styles.headerTitle}>Godson Ukpere{/*<span className={styles.fancyAnim}>&nbsp;</span>*/}</h1>

          </section>
          <Paper className={classnames(styles.section, styles.sectionText)} rounded zDepth={this.getZDepth()}>
            <HomeSection content={this.state.content} />
            {
              this.state.message ?
                <h2>
                  <i
                      className={classnames('fa', 'fa-warning')}
                      style={{color: 'red'}}
                  >
                  </i>
                  <br />
                  <code>{this.state.message}</code>
                </h2>
                : null
            }
          </Paper>
          {this.state.sections.map(this.createSection)}
        </main>
        <Footer />
      </div>
    );
  }
}
