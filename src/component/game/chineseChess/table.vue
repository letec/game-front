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
                    <div id="myInfoPanel" class="col-md-6">
                        <p><img src="" alt=""></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div id="enemyInfoPanel" class="col-md-6">
                        <p><img src="" alt=""></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div id="gamePanel" class="col-md-12">
                    <span>时间</span>
                    <button>准备</button>
                    <button>离开</button>
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
</template>

<script>
    import global from "../../../logic/global"
    export default {
        data() {
            return {
                redChessName: {chariot:"车", knight:"马", elephant:"象", guard: "士", king: "帅", soldier:"兵", gunner:"炮"},
                blackChessName: {chariot:"車", knight:"馬", elephant:"相", guard: "仕", king: "將", soldier:"兵", gunner:"砲"},
                screenHeight: document.documentElement.clientHeight,
                panelMap: [],
                oid: sessionStorage.getItem("onlineToken"),
                gameCode: "",
                tableID: "",
                seat: "",
                loading: null,
                myColor: 'redChess'
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
            delete window.socket;
        },
        methods: {
            bindEvent() {
                window.socket.onmessage = (evt) => {
                    console.log(evt.data);
                }
            },
            seatDown() {
                // let timerInterval;
                // this.loading = this.$swal.fire({
                //     title: '加载中.',
                //     html: '正在连接到服务器...',
                //     timer: 2500,
                //     backdrop: `
                //         rgba(0,0,123,0.4)
                //         url("/static/gif/nyan-cat.gif")
                //         left top
                //         no-repeat
                //     `,
                //     onBeforeOpen: () => {
                //         this.$swal.showLoading();
                //     },
                //     onClose: () => {
                //         clearInterval(timerInterval);
                //     }
                // }).then((result) => {
                //     clearInterval(timerInterval);
                // });
                window.socket.send(JSON.stringify({
                    oid: this.oid,
                    action: 'SEATDOWN',
                    gameCode: this.gameCode,
                    tableID: this.tableID,
                    seat: this.seat,
                }));
            },
            drawPanel(){
                this.panelMap = [];
                for (let r = 1; r <= 10; r++) {
                    for (let c = 1; c <= 9; c++) {
                        this.panelMap.push({col:c, row:r});
                    }
                }
            },
            putChess(){
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
            tableInfo(table){
                table
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
                        default:
                            console.log(data.message);
                            break;
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            connectSocket() {
                if (typeof window.socket == 'undefined') {
                    window.socket = new WebSocket(global.websocketUrl);
                    window.socket.onmessage = (message) => {
                        this.actions(message);
                    };
                    window.socket.onopen = () => {
                        this.seatDown();
                    };
                    window.socket.onclose = () => {
                        delete window.socket;
                        console.log('您已断开连接!');
                    };
                    window.socket.onerror = (error) => {
                    };
                }
            }
        }
    }
</script>

<style scoped>

    #chineseChessTableMain {
        padding: 35px 0 0 120px;
    }

    #gamePanel {
        border: 1px solid green;
        height: 100px;
    }

    #userPanel {
        padding: 0;
        height: 400px;
        border: 1px solid green;
    }

    #myInfoPanel {
        float: left;
        padding: 0;
        height: 100%
    }

    #enemyInfoPanel {
        float: left;
        padding: 0;
        height: 100%
    }

    #chatPanel {
        height: 400px;
        border: 1px solid green;
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
        background-image: url(/static/game/chineseChess/panel.jpg);
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
        src: url(/static/game/chineseChess/yanti.woff2);
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