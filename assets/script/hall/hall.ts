const { ccclass, property } = cc._decorator;
import * as pomelo from '../../pomelo/pomelo-client'

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    headImg: cc.Sprite = null;          //头像图片

    @property(cc.Sprite)
    sexImg: cc.Sprite = null;           //性别图片


    @property(cc.Label)
    nameLabel: cc.Label = null;         //姓名

    @property(cc.Label)
    idLabel: cc.Label = null;           //游戏ID

    @property(cc.Label)
    diamondLabel: cc.Label = null;      //钻石数量

    @property(cc.Label)
    scrollNoticLabel: cc.Label = null;  //滚动公告

    @property(cc.Label)
    hallBGNoticLabel: cc.Label = null;  //大厅背景公告

    @property(cc.Node)
    tipsNode:cc.Node = null;

    // @property([cc.Node])
    // nodeList: cc.Node[] = [];  //数组形式的属性

    @property(cc.Node)
    playerInfoNode: cc.Node = null;

    @property(cc.Node)
    inviteCodeNode: cc.Node = null;
    @property(cc.Node)
    shopNode: cc.Node = null;

    @property(cc.Node)
    gameResultNode: cc.Node = null;

    @property(cc.Node)
    detailResultNode: cc.Node = null;

    @property(cc.Node)
    systemInfoNode: cc.Node = null;

    @property(cc.Node)
    settingNode: cc.Node = null;

    @property(cc.Node)
    gameRuleNode: cc.Node = null;

    @property(cc.Node)
    shareNode: cc.Node = null;

    @property(cc.Node)
    callWeNode: cc.Node = null;

    @property(cc.Node)
    outGameNode: cc.Node = null;

    @property(cc.Node)
    creatRoomNode: cc.Node = null;

    @property(cc.Node)
    joinRoomNode: cc.Node = null;


    onLoad() {
        let self = this;
        let info = pomelo.userInfo;
        cc.loader.load({ url: info.headImg, type: 'jpg' }, (err, tex) => {
            let oldWidth = self.headImg.node.width;
            self.headImg.spriteFrame = new cc.SpriteFrame(tex);
            let newWidth = self.headImg.node.width;
            self.headImg.node.scale = oldWidth / newWidth;
        });
        let sexImgUrl: string = `hallScene/UI/sex${info.sex}`;
        console.log('sexImgUrl = ' + sexImgUrl);
        cc.loader.loadRes(sexImgUrl, cc.SpriteFrame, function (err, spriteFrame) {
            self.sexImg.spriteFrame = spriteFrame;
        });
        self.nameLabel.string = info.name;
        self.idLabel.string = 'ID:' + info.id;
        self.diamondLabel.string = info.diamond;
    };

    start() {

    };

    onButtonClick(event: object, customData: string) {
        let self = this;
        switch (customData) {
            case 'creatRoom':
                self.creatRoomNode.active = true;
                break;
            case 'joinRoom':
                self.joinRoomNode.active = true;
                break;
        }
    };
}
