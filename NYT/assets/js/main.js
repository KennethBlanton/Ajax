console.log("Hello World from main.js!");

function populate(result) {
	var apiResult = result.response.docs;
	if($('div').length) {
		for (var i = $('div').length - 1; i >= 0; i--) {
			$('div')[i].parentNode.removeChild($('div')[i]);
		}
	}
	for (var i = apiResult.length - 1; i >= 0; i--) {
		var string = apiResult[i].pub_date;
		var title = document.createElement('a');
		var summary =document.createElement('p');
		var date = document.createElement('h4');
		var container = document.createElement('div');
		var newString = '';
		$(title).html(apiResult[i].headline.main);
		$(title).attr({
		    target:"_blank", 
		    href:apiResult[i].web_url
		});
        string.split();
        for (var j = 0; j < 10; j++) {
        	newString +=string[j];
        }
		$(summary).html(apiResult[i].lead_paragraph)
		$(date).html(newString);
		$(container).append(title,summary,date);
		$('body').append(container);
	}


}

$('form').on("submit", function(e){
	e.preventDefault();
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "f47d20e5ae074e81bc49580a8b0f67db",
	  'q': $('input').val(),
	  'sort': "newest"
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result);
	  populate(result);
	}).fail(function(err) {
	  throw err;
	});
})



