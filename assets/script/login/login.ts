const { ccclass, property } = cc._decorator;
import * as pomelo from '../../pomelo/pomelo-client'

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    agreementToggle: cc.Toggle = null;  //用户协议复选框

    @property(cc.Node)
    userAgreement: cc.Node = null;       //用户协议内容

    @property(cc.Label)
    appVersionLabel: cc.Label = null;    //应用版本号

    @property(cc.Node)
    loadingNode: cc.Node = null;     //加载界面

    @property(cc.Node)
    tipsNode: cc.Node = null;        //消息提示

    onLoad() {
        cc.view.setResolutionPolicy(cc.ResolutionPolicy.EXACT_FIT); //非等比拉伸至全屏
        this.userAgreement.active = false;
        // this.agreementToggle.isChecked = false;
        pomelo.init(
            {
                host: '127.0.0.1',
                port: 3140,
                log: true
            }, function () {
                pomelo.request('gate.gateHandler.queryEntry', { uid: '9416' }, function (data) {
                    console.log('登录验证返回结果：' + JSON.stringify(data));
                    if (data.code !== 0) {
                        console.log('网关连接失败！');
                        this.tipsNode.active = true;
                        this.tipsNode.getComponent('tipPrefab').initWithData(data.msg);
                        return;
                    }
                    pomelo.connector = { "host": data.host, "port": data.port };
                    pomelo.disconnect();

                });
            }
        );
    }

    start() {

    }

    onButtonClick(event: object, customData: string) {
        switch (customData) {
            case "login":
                if (this.agreementToggle.isChecked) {
                    // console.log("微信登陆：");
                    this.loadingNode.active = true;
                    pomelo.init({
                        host: pomelo.connector.host,
                        port: pomelo.connector.port,
                    }, () => {
                        pomelo.request('login.loginHandler.login', { name: 'Lich' }, (data: { name: string, id: number, headImg: string, sex: number, diamond: number }) => {
                            console.log('登陆成功返回信息：' + JSON.stringify(data));
                            pomelo.userInfo = data;
                            cc.director.loadScene('HallScene');
                        });
                    });
                } else {
                    this.tipsNode.active = true;
                    this.tipsNode.getComponent('tipPrefab').initWithData('请仔细阅读用户协议，并同意！');
                }
                break;
            case 'closeAgreement':
                this.userAgreement.active = false;
                break;
            case 'showAgreement':
                this.userAgreement.active = true;
                break;
            default:
                break;
        }
    }

}
