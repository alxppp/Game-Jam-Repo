var AnimationLayer = cc.Layer.extend({
    space:null,
    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        // Let's add the player
        this.player = new cc.PhysicsSprite.create(res.Player_png);
        var playerSize = this.player.getContentSize();
        this.playerBody = new cp.Body(1, cp.momentForBox(1, playerSize.width, playerSize.height));
        this.playerBody.setPos(cc.p(winsize.width / 2, winsize.height / 2 + 48))
        this.space.addBody(this.playerBody);
        this.playerShape = new cp.BoxShape(this.playerBody, playerSize.width, playerSize.height);
        this.space.addShape(this.playerShape);
        this.player.setBody(this.playerBody);

        // Let's add the elevator
        this.elevator = new cc.PhysicsSprite.create(res.Elevator_png);
        var elevatorSize = this.elevator.getContentSize();
        this.elevatorBody = new cp.Body(2, cp.momentForBox(2, elevatorSize.width, elevatorSize.height));
        this.elevatorBody.setPos(cc.p(winsize.width / 2, winsize.height / 2 - 94))
        this.space.addBody(this.elevatorBody);
        this.elevatorShape = new cp.BoxShape(this.elevatorBody, elevatorSize.width, elevatorSize.height);
        this.space.addShape(this.elevatorShape);
        this.elevator.setBody(this.elevatorBody);

        this.space.addConstraint(new cp.PivotJoint(this.elevatorBody, this.space.staticBody, cp.v(winsize.width / 2, winsize.height / 2 - 96)));

        this.addChild(this.player);
        this.addChild(this.elevator);

        player = this.player;

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = player;
                var delta = touch.getDelta();
                target.body.applyForce(cp.v(delta.x*4,0));
            }
        });

        cc.eventManager.addListener(touchListener, this);
    }
});