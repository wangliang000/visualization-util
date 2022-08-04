import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';
import './index.css';

const DragBox = ({ item, index, moveBox }) => {
  const ref = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'b',
    item: { ...item, index },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  }));
  const [, drop] = useDrop(() => ({
    accept: 'b',
    item: item,
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const { top, bottom } = ref.current.getBoundingClientRect();
      const { y } = monitor.getClientOffset();
      const itemHashHeight = (bottom - top) / 2;
      const dragL = y - top;
      // if (
      //   (dragIndex < hoverIndex && dragL > 0 && dragL > itemHashHeight) ||
      //   (dragIndex > hoverIndex && dragL > 0 && dragL < itemHashHeight)
      // ) {
      moveBox(dragIndex, hoverIndex);
      // item.index = hoverIndex;
      // }
    },
    collect: (monitor) => {},
  }));
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
