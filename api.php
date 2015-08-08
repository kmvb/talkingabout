<?php 
	require "twitteroauth/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	$connection = new TwitterOAuth('3r6lxUE5KsXdKpIVejvd3pRSb', '3P3Sy4oRTUgWHQnrVpeAw0QighFwu9NNHCXWRfzc9xtTiKJJFt', '193391148-C7DP3clai7msIU9e5RGGsyqdFaDPm8hQMqT3VuzY', 'KyMcRbp2CN3fHYVYaM0varJUVX6xZvR4KR42aPvQ5mPWq');
	
	$content = $connection->get("account/verify_credentials");

	$statues = $connection->get("search/tweets", array("count" => 10, "exclude_replies" => true, q => $_GET['q'] . " from:" . $_GET['user']));

echo JSON_encode($statues);



