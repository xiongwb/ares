import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

class Viewfinder extends Component {
  constructor(props) {
    super(props);

    this.getBackgroundColor = this.getBackgroundColor.bind(this);
    this.getSizeStyles = this.getSizeStyles.bind(this);
    this.getEdgeSizeStyles = this.getEdgeSizeStyles.bind(this);
  }

  getBackgroundColor() {
    return ({
      backgroundColor: this.props.backgroundColor,
    });
  }

  getEdgeColor() {
    return ({
      borderColor: this.props.color,
    });
  }

  getSizeStyles() {
    return ({
      height: this.props.height,
      width: this.props.width,
    });
  }

  getEdgeSizeStyles() {
    return ({
      height: this.props.borderLength,
      width: this.props.borderLength,
    });
  }

  render() {
    return (
        <View style={[styles.viewfinder, this.getBackgroundColor(), this.getSizeStyles(),{left: this.props.left, top: this.props.top}]}>
          <View style={[
            this.getEdgeColor(),
            this.getEdgeSizeStyles(),
            styles.topLeftEdge,
            {
              borderLeftWidth: this.props.borderWidth,
              borderTopWidth: this.props.borderWidth,
            }
          ]} />
          <View style={[
            this.getEdgeColor(),
            this.getEdgeSizeStyles(),
            styles.topRightEdge,
            {
              borderRightWidth: this.props.borderWidth,
              borderTopWidth: this.props.borderWidth,
            }
          ]} />
          <View style={[
            this.getEdgeColor(),
            this.getEdgeSizeStyles(),
            styles.bottomLeftEdge,
            {
              borderLeftWidth: this.props.borderWidth,
              borderBottomWidth: this.props.borderWidth,
            }
          ]} />
          <View style={[
            this.getEdgeColor(),
            this.getEdgeSizeStyles(),
            styles.bottomRightEdge,
            {
              borderRightWidth: this.props.borderWidth,
              borderBottomWidth: this.props.borderWidth,
            }
          ]} />
        </View>
    );
  }
};

Viewfinder.propTypes = {
  backgroundColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderLength: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Viewfinder.defaultProps = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderLength: 30,
  color: 'white',
  height: 200,
  width: 200,
};

var styles = StyleSheet.create({
  viewfinder: {
    position: "absolute",
    zIndex: -2,
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

module.exports = Viewfinder;
