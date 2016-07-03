import React from 'react';
import ReactTooltip from 'react-tooltip';
import LinearProgress from 'material-ui/LinearProgress';

import styles from '../../App.css';


export default class Proficiency extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = (item, index) => {
      return (
        <div className={styles.proficiency} key={index}>
          <span data-tip={item.title}>{item.language}</span>
          <LinearProgress color="#555" mode="determinate" value={item.score}/>
        </div>
      );
    };

    return (
      <div>
        {this.props.items.map(renderItem)}
        <ReactTooltip delayShow={250} />
      </div>
    );
  }
}

Proficiency.propTypes = {
  items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        language: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired
      })
    )
};
