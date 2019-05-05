const { ccclass, property } = cc._decorator;
import * as pomelo from '../../pomelo/pomelo-client';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    roomIDLabel: cc.Label = null;
    @property(cc.Node)
    tipsNode: cc.Node = null;

    onLoad() {
        this.roomIDLabel.string = pomelo.roomData.roomId;
        let users = pomelo.roomData.users;
        console.log('');
        if (users.length !== 0) {
            let usersString: string = '';
            for (let i = 0; i < users.length; i++) {
                if (i === (users.length - 1)) {
                    usersString = `${usersString}${users[i]}`;
                } else {
                    usersString = `${usersString}${users[i]} 、 `;
                }
            }
            this.tipsNode.active = true;
            this.tipsNode.getComponent('tipPrefab').initWithData('房间现有玩家有《 ' + usersString + ' 》');
        }
        pomelo.on('onJoin', (data) => {
            console.log("有玩家加入房间" + JSON.stringify(data));
            this.tipsNode.active = true;
            this.tipsNode.getComponent('tipPrefab').initWithData('玩家《 ' + data.username + ' 》加入房间');
        });
        pomelo.on('onLeave', (data) => {
            console.log("有玩家离开房间" + JSON.stringify(data));
            this.tipsNode.active = true;
            this.tipsNode.getComponent('tipPrefab').initWithData('玩家《 ' + data.user + ' 》离开房间');
        });
        pomelo.on('onReady', (data) => {
            console.log("有玩家离开房间" + JSON.stringify(data));
            this.tipsNode.active = true;
            this.tipsNode.getComponent('tipPrefab').initWithData('玩家《 ' + data.user + ' 》准备好了');
        });
    }

    start() {

    }

    onButtonClick(event: object, customData: string) {
        switch (customData) {
            case 'leave':
                pomelo.request('connector.entryHandler.leave', {}, (data: { code: number }) => {
                    if (data.code === 0) {
                        cc.director.loadScene('HallScene');
                    } else {
                        this.tipsNode.active = true;
                        this.tipsNode.getComponent('tipPrefab').initWithData('离开房间失败！');
                    }
                });
                break;
            case 'ready':
                pomelo.request('connector.entryHandler.ready', { uid: pomelo.userInfo.id, roomId: pomelo.roomData.roomId }, (data) => {
                    if (data.code === 0) {
                        this.tipsNode.active = true;
                        this.tipsNode.getComponent('tipPrefab').initWithData('我已经准备好了');
                    } else {
                        this.tipsNode.active = true;
                        this.tipsNode.getComponent('tipPrefab').initWithData('准备失败！');
                    }
                });
                break;
            default:
                break;
        }
    }
}
