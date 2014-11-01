var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var playerSprite = new cc.Sprite(res.Player_png);
        playerSprite.attr({x: 80, y: 85});

        var actionTo = new cc.MoveTo(2, cc.p(300, 85));
        playerSprite.runAction(new cc.Sequence(actionTo));
        this.addChild(playerSprite);
    }
});