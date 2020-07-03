import React, { Component } from 'react';
import { joinClasses } from './../util';
import './Flex.scss';

interface IProps {
  wrap?: Boolean,
  align?: String,
  basis?: String,
  direction?: String,
  justify?: String,
  grow?: Number,
  shrink?: Number,
  className?: String,
  children?: any,
  style?: any,
  inline?: Boolean,
  onClick?: any
}

class Flex extends Component<IProps, any> {
  render () {
    const {
      wrap = false,
      align = 'left',
      basis = 'auto',
      direction = 'column',
      justify = 'start',
      grow = 1,
      shrink = 1,
      className,
      children,
      style,
      inline = false,
      onClick
    } = this.props;
    return (
      <div
        style={{ flex: `${grow} ${shrink} ${basis}`, ...style }}
        onClick={onClick}
        className={joinClasses(
          inline ? 'inline-flex' : 'flex',
          className,
          align ? `align-${align}` : null,
          !wrap ? 'no-wrap' : 'flex-wrap',
          direction === 'row' ? 'direction-row' : 'direction-column',
          justify ? `justify-${justify}` : null
        )}>
        {children}
      </div>
    );
  }
}

export default Flex;
