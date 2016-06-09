import React from 'react';
import styles from '../../App.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = (item) => {
      return (
        <div className={styles.portfolio}>
        <List>
          <ListItem
            leftAvatar={<Avatar src={item.image} />}
            primaryText={<b>{item.title}</b>}
            secondaryText={
              <p style={{color: '#fff'}}>
                {item.description}
              </p>
            }
            secondaryTextLines={4}
          />
        </List>
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

Portfolio.propTypes = {
  items: React.PropTypes.array.isRequired
};
