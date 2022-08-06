import React, { useRef } from 'react';
import { ItemTypes } from '../constants';
import { useDrop, useDrag } from 'react-dnd';
import DragBox from '../components/DragBox';
import './index.css';

const Middleware = ({ box, moveBox }) => {
  const ref = useRef();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DragBox,
    drop: (item) => {
      console.log(item, 'item');
      moveBox({ dragId: item.id, action: item.action });
    },
    hover: (item, monitor) => {
      // moveBox({ dragId: item.id, action: item.action });
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
      {box.length > 0
        ? box.map((b, index) => (
            <DragBox
              action="middleware"
              item={b}
              id={b.id}
              key={b.id}
              index={index}
            />
          ))
        : null}
    </div>
  );
};

export default Middleware;
