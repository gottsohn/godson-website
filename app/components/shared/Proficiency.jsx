import React from 'react';
import styles from '../../App.css';
import LinearProgress from 'material-ui/LinearProgress';

export default class Proficiency extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = (item) => {
      return (
        <div className={styles.proficiency}>
          <span>{item.language}</span>
          <LinearProgress mode="determinate" value={item.score} color="#fff"/>
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
  items: React.PropTypes.array.isRequired
};
