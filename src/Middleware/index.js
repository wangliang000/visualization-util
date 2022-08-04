import React, { useRef } from 'react';
import { ItemTypes } from '../constants';
import { useDrop, useDrag } from 'react-dnd';

const Middleware = (props) => {
  const ref = useRef();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DragBox,
    drop: (item) => {
      console.log(item, 'item');
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const [, drag] = useDrag(() => ({
    type: ItemTypes.DragBox,
  }));
  drop(drag(ref));
  return (
    <div
      className="middleware"
      style={{ backgroundColor: isOver ? '#090' : 'unset' }}
      ref={ref}
    >
      12
    </div>
  );
};

export default Middleware;
