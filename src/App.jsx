import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import { AVAILABLE_PLACES } from './data.js'
import Places from './components/Places.jsx'
import Modal from './components/Modal.jsx'
import ConfirmDeletion from './components/ConfirmDeletion.jsx'
import { sortPlacesByDistance } from './loc.js'


const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedSelectedPlace = storedIds.map((id)=>
  AVAILABLE_PLACES.find((place) => place.id === id)
)

function App() {
  const modal = useRef()
  const selectedPlace =  useRef()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storedSelectedPlace);


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

      setAvailablePlaces(sortedPlaces);
    })
  })

  function handleStartRemove(id){
    setModalIsOpen(true);
    selectedPlace.current = id;
  }
  
  function handleStopRemoval(){
    setModalIsOpen(false)
  }

  function handleSelectPlace(id){
    setPickedPlaces((prevSelected)=>{
      if(prevSelected.some((place)=>place.id === id)){
        return prevSelected;
      }

      const place = AVAILABLE_PLACES.find((place)=> place.id === id);
      return [place, ...prevSelected];
    })

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if(storedIds.indexOf(id) === -1){
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }

  }

  function handeleRemovePlace(){
    setPickedPlaces((prevPickedPlace)=>
      prevPickedPlace.filter((place)=>place.id !== selectedPlace.current)
    )
    setModalIsOpen(false)
    
    
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id)=> id !== selectedPlace.current)))
  }

  return (
    <>
    <Modal ref={modal} open={modalIsOpen} onClose={handleStopRemoval}>
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
      places={availablePlaces}
      fallbackText={'Showing places according to places..'}
      onSelectPlace ={handleSelectPlace}
      />
    </main>
    </>
    )
}

export default App
