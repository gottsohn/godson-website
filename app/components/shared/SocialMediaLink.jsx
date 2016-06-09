import React from 'react';
import classnames from 'classnames';
import styles from '../../App.css';

export default class SocialMediaLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = (item) => {
      return (
          <a href={item.url} target="blank" className={styles.icon}>
            <i className={classnames('fa', item.className, 'fa-3x')}></i>
            <br/>
            <span> {item.username}</span>
          </a>
      );
    };

    return (
      <div>
        {this.props.items.map(renderItem)}
      </div>
    );
  }
}

SocialMediaLink.propTypes = {
  items: React.PropTypes.array.isRequired
};
