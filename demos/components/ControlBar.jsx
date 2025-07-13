import { Popover } from 'bootstrap';
import React, { useLayoutEffect } from 'react';
import { FaUndo, FaRedo, FaBroom, FaQuestion } from 'react-icons/fa';

export default function ControlBar(props) {
  useLayoutEffect(() => {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]',
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new Popover(popoverTriggerEl),
    );

    return () => {
      popoverList.forEach((popover) => {
        popover.dispose();
      });
    };
  }, []);
  return (
    <div style={props.style} className="ml-2 btn-group-vertical" role="group">
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
        data-bs-trigger="focus"
        data-bs-toggle="popover"
        data-bs-title={props.helpTitle}
        data-bs-content={props.help}
        name="explain"
        type="button"
        className="btn btn-secondary"
      >
        <FaQuestion />
      </button>
    </div>
  );
}
