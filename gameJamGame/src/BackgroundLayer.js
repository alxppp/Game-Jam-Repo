var BackgroundLayer = cc.Layer.extend({
    backgroundSprite:null,
    isFlipping:false,
    flickerCount:0,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();

        //create the background image and position it at the center of screen
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        this.backgroundSprite = new cc.Sprite(res.Background_png);
        this.backgroundSprite.setPosition(centerPos);
        this.addChild(this.backgroundSprite);
    },
    flipBackground:function () {
        if (this.isFlipping){
            this.backgroundSprite.setFlippedX(!this.backgroundSprite.isFlippedX());
            this.isFlipping = false;
            cc.log("flip");
        } else {
            this.isFlipping = (Math.random() < 0.06);
        }
    }
});