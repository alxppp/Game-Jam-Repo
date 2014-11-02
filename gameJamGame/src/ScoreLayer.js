var ScoreLayer = cc.Layer.extend({
    labelScore:null,
    score:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("0", "Helvetica", 20);
        this.labelScore.setColor(cc.color(255,212,156));//black color
        this.labelScore.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelScore);
    },
    updateScore:function () {
        this.score += 1;
        this.labelScore.setString(this.score);
    }
});