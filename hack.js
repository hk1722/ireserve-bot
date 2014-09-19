console.log('loading apple script')

var playSound = function() {
  myAudio = new Audio('http://ikky-worldcup.herokuapp.com/Tritone.mp3'); 
  //myAudio.loop = false
  myAudio.addEventListener('ended', function() {
    //this.currentTime = 0;
    this.play();
  }, false);
  myAudio.play();
}
var tag = $('img[alt="We\'ll be back soon"]');
try {
  tag = tag[0]
} catch (err) {

}

if (tag && tag.src == "http://images.apple.com/r/store/backsoon/1x-covers-animation-v3.gif") {
  console.log('BACK SOON - reload page after 5 seconds');
  setTimeout(function() {
    location.reload();
  }, 5000)
} else {
window.myTag = tag
$('#group-1 [for=Item14_7inch] .details')[0].click();
$('#group-1 [for=Item2silver] .details')[0].click();
$('#group-1 [for=Item316gb] .details')[0].click();
if ($('page .add-to-cart button.disabled').length === 0) {
  console.log('reload page')
  location.reload();
} else {
  console.log('button clicked')
  playSound()
  setTimeout(function() {  
    $('#page .add-to-cart button')[0].click();
  }, 1000)
}
}
console.log('apple script loading ends')

