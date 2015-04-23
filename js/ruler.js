(function(){
	ruler = {};
	ruler.init = function(){
		var zIndex = 10000;
		this.top = document.createElement('canvas');
		this.top.width = document.documentElement.clientWidth;
		this.top.height = 100;
		this.top.style.zIndex = zIndex;
		this.top.style.cssText = "position: fixed; top: 0; left: 0; z-index: 10001;";
		document.body.appendChild(this.top);
		this.top.ctx = this.top.getContext("2d");
		this.fill(this.top);
		
		this.left = document.createElement('canvas');
		this.left.width = 100;
		this.left.height = Math.max(document.body.clientHeight,document.documentElement.clientHeight,window.pageYOffset);
		this.left.style.zIndex = zIndex;
		this.left.style.cssText = "position: absolute; top: 0; left: 0; z-index: 10000;";
		document.body.appendChild(this.left);
		this.left.ctx = this.left.getContext("2d");
		this.fill(this.left);
	}
	ruler.fill = function(canv){
		var ctx = canv.ctx,
			len=Math.max(canv.width,canv.height), // длинна шкалы
			or= canv.width > canv.height ? 1 : -1 , // ориентация шкалы
			scale = {
				o: Math.round(len/2), // центр
				st1: 10, // маленький шаг
				st2: 100, // большой шаг
				h1: 4, // высота маленького деления
				h2: 16 // высота большого деления
			};
		ctx.clearRect(0,0,canv.width,canv.height);
		var x,y,w,h,wc,hc;
		ctx.font="9px Tahoma";
		for(var cur=0;cur<=len;cur+=scale.st2) {
			if(or>0){ x=cur; y=0; w=wc=scale.st2; h=scale.h2; hc=h+1; }
			else { x=0; y=cur; w=scale.h2; wc=w+1; h=hc=scale.st2; }
			ctx.strokeRect(x,y,w,h);
			ctx.clearRect(x,y,wc,hc);
			if(!cur) continue;
			if(or>0 && (cur<(scale.o - scale.st2/2) || cur>(scale.o + scale.st2/2))) {
				ctx.textAlign = cur<scale.o ? "left" : "right";
				ctx.fillText(' '+cur+' ',cur,scale.h2);
			} else if(or<0 && cur<len-14) {
				ctx.textAlign = "left";
				ctx.fillText(' '+cur,scale.h1,cur-3);
			}
			ctx.stroke();
		}
		ctx.beginPath();
		for(var cur=0;cur<=len;cur+=scale.st1) {
			if(or>0){ x=cur; y=0; w=scale.st1; h=scale.h1; }
			else { x=0; y=cur; w=scale.h1; h=scale.st1; }
			ctx.strokeRect(x,y,w,h);
			ctx.clearRect(x,y,w,h);
			ctx.stroke();
		}
		ctx.beginPath();
		if(or>0){ x=scale.o; y=0; x1=scale.o; y1=scale.h2*2; }
		else { x=0; y=scale.o; x1=scale.h2*2; y1=scale.o; }
		ctx.moveTo(x,y);
		ctx.lineTo(x1,y1);
		if(or>0){
			ctx.stroke();
			ctx.font="11px Tahoma";
			ctx.textAlign = "center";
			ctx.fillText(scale.o,scale.o,scale.h2*2+11);
			ctx.font="11px Tahoma";
			ctx.textAlign = "right";
			ctx.fillText(len+' ',len,scale.h2*2-5);
		} else {
			ctx.font="11px Tahoma";
			ctx.fillText(len,scale.h1+5,len-3);
		}
		ctx.beginPath();
	}
	addEventListener("resize", function(event) {
		window.ruler.top.width = document.documentElement.clientWidth;
		window.ruler.left.height = Math.max(document.body.clientHeight,document.documentElement.clientHeight,window.pageYOffset);
		window.ruler.fill(window.ruler.top);
		window.ruler.fill(window.ruler.left);
	});
	document.addEventListener("DOMContentLoaded", function() {
		window.ruler.init();
	});
}());