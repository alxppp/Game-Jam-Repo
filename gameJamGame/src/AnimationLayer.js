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
        this.playerBody.setPos(cc.p(winsize.width / 2 + (Math.random() * 20 - 10) , winsize.height / 2 + 48))
        this.space.addBody(this.playerBody);
        this.playerShape = new cp.CircleShape(this.playerBody, playerSize.width/2, cp.v(0,0));
        this.playerShape.setFriction(5);
        this.playerShape.setCollisionType(Things.player);
        //this.playerShape.setSensor(true);
        this.space.addShape(this.playerShape);
        this.player.setBody(this.playerBody);

        // Let's add the elevator
        this.elevator = new cc.PhysicsSprite.create(res.Elevator_png);
        var elevatorSize = this.elevator.getContentSize();
        this.elevatorBody = new cp.Body(1, cp.momentForBox(1, elevatorSize.width, elevatorSize.height));
        this.elevatorBody.setPos(cc.p(winsize.width / 2, winsize.height / 2 - 94))
        this.space.addBody(this.elevatorBody);
        this.elevatorShape = new cp.BoxShape(this.elevatorBody, elevatorSize.width, elevatorSize.height);
        this.elevatorShape.setFriction(5);
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
                target.body.applyForce(cp.v(delta.x*4,0),cp.v(0,0));
            }
        });
        this.scheduleUpdate();
        this.schedule(this.updateScore, 0.1); // +1 every 1/10 sec
        this.schedule(this.flipBackground, 0.03); // flip every 2 sec



        cc.eventManager.addListener(touchListener, this);
    },
    flipBackground:function () {
        var backgroundLayer = this.getParent().getChildByTag(2);
        backgroundLayer.flipBackground();
    },
    updateScore:function () {
        var scoreLayer = this.getParent().getChildByTag(1);
        scoreLayer.updateScore();
    }
});