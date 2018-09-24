import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CircularSvg = styled.svg`
  height: ${props => props.height};
  width: ${props => props.width};

  & .circle-background,
    .circle-progress {
      fill: none;
    }

  & .circle-background {
      stroke: ${props => props.bgColor || '#EEE'};
    }

   & .circle-progress {
      stroke: ${props => props.barColor || '#69F4CA'};
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: all 1s ease-in;
    }
    
  &  .circle-text {
      font-size: 3em;
      fill: #191919;
    }
`;

class ProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      textVal: 0,
    };
  }

  componentDidMount() {
    const { val } = this.props;
    var self = this;
    setTimeout(() => {
      self.setState({ percentage: val });
    }, 0);
    this.animateValue("value", 0, val, 1000);
  }

  animateValue (id, start, end, duration) {
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
    const {
      barColor,
      bgColor,
      sqSize,
      strokeWidth,
    } = this.props;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.state.percentage / 100;
    
    return (
      <CircularSvg
        barColor={barColor}
        bgColor={bgColor}
        height={sqSize}
        viewBox={viewBox}
        width={sqSize}
      >
        <circle
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        />
        <text
          className="circle-text"
          dy=".3em"
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {`${this.state.textVal}%`}
        </text>
      </CircularSvg>
    );
  }
}

ProgressCircle.propTypes = {
  barColor: PropTypes.string,
  bgColor: PropTypes.string,
  sqSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  val: PropTypes.number,
};

ProgressCircle.defaultProps = {
  barColor: '#69F4CA',
  bgColor: '#EEE',
  sqSize: 200,
  strokeWidth: 10,
  val: 0,
};

export default ProgressCircle;
