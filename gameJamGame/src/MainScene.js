var MainScene = cc.Scene.extend({
    space:null,
    initPhysics:function() {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -250);
        var floor = new cp.SegmentShape(this.space.staticBody, cp.v(-4294967295, -64), cp.v(4294967295, -64), 0)
        floor.setCollisionType(Things.floor);
        this.space.addStaticShape(floor);

        this.space.addCollisionHandler(Things.player, Things.floor,
            this.collisionFloorBegin.bind(this), null, null, null);
    },
    onEnter:function () {
        this._super();
        this.initPhysics();
        this.addChild(new BackgroundLayer(), 0, 2);
        this.addChild(new AnimationLayer(this.space));
        this.addChild(new ScoreLayer(), 0, 1);
        this.scheduleUpdate();
    },
    collisionFloorBegin:function (arbiter, space) {
        cc.director.pause();
        this.addChild(new RestartLayer());
    },
    update:function (dt) {
        this.space.step(dt);
    }
});