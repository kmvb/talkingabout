var talkApp = {};


talkApp.init = function (e) {
	
	$('.button').on('click', function (e) {
		e.preventDefault();
		var keywords = $(this).data('keywords');
			console.log(keywords);
		talkApp.lastSearch = $(this).text();
		talkApp.getTweets(keywords);
		$('.overlay').hide();
		$('.twitter').show();
		$('body').css("background", "url(images/chalkboard.jpg)");
	});
}

talkApp.getTweets = function(keywords) {
//create first promise
var t1 = $.ajax({
			url : 'api.php',
			dataType : 'json',
			data : {
				user: 'liberal_party',
				q : keywords
			}
		});
//create second promise
var t2 = $.ajax ({
			url : 'api.php',
			dataType : 'json',
			data : {
				user : 'cpc_hq',
				q : keywords
			}
		});
//create third promise
var t3 = $.ajax ({
			url : 'api.php',
			dataType : 'json',
			data : {
				user : 'ndp_hq',
				q : keywords
			}
		});

//promise for all three pull request
	$.when.apply($, [t1, t2, t3]).then(function() {
      talkApp.displayTweets(arguments);
	}, function(err){
		console.log(err);
	});

}//end talkApp.getTweets()

talkApp.displayTweets = function (messages) {

//use jquery to make some HTML and append it into the DOM
	for (var i = 0; i < messages.length; i++) {
		var tweets = messages[i][0].statuses;
		// loop over each tweet in tweets
		var num = i+1;
		var tweetDump = $('#tweet' + num).empty();
// loop over the tweets arrray

		//check if there are no tweets on the topic	
		if(!tweets.length){

			var noMessage = $('<li>').text("There is currently no discussion on " +  talkApp.lastSearch.toLowerCase() + ". Try again later");
			tweetDump.append(noMessage);
		}

		$.each(tweets, function (inc, tweet) {				
		//if there are tweets then show them in a list
			var text = tweet.text;
			if(text.match(/^RT/i)) {
				text = text.split(': ').pop();
			} 
			var li = $('<li>').text(text).prepend("<i class='fa fa-commenting'></i>" + " ");
			tweetDump.append(li);
		 });
	};
		
		$('h2').append(talkApp.lastSearch).addClass('topic');
		talkApp.refreshPage();	
} //end talkApp.displayTweets()

talkApp.refreshPage = function (e) {
	$('.refresh').on('click', function (e) {
		e.preventDefault();
		console.log('it works');
	//The functions below breaks the server! Error 500 message
		// $('.overlay').show();
		// $('.twitter').hide();
	});
};
$(function() {
	talkApp.init();

});
