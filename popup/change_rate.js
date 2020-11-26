function reportExecuteScriptError(error) 
{
  console.error(`Failed to execute WShabtiXn content script: ${error.message}`);
}

function updateRate(tabs) 
{
     browser.tabs.sendMessage(tabs[0].id, {
          command: document.getElementById('range_speed').value
        });
}

function changeRate()
{
	document.getElementById("rateLabel").innerHTML = "Current Rate: x" + document.getElementById('range_speed').value;
	browser.tabs.query({active: true, currentWindow: true}).then(updateRate);       
}

function resetRate()
{
	document.getElementById('range_speed').value = 1;
	document.getElementById("rateLabel").innerHTML = "Current Rate: x" + document.getElementById('range_speed').value;
	browser.tabs.query({active: true, currentWindow: true}).then(updateRate);       
}

//Attesa valore corrente di Rate
function handleMessage(request, sender, sendResponse) 
{
  document.getElementById("range_speed").style.display = "block";
  document.getElementById("reset").style.display = "block";
  document.getElementById("rateLabel").innerHTML = "Current Rate: x" + request.value;
  document.getElementById("range_speed").value = parseFloat(request.value);

}

//Setting Generale
document.getElementById("range_speed").style.display = "none";
document.getElementById("reset").style.display = "none";

browser.runtime.onMessage.addListener(handleMessage);
document.getElementById('range_speed').addEventListener('change', changeRate);
document.getElementById('reset').addEventListener('click', resetRate);
browser.tabs.executeScript({file: "/scripts/change_rate.js"}).catch(reportExecuteScriptError);