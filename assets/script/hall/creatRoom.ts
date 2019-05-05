const { ccclass, property } = cc._decorator;
import * as pomelo from '../../pomelo/pomelo-client';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onLoad() { }

    start() {

    }

    onButtonClick(event: object, customData: string) {
        let self = this;
        switch (customData) {
            case 'close':
                self.node.active = false;
                break;
            case 'creat':
                pomelo.request("connector.entryHandler.create", { uid: pomelo.userInfo.id, gameType: 'nn' }, (data: { code: number, roomId: string }) => {
                    console.log('创建房间回调信息：' + JSON.stringify(data));
                    if (data.code === 0) {
                        self.joinRoom(data.roomId);
                    } else {
                        console.log('创建房间失败！');
                        let tipsNode = this.node.parent.getChildByName('tipPrefab');
                        tipsNode.active = true;
                        tipsNode.getComponent('tipPrefab').initWithData("创建房间失败！");
                    }
                });
                break;
        }
    };

    joinRoom(roomId: string) {
        pomelo.request('connector.entryHandler.join', { uid: pomelo.userInfo.id, roomId: roomId, flag: false }, (data) => {
            console.log('加入房间回调信息：' + JSON.stringify(data));
            if (data.code !== 0) {
                console.log('加入房间失败：' + data.msg);
                let tipsNode = this.node.parent.getChildByName('tipPrefab');
                tipsNode.active = true;
                tipsNode.getComponent('tipPrefab').initWithData(data.msg);
                return;
            }
            pomelo.roomData = { roomId: roomId, users: data.users };
            cc.director.loadScene('NNGameScene');
        });
    }
}
