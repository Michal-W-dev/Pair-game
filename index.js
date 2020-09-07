var imgArr = [
	'https://icon-library.com/images/164834.svg.svg',
	'https://icon-library.com/images/pint-595b40b65ba036ed117d3c28.svg.svg',
	'https://icon-library.com/images/orange20juice-595b40b85ba036ed117da775.svg.svg',
	'https://icon-library.com/images/827425_party.svg.svg',
	'https://icon-library.com/images/859314_party.svg.svg',
	'https://icon-library.com/images/290029.svg.svg',
	'https://icon-library.com/images/281638.svg.svg',
	'https://icon-library.com/images/249215.svg.svg',
	'https://icon-library.com/images/227345.svg.svg',
	'https://icon-library.com/images/190314.svg.svg',
	'https://icon-library.com/images/167255.svg.svg',
	'https://icon-library.com/images/167247.svg.svg',
	'https://icon-library.com/images/658364.svg.svg',
	'https://icon-library.com/images/139146.svg.svg',
	'https://icon-library.com/images/145644.svg.svg',
	'https://icon-library.com/images/760092_alcohol.svg.svg',
	'https://icon-library.com/images/209118.svg.svg',
	'https://icon-library.com/images/167252.svg.svg'
];
var randArr = [];
randomArr();
var score1 = 0;
var score2 = 0;
var drawPoint = 0;
var countGames = 0; // I can save wins in var resultsP1/2 = [], and use countGames as an index
var gameWinP1 = 0;
var gameWinP2 = 0;
var countToVictory;
var turnP1 = true;
startAnim2();
compare();
// === TESTING ====

// ==================

function compare() {
	var pickedcard, clickedcard, pickedNo1, pickedNo2;
	var clicks = 1;
	$('.square').click(function() {
		if (clicks === 1) {
			$(this).toggleClass('is-flipped');
			$(this).children().toggleClass('cover');
			$(this).toggleClass('steelblue');
			pickedcard = $(this).children().attr('src');
			pickedNo1 = $(this).attr('no');
			// console.log('pick ' + pickedcard + 'click1 ', clicks);
		} else if (clicks === 2) {
			$(this).toggleClass('is-flipped');
			$(this).children().toggleClass('cover');
			$(this).toggleClass('steelblue');
			clickedcard = $(this).children().attr('src');
			pickedNo2 = $(this).attr('no');
			// console.log('clicked ' + clickedcard + 'click2 ', clicks);
			// console.log('pickedNos ', pickedNo1, pickedNo2);
			// If PAIR was FOUND !
			if (clickedcard === pickedcard && pickedNo1 !== pickedNo2) {
				setTimeout(function() {
					$('img').addClass('cover');
					$('.square').addClass('steelblue');
					$('.square').removeClass('is-flipped');
					// console.log(clickedcard, pickedcard);
					$('div[no="' + pickedNo1 + '"]').addClass('cover');
					$('div[no="' + pickedNo2 + '"]').addClass('cover');
					clicks = 1;
				}, 2000);
				score();
				countToVictory--;
				// console.log(countToVictory);
				if (countToVictory === 0) {
					setTimeout(function() {
						$('div[no="' + pickedNo1 + '"]').addClass('cover');
						$('div[no="' + pickedNo2 + '"]').addClass('cover');
					}, 500);
					if (score1 === score2) {
						$('span#draw').removeClass('cover');
						$('span#player-draw').text(drawPoint + 2);
					} else if (score1 > score2) {
						$('span#victory').removeClass('cover');
						playerVictory = $('#displayP1').text();
						$('span#player-victory').text(playerVictory);
					} else if (score1 < score2) {
						$('span#victory').removeClass('cover');
						playerVictory = $('#displayP2').text();
						$('span#player-victory').text(playerVictory);
					}
					// var playerVictory = score1 > score2 ? $('#displayP1').text() : $('#displayP2').text();
					$('#playAgain').removeClass('dimmedPlayAgain');
					// $('#playAgain').prop('disabled', false);
				}
			} else {
				console.log('NOT FOUND');
				// clicks = 3;
				setTimeout(function() {
					$('img').addClass('cover');
					$('.square').addClass('steelblue');
					$('.square').removeClass('is-flipped');
					turnP1 = !turnP1;
					whichTurn();
					clicks = 1;
				}, 1100);
			}
		}
		// else {
		// 	// console.log('else ', clicks);
		// }
		++clicks;
		// console.log('click++ ', clicks);
		console.log(countToVictory);
	});
}
playAgain.addEventListener('click', function() {
	if (!(score1 == 0 && score2 == 0)) {
		startAnim();
		// Optional - disable playAgain button (when game going)
		$('#playAgain').addClass('dimmedPlayAgain');
		// $('#playAgain').prop('disabled', true);
		// reset (victory text)
		$('span#victory').addClass('cover');
		$('span#draw').addClass('cover');
		// Add results table
		results();
		// reset (scores & displayed scores)
		score1 = 0;
		score2 = 0;
		$('#displayScoreP1').text(score1);
		$('#displayScoreP2').text(score2);
		// reset(squares & src)
		randomArr();
	}
});
function results() {
	if (!(score1 == 0 && score2 == 0)) {
		$('table').append(
			'<tr><td>' + (countGames + 1) + '</td>' + '<td>' + score1 + '</td>' + '<td>' + score2 + '</td></tr>'
		);
		if (score1 === score2) {
			drawPoint++;
		} else if (score1 > score2) {
			gameWinP1 = gameWinP1 + 1 + drawPoint;
			// console.log('gameWinP1 ', gameWinP1);
			$('td.P1').text(gameWinP1);
			drawPoint = 0;
		} else if (score1 < score2) {
			gameWinP2 = gameWinP2 + 1 + drawPoint;
			// console.log('gameWinP2 ', gameWinP2);
			$('td.P2').text(gameWinP2);
			drawPoint = 0;
		}
		// resultsP1.push(score1);
		// resultsP2.push(score2);
		countGames++;
	}
}

$('#inputP1').keypress(function(event) {
	if (event.which === 13) {
		displayP1();
	}
});

$('#inputP2').keypress(function(event) {
	if (event.which === 13) {
		displayP2();
	}
});

$('#input-b1').click(function() {
	displayP1();
});

$('#input-b2').click(function() {
	displayP2();
});

function displayP1() {
	if ($('#inputP1').val() === '') {
		$('.displayP1').text('P1');
	} else {
		var name2 = $('#inputP1').val();
		$('.displayP1').text(name2);
		$('#inputP1').val('');
	}
}
function displayP2() {
	if ($('#inputP2').val() === '') {
		$('.displayP2').text('P2');
	} else {
		var name2 = $('#inputP2').val();
		$('.displayP2').text(name2);
		$('#inputP2').val('');
	}
}
// function revemoFoundCards() {
// 	pickedcard.remove();
// 	clickedcard.remove();
// }

function score() {
	if (turnP1 == true) {
		score1++;
		$('#displayScoreP1').text(score1);
	} else if (turnP1 == false) {
		score2++;
		$('#displayScoreP2').text(score2);
	}
}
function whichTurn() {
	$('#player1').toggleClass('dimmed');
	$('#player2').toggleClass('dimmed');
	// if(score1 || score2 !== winScore)
	// if (!turnP1) {}
}

$('#hardB').click(function() {
	$('#easyB').removeClass('selected');
	$('#hardB').addClass('selected');
	$('.hardMode').removeClass('cover');
	randomArr();
});
$('#easyB').click(function() {
	$('#hardB').removeClass('selected');
	$('#easyB').addClass('selected');
	$('.hardMode').addClass('cover');
	randomArr();
});
// single animation
function startAnim(i = 0) {
	if ($('#hardB').hasClass('selected')) {
		el = [ 1, 0, 1, 7, 13, 19, 20, 21, 22, 23, 24, 18, 12, 6, 5, 4, 3, 2, 1 ];
	} else if ($('#easyB').hasClass('selected')) {
		el = [ 1, 0, 1, 7, 13, 14, 15, 16, 17, 18, 12, 6, 5, 4, 3, 2, 1 ];
	}
	if (i < el.length) {
		setTimeout(function() {
			i++;
			$('div[no="' + el[i + 1] + '"]').addClass('star-anim');
			$('div[no="' + el[i] + '"]').removeClass('star-anim');
			startAnim(i);
		}, 100);
	}
}
// double animation
function startAnim2() {
	setTimeout(function() {
		startAnim();
	}, 800);
	startAnim();
}

function randomArr() {
	// randomize img_arr (18 / 24)  // randArr = imgArr.sort(() => Math.random() - 0.5);
	randArr = shuffle(imgArr);
	// EASY, HARD mode !            // arr - take half item (9 / 12)
	easyHard();
	// duplicate (9 + 9 / 12 + 12)
	randArr = randArr.concat(randArr);
	// randomize again (18 / 24)
	randArr = shuffle(randArr);
	// console.log('randArr ', randArr);
	// Assign img src to each square
	var cards = document.querySelectorAll('img.drink');
	for (var i = 0; i < cards.length; i++) {
		cards[i].setAttribute('src', randArr[i]);
	}
}
function easyHard() {
	if ($('#hardB').hasClass('selected')) {
		$('.square').removeClass('cover');
		randArr = randArr.slice(6); //hardMode 18 - 6 = 12
		countToVictory = 12;
	} else if ($('#easyB').hasClass('selected')) {
		$('.easyMode').removeClass('cover');
		$('.hardMode').addClass('cover');
		randArr = randArr.slice(9); //easyMode 18 - 9 = 9
		countToVictory = 9;
	}
}
function shuffle(arr) {
	var currentIndex = arr.length;
	var tempVal;
	var randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		tempVal = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = tempVal;
	}
	return arr;
}
