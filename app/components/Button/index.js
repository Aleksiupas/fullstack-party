/**
*
* Button
*
*/

import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      children,
      className,
      onClick,
      isLoading,
      outline,
    } = this.props;

    return (
      <button
        className={`btn${className ? ` ${className}` : ''}${isLoading ? ' btn-loading' : ''}${outline ? ' btn-outline' : ''}`}
        onClick={onClick}
      >{children}</button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  outline: PropTypes.bool,
};

export default Button;
