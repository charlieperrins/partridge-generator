jQuery('document').ready(function($){

	var appData;

	var patterns = [
		[{'data':'place'}, {'data':'superlative'}, {'data':'name'}],
		[{'data':'activity'},{'string':'with'},{'data':'celebrity'}],
		[{'data':'celebrity'},{'string':'on'},{'data':'condition'}]
	];


	var generate = function(pattern) {

		var randomShow = '';

		for (i=0; i<pattern.length; i++) {
			var segment = pattern[i];
			if (segment.data){
				var item = appData[segment.data][_.random(0, appData[segment.data].length - 1)];
				randomShow += item + ' ';
			}
			if (segment.string) {
				randomShow += segment.string + ' ';	
			}
		}

		randomShow = randomShow.trim();

		// TODO:
		// No double hypen
		// No repeat words (e.g. hand)
		// If fails filters generate new one

		$('#randomShow').html(randomShow);

		// Setup twitter button
		// TODO: remove twttr sdk solution, update meta tags instead
		// TODO: add FB button: https://developers.facebook.com/docs/plugins/share-button/#example
		twttr.widgets.createShareButton(
			window.location.href,
			document.getElementById('showTweet'),
			{
				text: 'Lynn, idea for a programme: ' + randomShow,
				via: 'RandomPartridge',
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
		$('#showTweet').html(''); // Clear twitter button
		generate( patterns[_.random(0, patterns.length - 1)] );
		return false;
	});

});