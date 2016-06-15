import React from 'react';
import classnames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';

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
        <p><small>A human with a passion for calisthenics <img src="http://emojipedia-us.s3.amazonaws.com/cache/4a/d7/4ad7acf1055461c7bee61952af7b35e4.png" style={{height: '14px'}} title="Ich haben abdominal muscles"/>. I've written production code for {this.getProductionYears()} years, started out as a unaethestic nerd, but this site though <img src="http://emojipedia-us.s3.amazonaws.com/cache/fc/67/fc6749acb440bde74cdde660c796f1e1.png" style={{height: '14px'}}/>. I work with NodeJS, PHP and Python servers, Angular or React JS for front end, native mobile SDKs (Java / Android and Swift / iOS). For UI/UX, <Anchor href="https://material.google.com/" label="Material Design"/> is bae. Lest I forget, my soft skill level, an astute Human Resource Manager <img src="http://emojipedia-us.s3.amazonaws.com/cache/fe/9f/fe9fd3657ed6faa5319f5357b2de48eb.png" style={{height: '14px'}} title="Boss"/>.</small></p>
        <p><small><img src="http://emojipedia-us.s3.amazonaws.com/cache/10/46/1046faae6fca73fff175423593ed5ef0.png" style={{height: '12px'}}/> Calisthenics und JavaScript über alle.</small></p>
        <br/>
        <h4>Contact</h4>
        <p><i className={classnames('fa', 'fa-envelope-o', styles.marginRight)}></i><a href='mailto:godson.ukpere@gmail.com'>godson.ukpere@gmail.com</a></p>
        <p><i className={classnames('fa', 'fa-phone', styles.marginRight)}></i><a href='tel:+234-809-613-2990'>+234-809-613-2990</a></p>
        <p><i className={classnames('fa', 'fa-skype', styles.marginRight)}></i><a href='skype:godson.ukpere'>godson.ukpere</a></p>
        <br/>
        {this.props.content ?
          <div>
            <h4>{this.props.content.title}</h4>
            <p><small>{this.props.content.text}</small></p>
          </div> :
          <CircularProgress color="#009090" size={0.2} title="Something might load here"/>
        }
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
