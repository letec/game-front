<template>
    <div>
        <div id="chineseChessTableMain" :style="{'height':screenHeight+'px'}">
            <div id="leftPanel" class="col-md-7">
                <div id="chessPanel">
                    <div :id="'position_'+item.row+'_'+item.col" class="panelDiv" v-for="(item,i) in panelMap" v-bind:key="i">
                        
                    </div>
                </div>
            </div>
            <div id="rightPanel" class="col-md-5">
                <div id="userPanel" class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h3>中国象棋</h3></div>
                        <div class="panel-body">
                            <p>桌面信息</p>
                        </div>
                        <table class="table">
                            <tr>
                                <td><div class="avatarDiv"><img class="avatar" :src="myAvatar" alt=""></div></td>
                                <td><img class="avatar" :src="enemyAvatar" alt=""></td>
                            </tr>
                            <tr>
                                <td><p class="username"><strong>{{myName}}</strong></p></td>
                                <td><p>{{enemyName}}</p></td>
                            </tr>
                            <tr>
                                <td><p>{{ showStatus(myStatus) }}</p></td>
                                <td><p>{{ showStatus(enemyStatus) }}</p></td>
                            </tr>
                            <tr>
                                <td><p><strong>{{myWinLose}}</strong></p></td>
                                <td><p><strong>{{enemyWinLose}}</strong></p></td>
                            </tr>
                            <tr>
                                <td><p>我方用时: <span></span></p></td>
                                <td><p>对方用时: <span></span></p></td>
                            </tr>
                            <tr>
                                <td colspan="2">局面时间:</td>
                            </tr>
                            <tr>
                                <td colspan="2"><span></span></td>
                            </tr>
                            <tr>
                                <td><button v-if="readyBtnText() != ''" @click="readyPlay()" class="btn btn-primary">{{ readyBtnText() }}</button></td>
                                <td><button v-if="this.myStatus == 0" @click="backToHall()" class="btn btn-danger">离 开</button></td>
                            </tr>
                        </table>
                    </div>
                    <div id="chatPanel" class="col-md-12">
                        <div id="chatContent" class="col-md-12">

                        </div>
                        <textarea class="form-control" id="sendContent"></textarea>
                        <button id="sendBtn" class="btn btn-primary">发 送</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import global from "../../../logic/global"
    export default {
        data() {
            return {
                connector: false,
                blackChessName: {chariot:"车", knight:"马", elephant:"象", guard: "士", king: "帅", soldier:"兵", gunner:"炮"},
                redChessName: {chariot:"車", knight:"馬", elephant:"相", guard: "仕", king: "將", soldier:"兵", gunner:"砲"},
                screenHeight: document.documentElement.clientHeight,
                panelMap: [],
                oid: sessionStorage.getItem("onlineToken"),
                gameCode: "",
                tableID: "",
                seat: "",
                loading: null,
                myName: sessionStorage.getItem("username"),
                myStatus: 0,
                myColor: 'redChess',
                myWinLose : '',
                myAvatar: '',
                enemyName: '',
                enemyAvatar: '/static/images/avatar/nobody.png',
                enemyStatus: '',
                enemyWinLose: ''
            }
        },
        created() {
            this.drawPanel();
            this.gameCode = this.$route.params.gameCode;
            this.tableID = this.$route.params.tableID;
            this.seat = this.$route.params.seat;
            this.connectSocket();
        },
        mounted() {
            this.putChess();
        },
        beforeDestroy() {
            this.connector.close();
            this.connector = false;
        },
        methods: {
            bindEvent() {
                this.connector.onmessage = (evt) => {
                    console.log(evt.data);
                }
            },
            seatDown() {
                this.connector.send(JSON.stringify({
                    oid: this.oid,
                    action: 'SEATDOWN',
                    gameCode: this.gameCode,
                    tableID: this.tableID,
                    seat: this.seat,
                }));
            },
            drawPanel() {
                this.panelMap = [];
                for (let r = 1; r <= 10; r++) {
                    for (let c = 1; c <= 9; c++) {
                        this.panelMap.push({col:c, row:r});
                    }
                }
            },
            showStatus(status) {
                if (status === 0) {
                    return '就坐';
                } else if (status === 1) {
                    return '准备';
                } else if (status === 2) {
                    return '游戏中';
                }
                return '';
            },
            readyBtnText() {
                if (this.myStatus === 0) {
                    return '准 备';
                } else if (this.myStatus === 1) {
                    return '取消准备';
                } else if (this.myStatus === 2) {
                    return '';
                }
            },
            putChess() {
                let myChess = [];
                let enemyChess = [];
                let enemyColor = '';
                if (this.myColor == 'redChess') {
                    myChess = this.redChessName;
                    enemyChess = this.blackChessName;
                    enemyColor = 'blackChess';
                } else {
                    myChess = this.blackChessName;
                    enemyChess = this.redChessName;
                    enemyColor = 'redChess';
                }
                let chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.chariot+'</div>';
                document.querySelector('#position_1_1').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.knight+'</div>';
                document.querySelector('#position_1_2').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.elephant+'</div>';
                document.querySelector('#position_1_3').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.guard+'</div>';
                document.querySelector('#position_1_4').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.king+'</div>';
                document.querySelector('#position_1_5').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.guard+'</div>';
                document.querySelector('#position_1_6').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.elephant+'</div>';
                document.querySelector('#position_1_7').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.knight+'</div>';
                document.querySelector('#position_1_8').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.chariot+'</div>';
                document.querySelector('#position_1_9').innerHTML = chess;
        
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.gunner+'</div>';
                document.querySelector('#position_3_2').innerHTML = chess;
                document.querySelector('#position_3_8').innerHTML = chess;
        
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';
                document.querySelector('#position_4_1').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';
                document.querySelector('#position_4_3').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';
                document.querySelector('#position_4_5').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';
                document.querySelector('#position_4_7').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';
                document.querySelector('#position_4_9').innerHTML = chess;
                chess = '<div class="chessObject '+enemyColor+'">'+enemyChess.soldier+'</div>';

                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';
                document.querySelector('#position_7_1').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';
                document.querySelector('#position_7_3').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';
                document.querySelector('#position_7_5').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';
                document.querySelector('#position_7_7').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';
                document.querySelector('#position_7_9').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.soldier+'</div>';

                chess = '<div class="chessObject '+this.myColor+'">'+myChess.gunner+'</div>';
                document.querySelector('#position_8_2').innerHTML = chess;
                document.querySelector('#position_8_8').innerHTML = chess;

                document.querySelector('#position_10_1').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.knight+'</div>';
                document.querySelector('#position_10_2').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.elephant+'</div>';
                document.querySelector('#position_10_3').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.guard+'</div>';
                document.querySelector('#position_10_4').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.king+'</div>';
                document.querySelector('#position_10_5').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.guard+'</div>';
                document.querySelector('#position_10_6').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.elephant+'</div>';
                document.querySelector('#position_10_7').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.knight+'</div>';
                document.querySelector('#position_10_8').innerHTML = chess;
                chess = '<div class="chessObject '+this.myColor+'">'+myChess.chariot+'</div>';
                document.querySelector('#position_10_9').innerHTML = chess;
            },
            readyPlay() {
                let data = {
                    oid: this.oid,
                    action: 'GAME_ACTION',
                    data: { GAME_ACTION: 'READY' }
                };
                this.connector.send(JSON.stringify(data));
            },
            backToHall() {
                this.connector.close();
                delete this.connector;
                this.$router.push({
                    'name': 'chinessChess'
                });
            },
            tableInfo(table) {
                table.USERS.forEach(item => {
                    let avatar = item.avatar ? item.avatar : 'nobody.png';
                    if (item.username == this.myName) {
                        this.myAvatar = '/static/images/avatar/' + avatar;
                        this.myStatus = item.status;
                        this.myWinLose = '';
                    } else {
                        this.enemyName = item.username;
                        this.enemyAvatar = '/static/images/avatar/' + avatar;
                        this.enemyStatus = item.status;
                        this.enemyWinLose = '';
                    }
                });
            },
            actions(message){
                try {
                    let data = JSON.parse(message.data);
                    if (typeof data.result == 'undefined') {
                        console.log('server error:' + data);
                        return;
                    }
                    switch (data.data.ACTION) {
                        case 'SEATDOWN':
                            if (data.result == false) {
                                this.$swal.fire("提示", data.message, "info");
                                // this.$router.push('/');
                                // return;
                            }
                            break;
                        case 'TABLE_UPDATE':
                            this.tableInfo(data.data.table);
                            break;
                        case 'READY':
                            break;
                        default:
                            console.log(data.message);
                            break;
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            connectSocket() {
                if (this.connector == false) {
                    this.connector = new WebSocket(global.websocketUrl);
                    this.connector.onmessage = (message) => {
                        this.actions(message);
                    };
                    this.connector.onopen = () => {
                        this.seatDown();
                    };
                    this.connector.onclose = () => {
                        delete this.connector;
                        console.log('您已断开连接!');
                    };
                    this.connector.onerror = (error) => {
                    };
                }
            }
        }
    }
</script>

<style scoped>

    .avatarDiv {
        height: 50px;
    }

    #userPanel .avatar {
        width: 50px;
    }

    #userPanel .username {
        font-size: 16px;
    }

    #chineseChessTableMain {
        padding: 35px 0 0 120px;
    }

    #userPanel {
        text-align: center;
        padding: 0;
        height: 220px;
        padding: 50px;
    }

    #chatPanel {
        height: 400px;
    }

    #chatContent {
        border-radius: 3px;
        margin-top: 15px;
        border: 1px solid rgb(190, 190, 190);
        width: 100%;
        height: 250px;
    }

    #chatPanel textarea {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        resize: none;
    }

    #sendBtn {
        min-width: 85px;
        float: right;
        margin-top: 10px;
    }
    #leftPanel {
        float: left;
        padding: 0;
        margin: 0;
    }

    #rightPanel {
        float: left;
        padding: 0;
        margin: 0;
    }

    #chessPanel {
        width: 769.5px;
        height: 855px;
        background-image: url(/static/images/game/chineseChess/panel.jpg);
        background-size: cover;
    }

    .panelDiv {
        width: 85.5px;
        height: 85.3px;
        float: left;
    }
</style>

<style>

    @font-face {
        font-family: 'yanti';
        src: url(/static/images/game/chineseChess/yanti.woff2);
    }

    #chineseChessTableMain #chessPanel .chessObject {
        font-size: 49px;
        text-align: center;
        line-height: 63px;
        background-color: rgb(178,131,87);
        width: 70px;
        height: 70px;
        border-radius: 50px;
        margin: 10px 0 0 10px;
        font-family: "yanti";
        cursor: pointer;
    }

    #chineseChessTableMain #chessPanel .redChess {
        border: 2px solid rgb(118,0,12);
        color: rgb(118,0,12);
        box-shadow: 0 0 0 2px rgb(178,131,87), 0 0 0 5px rgb(118,0,12), 3px 3px 4px 3px black;
    }

    #chineseChessTableMain #chessPanel .blackChess {
        border: 3px solid rgb(61,42,19);
        color: rgb(61,42,19);
        box-shadow: 0 0 0 2px rgb(178,131,87), 0 0 0 5px rgb(61,42,19), 3px 3px 4px 3px black;
    }
</style>