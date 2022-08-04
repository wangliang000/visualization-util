import React, { memo, useMemo, useRef } from 'react';
import DragBox from '../components/DragBox';
import { useDrop } from 'react-dnd';
import './index.css';
import { ItemTypes } from '../constants';

const tools = [{ type: 'component', title: '组件' }];

const LeftBar = ({ box, moveBox }) => {
  const ref = useRef();
  const renderTools = useMemo(() => {
    return (
      <>
        {tools.map((_t) => {
          return (
            <div className="tool" key={_t.type}>
              {_t.title}
            </div>
          );
        })}
      </>
    );
  }, []);
  return (
    <div className="left-wrap">
      <div className="left-bar">{renderTools}</div>
      <div className="left-component">
        <div>组件</div>
        <div className="left-component-list">
          {box.map((b, index) => (
            <DragBox item={b} key={b.id} index={index} moveBox={moveBox} />
          ))}
        </div>
        <div>{true ? '可以' : '不可以'}</div>
      </div>
    </div>
  );
};

export default memo(LeftBar);
