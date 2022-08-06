import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';
import './index.css';

const DragBox = ({ item, id, index, action, moveBox }) => {
  const ref = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DragBox,
    item: { ...item, index, action },
    end: (item, monitor) => {
      if (!monitor.didDrop) {
        moveBox({ dragId: item.id, action: item.action, hoverId: id });
      }
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  }));
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.DragBox,
      hover: (item, monitor) => {
        // moveBox({ dragId: item.id, action: item.action, hoverId: id });
      },
      drop: (item, monitor) => {
        // moveBox({ dragId: item.id, action: item.action, hoverId: id });
      },
    }),
    [moveBox, id],
  );
  drop(drag(ref));
  return (
    <div
      className="component"
      style={{ opacity: isDragging ? 0.4 : 1 }}
      ref={ref}
      key={item.id}
      id={item.id}
    >
      {item.title}
    </div>
  );
};

export default memo(DragBox);
