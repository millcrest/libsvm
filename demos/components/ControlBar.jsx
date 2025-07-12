import React from 'react';
import { FaUndo, FaRedo, FaBroom, FaQuestion } from 'react-icons/fa';

export default function ControlBar(props) {
  return (
    <div
      style={props.style}
      className={`ml-2 btn-group${props.vertical ? ' btn-group-vertical' : ''}`}
      role="group"
    >
      <button
        name="undo"
        type="button"
        className="btn btn-secondary"
        onClick={props.undo}
        disabled={!props.canUndo}
      >
        <FaUndo />
      </button>
      <button
        name="redo"
        type="button"
        className="btn btn-secondary"
        onClick={props.redo}
        disabled={!props.canRedo}
      >
        <FaRedo />
      </button>
      <button
        name="clear"
        type="button"
        className="btn btn-secondary"
        onClick={props.clear}
      >
        <FaBroom />
      </button>
      <button
        title={props.helpTitle}
        data-content={props.help}
        name="explain"
        type="button"
        className="btn btn-secondary"
      >
        <FaQuestion />
      </button>
    </div>
  );
}
