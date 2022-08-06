import React, { memo, useMemo } from 'react';
import DragBox from '../components/DragBox';
import './index.css';

const tools = [{ type: 'component', title: '组件' }];

const LeftBar = ({ box, moveBox }) => {
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
            <DragBox
              item={b}
              action="leftBox"
              id={b.id}
              moveBox={moveBox}
              key={b.id}
              index={index}
            />
          ))}
        </div>
        <div>{true ? '可以' : '不可以'}</div>
      </div>
    </div>
  );
};

export default memo(LeftBar);
