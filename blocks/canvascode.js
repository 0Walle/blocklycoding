Blockly.JavaScript['foward'] = function(block) {
  var code = 'move();\n';
  return code;
};

Blockly.JavaScript['turn_right'] = function(block) {
  var code = 'turn(\'right\');\n';
  return code;
};

Blockly.JavaScript['turn_left'] = function(block) {
  var code = 'turn(\'left\');\n';
  return code;
};

Blockly.JavaScript['repeat_times'] = function(block) {
  var repeats = String(Number(block.getFieldValue('times')));

  var branch = Blockly.JavaScript.statementToCode(block, 'do');

  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var code = 'for (var '+loopVar+' = 0; '+loopVar+' < ' + repeats + ';'+loopVar+'++){'+branch+'}';
  return code;
};

Blockly.JavaScript['if_path'] = function(block) {
  var dir = block.getFieldValue('dir');
  var branch = Blockly.JavaScript.statementToCode(block, 'do');
  var code = 'if (path_to(\"'+dir+'\")){'+branch+'}';
  return code;
};