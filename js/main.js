
function buttonEvents() {
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
        btnDesist = document.querySelector( '.btn-desist' );

    anio.innerHTML = new Date().getFullYear();

    btnStart.addEventListener( 'click', () => {
        sectionHome.style.display = 'none';
        sectionGame.style.display = 'block';
    });

    btnAddWord.addEventListener( 'click', () => {
        sectionHome.style.display = 'none';
        sectionNewWord.style.display = 'block';
    });

    btnSave.addEventListener( 'click', () => {
        sectionNewWord.style.display = 'none';
        sectionGame.style.display = 'block';
    });

    btnCancel.addEventListener( 'click', () => {
        sectionNewWord.style.display = 'none';
        sectionHome.style.display = 'flex';
    });

    btnNewGame.addEventListener( 'click', () => {
        console.log( 'New Game!' );
    });

    btnDesist.addEventListener( 'click', () => {
        sectionGame.style.display = 'none';
        sectionHome.style.display = 'flex';
    });
}

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

( function () {
    buttonEvents();
    hangmanDrawing();
})();