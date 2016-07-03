import React from 'react';
import styles from '../../App.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Dialog from './CustomDialog.jsx';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      item: {
        title: '',
        urls: [],
        description: '',
        image: '',
        stack: ''
      }
    };
  }

  handleClick(i) {
    this.setState({
      item: this.props.items[i]
    });
  }

  render() {
    const renderItem = (item, index) => {
      const boundTap = this.handleClick.bind(this, index);
      return (
          <ListItem
              key={index}
              leftAvatar={<Avatar src={item.image} style={{backgroundColor: '#eee'}} />}
              onTouchTap={boundTap}
              primaryText={<b style={{color: '#333'}}>{item.title}</b>}
              secondaryText={
                <p style={{color: '#777'}}>
                  {item.description}
                </p>
              }
              secondaryTextLines={2}
          />
      );
    };

    return (
      <div>
          <Dialog item={this.state.item} />
          <div className={styles.portfolio}>
            <List>
              {this.props.items.map(renderItem)}
            </List>
          </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        description: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        stack: React.PropTypes.string.isRequired,
        urls: React.PropTypes.arrayOf(React.PropTypes.string.isRequired)
      })
    )
};
