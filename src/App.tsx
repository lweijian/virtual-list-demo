import './App.css'
import FixedHeightVirtualList  from './components/VirtualList/FixedHeight'
import NotFixedHeightVirtualList  from './components/VirtualList/NotFixedHeight'
function App() {

  return (
    <div className="App">
      <FixedHeightVirtualList/>
        <NotFixedHeightVirtualList/>
    </div>
  )
}

export default App
