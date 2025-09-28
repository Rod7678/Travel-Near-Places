import { useRef, useState } from 'react'
import logo from './assets/logo.png'
import { AVAILABLE_PLACES } from './data.js'
import Places from './components/Places.jsx'
import Modal from './components/Modal.jsx'
import ConfirmDeletion from './components/ConfirmDeletion.jsx'

function App() {
  const modal = useRef()
  const selectedPlace =  useRef()
  const [pickedPlaces, setPickedPlaces] = useState([]);

  function handleStartRemove(id){
    modal.current.open();
    selectedPlace.current = id;
  }
  
  function handleStopRemoval(){
    modal.current.close()
  }

  function handleSelectPlace(id){
    setPickedPlaces((prevSelected)=>{
      if(prevSelected.some((place)=>place.id === id)){
        return prevSelected;
      }

      const place = AVAILABLE_PLACES.find((place)=> place.id === id);
      return [place, ...prevSelected];
    })
  }

  function handeleRemovePlace(){
    setPickedPlaces((prevPickedPlace)=>
      prevPickedPlace.filter((place)=>place.id !== selectedPlace.current)
    )
    modal.current.close();
  }

  return (
    <>
    <Modal ref={modal}>
      <ConfirmDeletion onConfirm={handeleRemovePlace} onCancel={handleStopRemoval}/>
    </Modal>
    <header>
      <img src={logo} alt="Styled globe" />
      <h1>placepicker</h1>
      <p>Create your personal collection of places you would like to visit or you have visited.</p>
    </header>
    <main>
      <Places title="I'd like to visit . . . "
      places={pickedPlaces}
      fallbackText={'Select the places you would like to visit below.'}
      onSelectPlace={handleStartRemove}
      />
      <Places 
      title="Available Places"
      places={AVAILABLE_PLACES}
      fallbackText={'Showing places according to places..'}
      onSelectPlace ={handleSelectPlace}
      />
    </main>
    </>
    )
}

export default App
