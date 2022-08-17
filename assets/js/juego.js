// 2C = Two of Clubs (Trebol)
// 2D = Two of Diaminds (Diamantes)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K']

    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevojuego = document.querySelector('#btnNuevojuego');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        puntosJugadores=[];
        for(let i=0; i < numJugadores;i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText=0);
        divCartasJugadores.forEach(elem => elem.innerHTML='');
        
        btnDetener.disabled=false;
        btnPedir.disabled  =false;
        
    }

    //Esta funcion crea una nueva baraja
    const crearDeck = () => {

        deck=[];
        for ( let i=2; i<=10; i++){
            for (let tipo of tipos){
                deck.push(i+tipo);
            }
            
        }

        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp+tipo);
            }
        }
        
        return _.shuffle(deck);
        
    }

    //Esta funcion me permite tomar una carta

    const pedircarta = () =>{

        if (deck.length===0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    //esta funcion sirve para obtener el valor de la carta 

    const valorCarta=(carta) => {
        const valor = carta.substring(0, carta.length-1);
        return (!isNaN(valor))?valor*1:
                (valor==='A')?11:10; 
    }

    //Turno: 0 = Primer Jugador y el Ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{

        puntosJugadores[turno] = puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText= puntosJugadores[turno];
        return puntosJugadores[turno] ;
    }

    
    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src= `assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador =() =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(()=>{

        let resultado = (puntosMinimos === puntosComputadora) ? 'Nadie Gano'
                : puntosMinimos > 21 ? 'Gano Computadora'
                : puntosComputadora > 21  ? 'Gano Jugador' 
                : puntosMinimos > puntosComputadora ? 'Gano Jugador'
                : 'Gano Computadora' ;
        
        alert(resultado);
        //console.log(resultado);

        },20);
    }

    //turno compputadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
            const carta = pedircarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);
            
            if(puntosMinimos>21){
                break;
            }    

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));

        determinarGanador();

    }

    //Eventos
    btnPedir.addEventListener('click',()=>{
        const carta = pedircarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta,0);


        if (puntosJugador>21){
    
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        } else if(puntosJugador===21){

            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }

        
    });

    btnDetener.addEventListener('click',()=>{
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugadores[0]);
    });

    // btnNuevojuego.addEventListener('click',()=>{
    //     inicializarJuego();

    // });

    return {
        nuevoJuego: inicializarJuego    
    };
})();







