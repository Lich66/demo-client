const { ccclass, property } = cc._decorator;
import * as pomelo from '../../pomelo/pomelo-client';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    labelParentNode: cc.Node = null;

    labelList: cc.Node[];
    roomIDStr: string = "";

    onLoad() {
        this.labelList = this.labelParentNode.children;
    }

    onButtonClick(event: object, customData: string) {
        let self = this;
        if (customData.length === 1) {
            self.roomIDStr += customData;
            if (self.roomIDStr.length > 6) {
                self.roomIDStr = self.roomIDStr.substring(0, self.roomIDStr.length - 1);
            }
            return;
        }
        switch (customData) {
            case 'cs':
                self.roomIDStr = '';
                break;
            case 'sc':
                self.roomIDStr = self.roomIDStr.substring(0, self.roomIDStr.length - 1);
                break;
                break;
            case 'close':
                self.node.active = false;
                break;
            case 'join':
                if (this.roomIDStr.length === 6) {
                    pomelo.request('connector.entryHandler.join', { uid: pomelo.userInfo.id, roomId: this.roomIDStr }, (data) => {
                        if (data.code !== 0) {
                            console.log('加入房间失败：' + data.msg);
                            let tipsNode = this.node.parent.getChildByName('tipPrefab');
                            tipsNode.active = true;
                            tipsNode.getComponent('tipPrefab').initWithData(data.msg);
                            return;
                        }
                        pomelo.roomData = { roomId: this.roomIDStr, users: data.users };
                        console.log('房间现有的玩家：' + JSON.stringify(data));
                        cc.director.loadScene('NNGameScene');
                    });
                } else {
                    console.log('请输入完整的房间号！');
                    let tipsNode = this.node.parent.getChildByName('tipPrefab');
                    tipsNode.active = true;
                    tipsNode.getComponent('tipPrefab').initWithData("请输入完整的房间号！");
                }
                break;
        }
    };

    update() {
        for (let i = 0; i < this.labelList.length; i++) {
            this.labelList[i].getComponent(cc.Label).string = '';
        }
        for (let i = 0; i < this.roomIDStr.length; i++) {
            this.labelList[i].getComponent(cc.Label).string = this.roomIDStr[i];
        }
    }
}
