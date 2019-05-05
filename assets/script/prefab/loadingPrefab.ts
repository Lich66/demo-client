const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    loadingSprite: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    lodingSpriteAtlas: cc.SpriteAtlas = null;

    @property()
    index:number = 1;

    @property
    time:number = 50;

    loadingTimer() {
        if (this.index % 16 === 0) {
            this.index++;
        }
        let num = this.index % 16;
        this.loadingSprite.spriteFrame = this.lodingSpriteAtlas.getSpriteFrame('loading_' + num);
        this.index++;
        this.time--;
        if (this.time <= 0) {
            this.node.active = false;
        }
    }


    onEnable(){
        this.schedule(this.loadingTimer, 0.1);
    }

    onDisable(){
        this.unschedule(this.loadingTimer);
    }
}
