// On récupère toutes les étoiles
let toutesLesEtoiles = $('.stars .star');
// console.log(toutesLesEtoiles);

// On rajoute l'écouteur au clic;
// toutesLesEtoiles.click(onStarClick)
toutesLesEtoiles.click(onStarClick);


// On gère ce qui se passe lors du clic d'une étoile
function onStarClick(event) {

	// On récupère l'objet cliqué, AU FORMAT JQUERY
	let etoileCliquée = $(this);
	// console.log(etoileCliquée);

	// On récupère son index ("Quelle étoile a été cliquée ?") depuis sont attribut data-index
	let indexCliqué = etoileCliquée.data("index");
	// console.log(indexCliqué);

	// On récupère son parent (afin de rendre ça réutilisable pour d'autres groupes)
	let parent = $(this).parent();

	// Style : "Vider" toutes les étoiles.. de ce groupe
	parent.find('.star').addClass('stargrey');
	parent.find('.star').removeClass('yellow');

	//// Style : "Remplir" le bon nombre d'étoiles
	// Pour ce groupe, pour chaque étoile de 0 jusqu'à celle cliquée..
	for (let i = 0; i <= indexCliqué; i++) {

		let etoile = parent.find('.star[data-index=' + i + ']');
		// console.log( etoile );

		// Je remplie
		etoile.addClass('yellow');
		etoile.removeClass('stargrey');
	}
}