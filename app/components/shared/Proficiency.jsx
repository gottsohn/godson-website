import React from 'react';
import styles from '../../App.css';
import LinearProgress from 'material-ui/LinearProgress';

export default class Proficiency extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = (item, index) => {
      return (
        <div className={styles.proficiency} key={index}>
          <span>{item.language}</span>
          <LinearProgress color="#009090" mode="determinate" value={item.score}/>
        </div>
      );
    };

    return (
      <div>
        {this.props.items.map(renderItem)}
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
