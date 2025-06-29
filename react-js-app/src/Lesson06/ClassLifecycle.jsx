import React, { Component } from 'react';

export class ClassLifecycle extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor: Initializing state');
    this.state = { count: 0 };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps: Syncing state with props', nextProps, prevState);
    return null; // No state update
  }
  componentDidMount() {
    console.log('componentDidMount: Component mounted');
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: Deciding whether to update', nextProps, nextState);
    return true; // Always update
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate: Capturing snapshot before update', prevProps, prevState);
    return null; // No snapshot needed
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate: Component updated', prevProps, prevState, snapshot);
    console.log(`Count: ${this.state.count}`);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount: Cleaning up before unmounting');
    clearInterval(this.timer);
  }
  render() {
    return <div>ClassLifecycle</div>;
  }
}

export default ClassLifecycle;
