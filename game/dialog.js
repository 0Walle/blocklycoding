var Dialog = function() {
  this.div = document.createElement("div");
  this.div.style.visibility = "hidden";
  this.div.style.zIndex = 100;
  this.div.style.position = "absolute";
  this.div.style.border = "1px solid #ccc";
  this.div.style.borderRadius = "8px";
  this.div.style.boxShadow = "3px 3px 3px #888";
  this.div.style.padding = "3px 10px";
  this.div.style.backgroundColor = "white";
  this.div.style.backgroundColor = "white";
  this.div.className = "dialog";
  document.body.appendChild(this.div);

  this.show = function(id,wid) {
    this.div.innerHTML = document.getElementById(id).innerHTML;
    this.div.style.visibility="visible";

    if (wid == 'center'){
      this.div.style.width= "40%";
      this.div.style.left= "30%";
      this.div.style.top= "3em";
    }else{
      this.div.style.width= wid+"px";
    }
  }

  this.close = function(){
    this.div.innerHTML = '';
    this.div.style.visibility= "hidden";
  }

  this.moveTo = function(x,y,time){
    var id = setInterval(frame, 16);
    var posx = parseInt(this.div.style.left, 10);
    var posy = parseInt(this.div.style.top, 10);
    var Atime = 0;

    if (time > 0){
      vy = (Math.abs(posy-y))/time;
      vx = (Math.abs(posx-x))/time;
    }
    else {
      this.div.style.left = x + 'px';
      this.div.style.top = y + 'px';
      clearInterval(id);
      return true;
    }

    if (posy-y>0) vy *= -1;
    if (posx-x>0) vx *= -1;

    var div = this.div;
    function frame() {
        if (Atime == time) {
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            clearInterval(id);
        } else {
            posx += vx;
            posy += vy;
            div.style.left = posx + 'px'; 
            div.style.top = posy + 'px';
        }
        Atime++;
    }
  }
}