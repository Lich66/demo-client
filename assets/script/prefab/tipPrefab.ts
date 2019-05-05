const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tipLabel: cc.Label = null;

    onLoad() { }

    initWithData(data: string) {
        console.log('tipPrefab:'+data);
        this.tipLabel.string = data;
        setTimeout(()=>{
            this.node.active = false;
        },1200);
    }
}
