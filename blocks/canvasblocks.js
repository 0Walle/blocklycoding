Blockly.Blocks['foward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../game/foward.png", 20, 20, ""))
        //.appendField(new CenterField("siga em frente"));
        .appendField("siga em frente");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('move o bloco para frente');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../game/right.png", 20, 20, ""))
        //.appendField(new CenterField("vire a direita"));
        .appendField("vire a direita");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('gira o bloco para direita');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../game/left.png", 20, 20, ""))
        //.appendField(new CenterField("vire a esquerda"));
        .appendField("vire a esquerda");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('gira o bloco para esquerda');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['repeat_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../game/loop.png", 20, 20, ""))
        .appendField("repita")
        .appendField(new Blockly.FieldNumber('4'), 'times')
    this.appendStatementInput('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip('repete um numero de vezes');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['if_path'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../game/if.png", 20, 20, ""))
        .appendField("se caminho")
        .appendField(new Blockly.FieldDropdown([['em frente', 'foward'],['para direita', 'right'],['para esquerda', 'left']]), 'dir')
    this.appendStatementInput('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip('repete um numero de vezes');
    this.setHelpUrl('');
  }
};