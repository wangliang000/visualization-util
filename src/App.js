import { useCallback, useState } from 'react';
import LeftBar from './LeftBar';
import Middleware from './Middleware';
import './App.css';

function App() {
  const [box, setBox] = useState([
    { id: 1, title: '组件1' },
    { id: 2, title: '组件2' },
    { id: 3, title: '组件3' },
    { id: 4, title: '组件4' },
  ]);
  const moveBox = useCallback(
    (dragIndex, hoverIndex) => {
      const dragBox = box[dragIndex];
      const hoverBox = box[hoverIndex];
      const cloneBox = [...box];
      cloneBox[dragIndex] = hoverBox;
      cloneBox[hoverIndex] = dragBox;
      setBox(cloneBox);
    },
    [box],
  );
  return (
    <div className="container">
      <div className="left">
        <LeftBar box={box} moveBox={moveBox} />
      </div>
      <Middleware box={box} />
      <div className="configure"></div>
    </div>
  );
}

export default App;
