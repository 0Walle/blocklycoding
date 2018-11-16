function initApi(interpreter, scope) {
  var wrapper = function() {return interpreter.createPrimitive(player.move());};
  interpreter.setProperty(scope, 'move', interpreter.createNativeFunction(wrapper));
  var wrapper = function(dir) {return interpreter.createPrimitive(player.turn(dir));};
  interpreter.setProperty(scope, 'turn', interpreter.createNativeFunction(wrapper));
  var wrapper = function(dir) {return interpreter.createPrimitive(player.pathTo(dir));};
  interpreter.setProperty(scope, 'path_to', interpreter.createNativeFunction(wrapper));
}

var runButton = document.getElementById("runButton");
var running = false;
function run(){
  running = true;
  var code = Blockly.JavaScript.workspaceToCode(workspace);

  var myInterpreter = new Interpreter(code,initApi);

  function nextStep() {
    if (apples.length == 0){
      runButton.innerHTML = 'Começa';
      runButton.setAttribute("onclick","runCode()");
      running = false;
      dialog.show("winDialog","center");
    }
    if (myInterpreter.step() && running==true) {
      window.setTimeout(nextStep, 50);
    }else{
      runButton.innerHTML = 'Começa';
      runButton.setAttribute("onclick","runCode()");
      if (apples.length != 0) player.reset();
      running = false;
    }
  }
  nextStep();

  runButton.onclick = function() {
    running = false;
    player.reset();
    runButton.innerHTML = 'Começa';
    runButton.setAttribute("onclick","runCode()");
  }
}

function runCode() {
  runButton.innerHTML = 'Para';
  player.reset()
  window.setTimeout(run,100);
}