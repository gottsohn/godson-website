import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import ReactTooltip from 'react-tooltip';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color || '#009090',
      size: props.size || 0.5,
      'data-tip': props.title || ''
    };
  }

  render() {
    return (
        <div>
          <CircularProgress
              {...this.state}
          />
          <ReactTooltip />
        </div>
    );
  }
}

Loading.propTypes = {
  color: React.PropTypes.string,
  size: React.PropTypes.number,
  title: React.PropTypes.string
};
