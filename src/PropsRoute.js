import React from 'react';
import {Route} from 'react-router-dom';

      const renderMergedProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return React.createElement(component, finalProps);
      };

export default ({component, ...rest}) => {
  return <Route {...rest} render={(routeProps) => renderMergedProps(component, routeProps, rest)}/>;
};
