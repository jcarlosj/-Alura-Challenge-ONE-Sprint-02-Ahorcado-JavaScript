function showConsole( message, data ) {
    console.group( message );
    console.info( data );
    console.groupEnd();
}

/** Eventos click en los botones */
function buttonEvents( game ) {
    const
        anio = document.querySelector( '.anio' ),
        sectionHome = document.querySelector( '.home' ),
        sectionNewWord = document.querySelector( '.new-word' ),
        sectionGame = document.querySelector( '.game' ),
        btnStart = document.querySelector( '.btn-start' ),
        btnAddWord = document.querySelector( '.btn-add-word' ),
        btnSave = document.querySelector( '.btn-save' ),
        btnCancel = document.querySelector( '.btn-cancel' ),
        btnNewGame = document.querySelector( '.btn-new-game' ),
        btnDesist = document.querySelector( '.btn-desist' ),
        newWord = document.querySelector( '#textarea' ),
        bodyEl = document.querySelector( 'body' );

    anio.innerHTML = new Date().getFullYear();

    const captureKey = event => {
        game.captureKey( event );
    }

    btnStart.addEventListener( 'click', () => {
        sectionHome.style.display = 'none';
        sectionGame.style.display = 'block';
        
        bodyEl.addEventListener( 'keydown', captureKey );
        game.selectWord();
        showConsole( 'Start Game!', game.wordSelected );
    });

    btnAddWord.addEventListener( 'click', () => {
        sectionHome.style.display = 'none';
        sectionNewWord.style.display = 'block';
    });

    btnSave.addEventListener( 'click', () => {
        sectionNewWord.style.display = 'none';
        sectionGame.style.display = 'block';

        game.addWord( newWord.value );
        showConsole( 'Save and Start Game!', `${ game.isStarted } - ${ game.wordSelected }`  );
    });

    btnCancel.addEventListener( 'click', () => {
        sectionNewWord.style.display = 'none';
        sectionHome.style.display = 'flex';
    });

    btnNewGame.addEventListener( 'click', () => {
        bodyEl.addEventListener( 'keydown', captureKey );
        game.selectWord();
        showConsole( 'New Game!', `${ game.isStarted } - ${ game.wordSelected }` );
    });

    btnDesist.addEventListener( 'click', () => {
        sectionGame.style.display = 'none';
        sectionHome.style.display = 'flex';

        bodyEl.removeEventListener( 'keydown', captureKey, false );
        game.desist();
        game.stop();
        showConsole( 'Desist Game!', `${ game.isStarted } - ${ game.wordSelected }` );
    });
}

/** Dibujando el Ahorcado */
function hangmanDrawing() {
    const 
        canvasEl = document.querySelector( '.canvas-layout' ),
        ctx = canvasEl.getContext( '2d' );

    ctx.fillStyle = 'transparent';
    ctx.fillRect( 0, 0, 400, 600 ); 

    gallowsBase( ctx );
    gallowsPost( ctx );
    gallowsCrossbar( ctx );
    gallowsNoose( ctx );
    handedHead( ctx );
    handedBody( ctx );
    hangedLeftLeg( ctx );
    hangedRightLeg( ctx );
    hangedLeftArm( ctx );
    hangedRightArm( ctx );
}

function hangedLeftArm( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 275 );
    ctx.lineTo( 225, 355 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function hangedRightArm( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 275 );
    ctx.lineTo( 325, 355 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function hangedLeftLeg( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 355 );
    ctx.lineTo( 225, 465 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function hangedRightLeg( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 355 );
    ctx.lineTo( 325, 465 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function handedBody( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 260 );
    ctx.lineTo( 275, 355 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function handedHead( ctx ) {
    let 
        radius = 40,
        centerX = 275,
        centerY = 220;

    ctx.beginPath();
    ctx.arc( 275, 220, radius, 0, 2 * Math.PI, false );
    ctx.fillStyle = 'transparent';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function gallowsNoose( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 275, 75 );
    ctx.lineTo( 275, 175 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function gallowsCrossbar( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 75, 75 );
    ctx.lineTo( 275, 75 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function gallowsPost( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 75, 75 );
    ctx.lineTo( 75, 500 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}
function gallowsBase( ctx ) {
    ctx.beginPath();
    ctx.moveTo( 25, 500 );
    ctx.lineTo( 375, 500 );
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A3871';
    ctx.stroke();
}

/** Agregar palabras */
class Game {
    words = [];
    wordSelected = '';
    isStarted = false;
    wrongCharacters = new Set();

    constructor( words = [] ) {
        this.words = words.map( word => word.toLowerCase() );
    }
    
    /** Seleccionar palabra secreta de forma aleatoria */
    selectWord() {
        this.desist();

        let
            arrayLength = this.words.length - 1,
            wordSelected = this.words[ Math.round( Math.random() * arrayLength ) ];
        
        this.wordSelected = wordSelected;
        this.showCharacter = Array( this.wordSelected.length ).fill( false );
        this.start();
    }

    /** Elimina palabra secreta seleccionada */
    desist() {
        this.wordSelected = '';
    }

    /** Agrega una nueva palabra secreta */
    addWord( newWord ) {
        this.words = [ ...this.words, newWord.toLowerCase() ];
    }

    /**  */
    start() {
        this.isStarted = true;
        this.showWord();
        this.showWrongCharacters();
    }

    stop() {
        this.isStarted = false;
    }

    captureKey( event ) {
        const wrongCharactersEl = document.querySelector( '#wrong-characters' );
        const separateWord = this.wordSelected.split( '' );
        let found = false;
        
        separateWord.forEach( ( char, index ) => {
            if( char === event.key ) {
                this.showCharacter[ index ] = true;
                found = true;
            }
            
            if( ! found )
                // TODO: Listado caracteres errados, no esta filtrado correctamente
                this.wrongCharacters.add( event.key );
            
        });

        console.log( separateWord );
        console.log( this.showCharacter );
        console.log( this.wrongCharacters );

        this.showWord();
        this.showWrongCharacters();
    }

    showWord() {
        const secretWordEl = document.querySelector( '#secret-word' );

        console.log( this.showCharacter );
        secretWordEl.innerHTML = '';

        for( let i = 0; i < this.wordSelected.length; i++ ) {
            let liEl = document.createElement( 'li' );

            liEl.classList.add( 'character' );

            /** Valida si es un espacio y agrega una clase al elemento */
            if( this.wordSelected[ i ] === ' ' ) {
                liEl.classList.add( 'space' );
                this.showCharacter[ i ] = true;
            }

            /** Valida si el caracter se ha adivinado para ser mostrado */
            if( this.showCharacter[ i ] ) 
                liEl.textContent = this.wordSelected[ i ];
            else
                liEl.textContent = '';

            secretWordEl.appendChild( liEl );
        }

        console.log( this.showCharacter );

    }

    showWrongCharacters() {
        const wrongCharactersEl = document.querySelector( '#wrong-characters' );

        wrongCharactersEl.innerHTML = '';

        this.wrongCharacters.forEach( char => {
            let liEl = document.createElement( 'li' );

            liEl.classList.add( 'wrong-character' );
            liEl.textContent = char;
            wrongCharactersEl.appendChild( liEl );
        });
        
        console.log( this.wrongCharacters );
        
    }

}



/** IIFE: Inicio app */
( function () {
    const game = new Game( [
        'FullStack JavaScript',
        'Responsive Design',
        'Angular'
    ]);

    buttonEvents( game );
    hangmanDrawing();
})();