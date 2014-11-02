var MainScene = cc.Scene.extend({
    space:null,
    initPhysics:function() {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -100);
        var size = cc.director.getWinSize();
        var floor = new cp.SegmentShape(this.space.staticBody, cp.v(0, 0), cp.v(size.width, 0), 0)
        this.space.addStaticShape(floor);
    },
    onEnter:function () {
        this._super();
        this.initPhysics();
        this.addChild(new BackgroundLayer());
        this.addChild(new AnimationLayer(this.space));
        this.addChild(new ScoreLayer());
        this.scheduleUpdate();
    },
    update:function (dt) {
        this.space.step(dt);
    }
});