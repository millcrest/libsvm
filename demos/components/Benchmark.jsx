import React, { Component } from 'react';
import Worker from '../../benchmark/worker?worker';

export default class Benchmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasmTime: '-',
    };
  }

  componentDidMount() {
    this.worker = new Worker();
    this.worker.onmessage = (event) => {
      if (event.data.method !== 'wasm') {
        throw new Error('wrong method');
      }
      this.setState({
        wasmTime: event.data.result,
      });
    };
  }

  onRun() {
    this.worker.postMessage({
      benchmark: this.props.benchmark,
      method: 'wasm',
      time: 5,
    });
    this.setState({
      wasmTime: 'sent',
    });
  }

  render() {
    const { wasmTime } = this.state;
    const disabled = asmTime === 'running' || wasmTime === 'running';
    let AsmRender = getResultComponent(asmTime);
    let WasmRender = getResultComponent(wasmTime);

    const Description = this.props.description || (() => null);
    return (
      <div>
        <hr />
        <h3>{this.props.name}</h3>
        <Description />
        <div style={{ lineHeight: '32px', display: 'flex' }}>
          wasm: &nbsp; <WasmRender /> &nbsp;
          <input
            type="button"
            className="btn btn-info"
            value="Run"
            onClick={this.onRun.bind(this)}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

function getResultComponent(time) {
  switch (time) {
    case 'running':
      return () => <MySpinner />;
    case 'sent':
      return () => <div />;
    default:
      return () => <div>{time}</div>;
  }
}

// TODO: replace with actual loading animation
function MySpinner() {
  return (
    <div style={{ display: 'inline-block', height: 24, width: 24 }}>
      <div style={{ width: 24, height: 24 }}>L</div>
    </div>
  );
}
