(function() 
{

function handleError(error) {
  console.log(`Error: ${error}`);
}

//Una volta avviato notifica il valore corrente di Rate
var sending = browser.runtime.sendMessage({
    value: document.querySelector('video').playbackRate.toString()
  });
sending.then(handleError);  

//In attesa di messaggio per cambiare Rate
browser.runtime.onMessage.addListener((request) => {
    document.querySelector('video').playbackRate = parseFloat(request.command);
  });

})();