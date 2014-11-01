var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        var player = new cc.Sprite(res.Player_png);
        player.attr({x: 80, y: 85});

        var elevator = new cc.Sprite(res.Elevator_png);
        elevator.setPosition(centerPos)

        //var actionTo = new cc.MoveTo(2, cc.p(300, 85));
        //player.runAction(new cc.Sequence(actionTo));

        this.addChild(player);
        this.addChild(elevator);



    }
});