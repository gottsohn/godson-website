import React from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';

import Loading from './Loading.jsx';
import Anchor from './Anchor.jsx';
import styles from '../../App.css';

export default class HomeSection extends React.Component {
  constructor(props) {
    super(props);
  }

  getProductionYears() {
    return (new Date().getFullYear()) - 2010;
  }

  render() {
    return (
      <div>
        <h4>About</h4>
        <p><small>I've written production code for <b data-tip={this.getProductionYears.toString()}>{this.getProductionYears()}</b> years with solid Front End background and a passion for calisthenics <span className={styles.emoji} data-tip="Ich haben abdominal muscles">🍫</span>. I work with NodeJS, PHP and Python servers, Angular or React JS for front end, native mobile SDKs (Java / Android and Swift / iOS), with soft skills of an astute Human Resource Manager <span className={styles.emoji}>👋</span>. For UI/UX, <Anchor href="https://material.google.com/" label="Material Design"/> is bae.</small></p>
        <p><span className={styles.emoji}>🇩🇪</span> Calisthenics und JavaScript über alle.</p>
        <br/>
        <h4>Contact</h4>
        <p><small><i className={classnames('fa', 'fa-envelope-o', styles.marginRight)}></i><a href='mailto:godson.ukpere@gmail.com'>godson.ukpere@gmail.com</a></small></p>
        <br/>
        {this.props.content ?
          <div>
            <h4>{this.props.content.title}</h4>
            <p><small>{this.props.content.text}</small></p>
          </div> :
          <Loading size={0.2} title="Something might load here"/>
        }
      <ReactTooltip />
      </div>
    );
  }
}

HomeSection.propTypes = {
  content: React.PropTypes.shape({
    text: React.PropTypes.string,
    title: React.PropTypes.string
  })
};
