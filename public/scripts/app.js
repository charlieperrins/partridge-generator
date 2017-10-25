jQuery('document').ready(function($){

	var appData;

	var patterns = [
//		['qualifier', 'provenance', 'method', 'food'],
//		['provenance', 'method', 'food'],
//		['method', 'provenance', 'food'],
//		['qualifier', 'method', 'provenance', 'food']
//		['activity', 'celebrity', 'condition']
		['place', 'superlative', 'name']
	];


	var generate = function(pattern) {

		var randomFood = '';

		for (i=0; i<pattern.length; i++) {
			var segment = pattern[i];
			var item = appData[segment][_.random(0, appData[segment].length - 1)];
			randomFood += item + ' ';
		}

		randomFood = randomFood.trim();

		// TODO:
		// No double hypen
		// No repeat words (e.g. hand)
		// If fails filters generate new one

		$('#randomFood').html(randomFood);

		// Setup twitter button
		// TODO: remove twttr sdk solution, update meta tags instead
		twttr.widgets.createShareButton(
			window.location.href,
			document.getElementById('foodTweet'),
			{
				text: 'What\'s for supper tonight? We\'re having ' + randomFood,
				via: 'shinyplums',
				size: 'large'
			}
		);

	};

	// Initialise data
	$.getJSON('/scripts/data.json', function(data){
		if(data) {
			appData = data;
			generate( patterns[_.random(0, patterns.length - 1)] );
		}
	});

	// Attach events
	$('.js-regenerate').on('click', function(){
		$('#foodTweet').html(''); // Clear twitter button
		generate( patterns[_.random(0, patterns.length - 1)] );
		return false;
	});

});