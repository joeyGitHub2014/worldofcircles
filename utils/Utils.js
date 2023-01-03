/**
 * Created by Joseph on 11/8/2015.
 */
var Utils = function (game){
    this.game =  game;
    this.colors = ["#FF0000", "#B20000", "#FF3333", "#FF3333", "#FF3300" , "#CC2900" , "#FFFF00 ", "#FFFF80 "," #0000FF" , "#000099 ",
        "#6666FF" ," #33CC33" , "#70DB70" , "#1F7A1F" ,"#FF00FF" , "#FF4DFF" , "#800080" ,"#33CCFF" , "#85E0FF" ,
        "#1F7A99 ","#FF9900" , "#FFB84D" , "#995C00" ];
 }
Utils.prototype = {
    setPos: function (c){
        var x;
        var y;
        var rW = c.width/2;
        var rH = c.height/2;
        var topSide = [((this.game.rnd.frac() * this.game.world.width + rW)) - rW , -rW  ];
        var bottom  = [((this.game.rnd.frac() * this.game.world.width + c.width/2)) - rW , this.game.world.height + rW  ];
        var left    = [-rH  ,                 (this.game.rnd.frac()  * this.game.world.height + rH) - rH ];
        var right   = [this.game.world.width + rW  ,  (this.game.rnd.frac() * this.game.world.height + rH) - rH ];
        var sides = [topSide,bottom,left,right];
        var i = this.game.rnd.frac() * sides.length | 0;
        var a = [];
        a = sides[i];
        x = a[0];
        y = a[1];
        return {x: x,
            y: y};
    },
    reshape: function(c){
        c.key.clear();
        var bmd;
        var dia =  this.game.rnd.integerInRange(maxCircleSize,minCircleSize);
        var r = dia/2;
        bmd= this.game.add.bitmapData(dia,dia);
        var s = this.getColor();
        bmd.circle(r, r, r, s );
        c.loadTexture(bmd);
        c.anchor.setTo(0.5 );
        c.r = r;
    },

    getColor: function(){
        var n = this.game.rnd.integerInRange(0, 22);
        return this.colors[n];
    }

}

Utils.prototype.constructor =  Utils;