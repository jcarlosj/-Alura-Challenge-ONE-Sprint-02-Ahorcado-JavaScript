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

        function showMessage({ className = 'won-message', msg }) {
            const
                sectionClassGame = document.querySelector( '.main-content' ),
                pEl = document.createElement( 'p' ),
                spanBoxEl = document.createElement( 'span' ),
                spanMessageEl = document.createElement( 'span' );

            console.log( sectionClassGame );

            pEl.classList.add( 'won' );
            spanBoxEl.classList.add( 'won-box' );
            spanMessageEl.classList.add( className );
            spanMessageEl.textContent = msg;
            spanBoxEl.appendChild( spanMessageEl );

            pEl.appendChild( spanBoxEl );
            sectionClassGame.appendChild( pEl );

            bodyEl.removeEventListener( 'keydown', captureKey, false );
        }

        /** Verifica si hay ganador para eliminar el evento 'keydown' */
        if( game.isWinner() ) {
            showMessage({ msg: 'Ganaste Felicidades!' });
        }
        else {
            const gameOver = drawHangman( game.numberWrongLetters() );
            // console.log( gameOver );
            
            if( gameOver )
                showMessage({ msg: 'Final del juego!', nameClass: 'game-over' });
        }

    }

    btnStart.addEventListener( 'click', () => {
        sectionHome.style.display = 'none';
        sectionGame.style.display = 'block';
        
        bodyEl.addEventListener( 'keydown', captureKey );
        drawHangman( game.numberWrongLetters() );
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
        bodyEl.addEventListener( 'keydown', captureKey );
        drawHangman( game.numberWrongLetters() );
        game.selectWord();
        showConsole( 'Save and Start Game!', `${ game.isStarted } - ${ game.wordSelected }`  );
    });

    btnCancel.addEventListener( 'click', () => {
        sectionNewWord.style.display = 'none';
        sectionHome.style.display = 'flex';
    });

    btnNewGame.addEventListener( 'click', () => {
        bodyEl.addEventListener( 'keydown', captureKey );
        drawHangman( game.numberWrongLetters() );
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
function drawHangman( numberWrongLetters ) {
    let isFinished = false;
    const
        canvasEl = document.querySelector( '.canvas-layout' ),
        ctx = canvasEl.getContext( '2d' );
        hangman = {
            0: function() {
                ctx.fillStyle = 'transparent';
                ctx.fillRect( 0, 0, 400, 600 ); 

                draw( ctx, gallowsBase );
            },
            1: () => draw( ctx, gallowsPost ),
            2: () => draw( ctx, gallowsCrossbar ),
            3: () => draw( ctx, gallowsNoose ),
            4: () => draw( ctx, handedHead ),
            5: () => draw( ctx, handedBody ),
            6: () => draw( ctx, hangedRightLeg ),
            7: () => draw( ctx, hangedLeftLeg ),
            8: () => draw( ctx, hangedRightArm ),
            9: function() {
                draw( ctx, hangedLeftArm );
                isFinished = true;
            }
            // 9: () => draw( ctx, hangedLeftArm )
        };
    
    /** Valida que la longitud del array de letras erradas no supere el tamaño del objeto que lanza las funciones de dibujo */
    if( numberWrongLetters < Object.keys( hangman ).length ) {
        hangman[ numberWrongLetters ] ();
    }

    function draw( ctx, done ) {
        ctx.beginPath();
        done( ctx );
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0A3871';
        ctx.stroke();
    }

    function hangedLeftArm( ctx ) {
        ctx.moveTo( 220, 190 ); 
        ctx.lineTo( 180, 270 ); 
    }
    function hangedRightArm( ctx ) {
        ctx.moveTo( 220, 190 );
        ctx.lineTo( 260, 270 );
    }
    function hangedLeftLeg( ctx ) {
        ctx.moveTo( 220, 285 ); 
        ctx.lineTo( 180, 395 );
    }
    function hangedRightLeg( ctx ) {
        ctx.moveTo( 220, 285 ); 
        ctx.lineTo( 260, 395 );
    }
    function handedBody( ctx ) {
        ctx.moveTo( 220, 190 ); 
        ctx.lineTo( 220, 285 );
    }
    function handedHead( ctx ) {
        let 
            radius = 40,
            centerX = 275,
            centerY = 220;
    
        ctx.arc( 220, 147, radius, 0, 2 * Math.PI, false );
        ctx.fillStyle = 'transparent';
        ctx.fill();
    }
    function gallowsNoose( ctx ) {
        ctx.moveTo( 220, 3 );
        ctx.lineTo( 220, 103 );
    }
    function gallowsCrossbar( ctx ) {
        ctx.moveTo( 50, 3 );
        ctx.lineTo( 220, 3 );
    }
    function gallowsPost( ctx ) {
        ctx.moveTo( 50, 3 );
        ctx.lineTo( 50, 500 );
    }
    function gallowsBase( ctx ) {
        ctx.moveTo( 3, 500 );
        ctx.lineTo( 375, 500 );
    }

    return isFinished;
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
        this.wrongCharacters.clear();
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
        const
            separateWord = this.wordSelected.split( '' ),
            key = event.key.toLowerCase();
        let found = false;

        if( this.isAlphabetic( key ) ) {
            /** Itera todos los caracteres de la palabra secreta y valida si hay coincidencia con la entrada por teclado */
            separateWord.forEach( ( char, index ) => {
                if( char === key ) {
                    this.showCharacter[ index ] = true;
                    found = true;
                }
            });
    
            /** Valida si encontro alguna coincidencia */
            if( ! found )
                this.wrongCharacters.add( key );
    
            console.log( separateWord );
            console.log( this.showCharacter );
            console.log( this.wrongCharacters );
    
            this.showWord();
            this.showWrongCharacters();  
        }
        
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
                liEl.innerHTML = '&nbsp;';

            secretWordEl.appendChild( liEl );
        }

        console.log( this.showCharacter );

    }

    showWrongCharacters() {
        const wrongCharactersEl = document.querySelector( '#wrong-characters' );

        wrongCharactersEl.innerHTML = '';

        this.wrongCharacters.forEach( ( character ) => {
            let liEl = document.createElement( 'li' );

            liEl.classList.add( 'wrong-character' );
            liEl.textContent = character;
            wrongCharactersEl.appendChild( liEl );

        });
        
        console.log( this.wrongCharacters );
        console.log( wrongCharactersEl );
        
    }

    isAlphabetic( key ) {
        let letters = /^[a-zA-Z]$/;

        if( key.match( letters ) )
            return true;
        
        return false;
    }

    isCompleteWord() {

        return this.showCharacter.every( value => value === true );
    }

    isWinner() {
        console.clear();
        return this.isCompleteWord();
    }

    numberWrongLetters() {

        return this.wrongCharacters.size;
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
})();