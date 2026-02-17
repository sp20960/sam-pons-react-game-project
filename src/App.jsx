import { use, useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetch';
import './App.css'
import Carta from './components/Carta';
import 'animate.css';
import video from './assets/9807882-uhd_2160_3840_25fps.mp4'
import { getCards } from './api/get-cards';

function App() {

  const [cartas, setCartas] = useState([]);
  const [turnos, setTurnos] = useState(0);
  const [eleccionUno, setEleccionUno] = useState(null);
  const [eleccionDos, setEleccionDos] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [imagenesCartas, setImagenesCartas] = useState([])

  const cuponGanador = "34RFS";

  useEffect(() => {
    async function setCards (){
      const cards = await getCards();
      setImagenesCartas(cards);
    }
    setCards();
  }, [])

  const barajar = () => {
    const cartasBarajadas = [...imagenesCartas, ...imagenesCartas]
    .sort(() => Math.random() -0.5)
    .map((carta) =>({...carta, id:Math.random()}));

    setCartas(cartasBarajadas);
    setTurnos(0);
    !showCards ? setShowCards(true) : setShowCards(true)
  }

  const handleEleccion = (carta) => {
    eleccionUno ? setEleccionDos(carta) : setEleccionUno(carta);
  }

  const resetear = () => {
    setEleccionUno(null);
    setEleccionDos(null);
    setTurnos(turnosPrevios => turnosPrevios + 1);
    setDeshabilitado(false);
  }

  const handleAnchorClick = () => {
    const modalWin = document.getElementById('modal-win');
    modalWin.style.display = "none";

  }

  useEffect(() => {
    if(eleccionUno && eleccionDos){
      setDeshabilitado(true);

      if(eleccionUno.src === eleccionDos.src){
        setCartas(cartasPrevias => {
          return cartasPrevias.map((cartaPrevia) =>{
            if(cartaPrevia.src == eleccionUno.src){
              return {...cartaPrevia, "encontrada" : true}
            } else {
              return cartaPrevia;
            }
          })
        });
        resetear();
      } else {
        setTimeout(() => {
            resetear(); 
        }, 500)
      }  
    }
  }, [eleccionUno, eleccionDos])

  useEffect(() => {
    if(cartas.length > 0 && cartas.every(c => c.encontrada === true)){
      console.log("ganado")
      const modalWin = document.getElementById('modal-win');
      modalWin.style.opacity = "1"
      modalWin.style.display = "flex"
      modalWin.classList.add('animate__zoomIn');
      localStorage.setItem("cupon", cuponGanador)
    }
  }, [cartas])

  return (
    <div className='App'>

      <section id="modal-win" className='animate__animated'>
        <div>
          <h1>¡Has ganado!</h1>
          <p>Cúpon 5%: <span>{cuponGanador}</span></p>
          <a onClick={() => handleAnchorClick} href="https://remotehost.es/student023/shop/">Volver a la tienda</a>
        </div>
      </section>

      <video className='video' autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>

      {!showCards &&
        <div className='title-game animate__animated animate__zoomIn'>
          <div className='title'>
            <h1>Riff Store Card Game</h1>
          </div>
          <button onClick={() => barajar()} className="glow-on-hover" type="button">Nueva partida</button>
        </div>
      }
     
     { showCards &&
      <div className='container-grid animate__animated animate__fadeIn'>
        <div className='grid-carta'>
          {
          cartas.map((carta) => (
            <Carta 
            carta={carta}  
            key={carta.id} 
            handleEleccion={handleEleccion}
            volteada={carta===eleccionUno || carta===eleccionDos || carta.encontrada}
            deshabilitado = {deshabilitado}
            />
          ))
          }
        
        </div>
       <div><p>Turnos {turnos}</p></div>
      </div>
      }
      
    </div>
  )
}

export default App
