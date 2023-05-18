function getUserCity() {
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then(
      (data) => (document.getElementById('user-city').innerHTML = data.city),
    )
    .catch((err) => console.error('Ocorreu um erro'));
}

function setDate() {
  const date = new Date();

  const day = (() => {
    return date.getDate().toString().length === 1
      ? `0${date.getDate()}`
      : `${date.getDate()}`;
  })();

  const month = (() => {
    return date.getMonth().toString().length === 1
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  })();

  const year = date.getFullYear().toString();

  document.getElementById('date-now').innerHTML = `${day}/${month}/${year}`;
}

window.addEventListener('onload', getUserCity());

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var targetTime = 314;
var checkInterval;
var playClicked = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'D7HqhCyzaE0',
    playerVars: {
      controls: 0,
      disablekb: 1,
      mute: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.mute();
  createPlayButton();
  accessDOM();
  checkInterval = setInterval(checkCTAVisibility, 1000);
}

function accessDOM() {
  const dom = player.getIframe();
  console.log(dom);
}

function createPlayButton() {
  var playButton = document.createElement('button');
  playButton.textContent = 'CLIQUE PARA OUVIR';
  playButton.addEventListener('click', function () {
    player.seekTo(0);
    player.unMute();
    player.playVideo();
    playButton.style.display = 'none';
    playClicked = true;
  });

  var iconPlay = document.createElement('i');
  iconPlay.classList.add('fa-regular');
  iconPlay.classList.add('fa-circle-play');

  playButton.appendChild(iconPlay);

  var videoContainer = document.querySelector('.video-container');
  videoContainer.appendChild(playButton);
}

function checkCTAVisibility() {
  var currentTime = player.getCurrentTime();
  if (playClicked) {
    if (currentTime >= targetTime) {
      document.getElementById('cta-button').style.display = 'block';
      document.getElementById('message').style.display = 'block';
      // Rolar para baixo 100 pixels com scroll suave
      window.scrollTo({
        top: window.scrollY + 120,
        behavior: 'smooth',
      });

      clearInterval(checkInterval);
    }
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && !playClicked) {
    player.seekTo(0);
    player.playVideo();
  }
}
