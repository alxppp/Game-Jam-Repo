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

        this.labelScore = new cc.LabelTTF("0", "Helvetica", 32);
        this.labelScore.setColor(cc.color(255,212,156));
        this.labelScore.setPosition(cc.p(48, winsize.height - 38));
        this.addChild(this.labelScore);
    },
    updateScore:function () {
        this.score += 1;
        this.labelScore.setString(this.score);
    },
    flipColor:function (state) {
        if (state) {
            this.labelScore.setColor(cc.color(255, 158, 18));
        } else {
            this.labelScore.setColor(cc.color(255, 212, 156));
        }
    }
});