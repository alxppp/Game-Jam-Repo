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
        this.elevatorBody = new cp.Body(1, cp.momentForBox(1, elevatorSize.width, elevatorSize.height));
        this.elevatorBody.setPos(cc.p(winsize.width / 2, winsize.height / 2 - 48))
        this.space.addBody(this.elevatorBody);
        this.elevatorShape = new cp.BoxShape(this.elevatorBody, elevatorSize.width, elevatorSize.height);
        this.space.addShape(this.elevatorShape);
        this.elevator.setBody(this.elevatorBody);

        this.addChild(this.player);
        this.addChild(this.elevator);

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                /*var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }*/
                return false;
            },
            onTouchMoved: function (touch, event) {
                /*var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;*/
                alert('hi');
            }/*,
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == sprite2) {
                    sprite1.setLocalZOrder(100);
                } else if (target == sprite1) {
                    sprite1.setLocalZOrder(0);
                }
            }*/
        });

        cc.eventManager.addListener(touchListener, this);
    }
});