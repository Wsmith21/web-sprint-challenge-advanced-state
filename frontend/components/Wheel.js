import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

const Wheel = ({ position, moveClockwise, moveCounterClockwise }) => {
  const nextPosition = (position + 1) % 6;
  const prevPosition = (position + 5) % 6;

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`cog ${position === i ? 'active' : ''} ${position === 0 && i === 5 ? 'first' : ''}`}
            style={{ "--i": i }}
          >
            {position === i ? 'B' : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={moveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  position: state.wheel,
});

const mapDispatchToProps = (dispatch) => ({
  moveClockwise: bindActionCreators(moveClockwise, dispatch),
  moveCounterClockwise: bindActionCreators(moveCounterClockwise, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);