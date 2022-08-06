import { useCallback, useState } from 'react';
import LeftBar from './LeftBar';
import Middleware from './Middleware';
import './App.css';
import { hover } from '@testing-library/user-event/dist/hover';

function App() {
  const [box, setBox] = useState([
    { id: 1, title: '组件1' },
    { id: 2, title: '组件2' },
    { id: 3, title: '组件3' },
    { id: 4, title: '组件4' },
  ]);
  const [showBox, setShowBox] = useState([]);
  const moveBox = useCallback(
    ({ dragId, action, hoverId }) => {
      console.log(showBox, 'showBox');
      if (action === 'leftBox') {
        const showBox = box.filter((b) => {
          const isDragBox = b.id === dragId;
          return isDragBox;
        });
        setShowBox((v) => [...v, ...showBox]);
      } else if (action === 'middleware') {
        setShowBox((v) => {
          const cloneShowBox = [...v];
          const dynamicBox = cloneShowBox.filter((b) => b.id === dragId)[0];
          const hoverBox = cloneShowBox.filter((b) => b.id === hoverId)[0];
          const result = cloneShowBox.map((b) => {
            if (b.id === dynamicBox) {
              return hoverBox;
            } else if (b.id === hoverId) {
              return dynamicBox;
            }
            return b;
          });
          return result;
        });
      }
    },
    [box, showBox],
  );
  console.log(showBox, 'showbox App');
  return (
    <div className="container">
      <div className="left">
        <LeftBar box={box} moveBox={moveBox} />
      </div>
      <Middleware box={showBox} moveBox={moveBox} />
      <div className="configure"></div>
    </div>
  );
}

export default App;
