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