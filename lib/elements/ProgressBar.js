import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressBarWrapper = styled.div`
  & .progress-bar {
    width: ${props => props.width};
    overflow: hidden;
  }
  & .progress-bar__bar {
    border-radius: 0px;
    background-color: ${props => props.barColor};
    margin-bottom: 14px;
    transition: all 1s ease-in;
  }
  & .progress-bar__progress {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 45px;
    border-radius: 0px;
    background-color: ${props => props.bgColor};
    transform: translateX(-100%);
    transition: all 1.5s ease-in-out;
  }
  & .progress-bar__labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
  }
  & .progress-bar__label {
    display: block;
    font-size: 16px;
    text-align: center;
    color: $black;
  }
  & .progress-bar__label--right {
    text-align: right;
  }
`;

class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      textVal: 0,
      val: 0
    };
  }
  
  componentDidMount() {
    const { val = 0 } = this.props;
    setTimeout(() => {
      this.setState({ progress: val });
    }, 0);
    this.animateValue("value", 0, val, 1500);
  }

  onChange(e) {
    this.setState({ 
      progress: e.currentTarget.value,
      textVal: e.currentTarget.value
    });
  };

  animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var self = this;
    var timer = setInterval(function() {
      self.setState({ textVal: current += increment });
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  render() {
    const { width, label, bgColor, barColor } = this.props;
    const { progress, textVal } = this.state;
    return (
      <ProgressBarWrapper
        barColor={barColor}
        bgColor={bgColor}
        width={width}
      >
        <div className="progress-bar">
          <div className="progress-bar__labels">
            <span className="progress-bar__label">
              {label}
            </span>
            <span className="progress-bar__label">
              {`${textVal}%`}
            </span>
          </div>
          <div className="progress-bar__bar">
            <div
              className="progress-bar__progress"
              style={{ transform: `translateX(${progress}%)` }}
            />
          </div>
        </div>
      </ProgressBarWrapper>
    );
  }
}

ProgressBar.propTypes = {
  barColor: PropTypes.string,
  bgColor: PropTypes.string,
  label: PropTypes.string,
  val: PropTypes.number.isRequired,
  width: PropTypes.string,
};

ProgressBar.defaultProps = {
  barColor: '#69F4CA',
  bgColor: '#EEE',
  label: '',
  width: '100%',
};

export default ProgressBar;
