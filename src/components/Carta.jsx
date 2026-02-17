import "./Carta.css";

export default function Carta({carta, handleEleccion, volteada, deshabilitado}) {
  
  const handleClick = () => {
    if(!deshabilitado){
      handleEleccion(carta);
    }
  }

  return (
    <div className="carta">
      <div className={volteada ? "volteada" : ""}>
        <img className="delante" src={carta.src}/>
        <img className="detras" src="/src/assets/cubierta.png"
        onClick={handleClick}/>
      </div>
    </div>
  );
}
