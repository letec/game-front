<template>
    <div>
        <div id="chineseChessTableMain" :style="{'height':screenHeight+'px'}">
            <div id="leftPanel" class="col-md-7">
                <div id="chessPanel">
                    <div :row="item.row" :col="item.col" :id="'position_'+item.row+'_'+item.col" 
                        class="panelDiv" v-for="(item,i) in panelMap" v-bind:key="i">
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
                                <td><p><strong>{{ myWinLose }}</strong></p></td>
                                <td><p><strong>{{ enemyWinLose }}</strong></p></td>
                            </tr>
                            <tr>
                                <td><p>我方用时: <span>{{ timeFormat(myUsedTime) }}</span></p></td>
                                <td><p>对方用时: <span>{{ timeFormat(enemyUsedTime) }}</span></p></td>
                            </tr>
                            <tr>
                                <td colspan="2">局面时间: <span> {{ timeFormat(gamingTime) }} </span></td>
                            </tr>
                            <tr>
                                <td colspan="2"><span></span></td>
                            </tr>
                            <tr>
                                <td style="width:33.33%;">
                                    <div style="height:38px">
                                        <button v-if="tableStatus==0" ref="readyBtn" @click="readyPlay()" class="opBtn btn btn-primary">{{ readyBtnText() }}</button>
                                        <button v-if="tableStatus==1&&askedDraw==0" ref="askForDrawBtn" @click="askForDraw()" class="opBtn btn btn-primary">求 和</button>
                                    </div>
                                </td>
                                <td style="width:33.33%;">
                                    <div style="height:38px">
                                        <button v-if="myStatus==0" @click="backToHall()" class="opBtn btn btn-danger">离 开</button>
                                        <button v-if="tableStatus==1" @click="giveUp(0)" class="opBtn btn btn-danger">认 输</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="chatPanel" class="col-md-12">
                        <div id="chatContent" class="col-md-12">
                            <ul ref="chatContent">
                            </ul>
                        </div>
                        <textarea  class="form-control" ref="sendContent" id="sendContent" maxlength="30"></textarea>
                        <button @click="snedChatContent()" ref="sendBtn" id="sendBtn" class="btn btn-primary">发 送</button>
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
                redChessName: {chariot:"车", knight:"马", elephant:"象", guard: "士", king: "帅", soldier:"兵", gunner:"炮"},
                blackChessName: {chariot:"車", knight:"馬", elephant:"相", guard: "仕", king: "將", soldier:"卒", gunner:"砲"},
                screenHeight: document.documentElement.clientHeight,
                panelMap: [],
                oid: sessionStorage.getItem("onlineToken"),
                gameCode: '',
                tableID: '',
                tableStatus: 0,
                seat: '',
                myName: sessionStorage.getItem("username"),
                myStatus: 0,
                myColor: 'redChess',
                myWinLose : '',
                myAvatar: '',
                myUsedTime: 0,
                myChessName: null,
                myTimer: null,
                enemyName: '',
                enemyAvatar: '/static/images/avatar/nobody.png',
                enemyStatus: '',
                enemyColor: '',
                enemyWinLose: '',
                enemyUsedTime: 0,
                enemyChessName: null,
                enemyTimer: null,
                gamingTime: 0,
                selectedChess: null,
                roundTimer: null,
                userTotalLimitTime: 30*60,
                keepAliveTimer: null,
                askedDraw: 0
            }
        },
        created() {
            this.drawPanel();
            this.gameCode = this.$route.params.gameCode;
            this.tableID = this.$route.params.tableID;
            this.seat = this.$route.params.seat;
            this.connectSocket();
        },
        beforeDestroy() {
            this.connector.close();
            this.connector = false;
        },
        methods: {
            timeFormat(second) {
                var h = Math.floor(second / 3600) < 10 ? '0'+Math.floor(second / 3600) : Math.floor(second / 3600);
                var m = Math.floor((second / 60 % 60)) < 10 ? '0' + Math.floor((second / 60 % 60)) : Math.floor((second / 60 % 60));
                var s = Math.floor((second % 60)) < 10 ? '0' + Math.floor((second % 60)) : Math.floor((second % 60));
                return h + ":" + m + ":" + s;
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
                if (this.myStatus == 0) {
                    return '准 备';
                } else if (this.myStatus == 1) {
                    return '取消准备';
                } else if (this.myStatus == 2 || this.tableStatus == 1) {
                    return '';
                }
            },
            updateChessPosition(table, flush) {
                for (let row in table.GAMING_DATA.CHESS_PANEL) {
                    for (let col in table.GAMING_DATA.CHESS_PANEL[row]) {
                        let chess = table.GAMING_DATA.CHESS_PANEL[row][col];
                        let panelRow = (this.myColor == 'redChess') ? row : (row * -1 + 11);
                        let panelCol = (this.myColor == 'redChess') ? col : (col * -1 + 10);
                        if (chess == '') {
                            document.querySelector('#position_'+panelRow+'_'+panelCol).innerHTML = '';
                        } else {
                            let html = '';
                            if (!flush) {
                                if (chess.color == this.myColor) {
                                    html = '<div row="'+panelRow+'" col="'+panelCol+'" class="chessObject myChess '+chess.color+'">'+eval('this.myChessName.'+chess.type)+'</div>';
                                } else {
                                    html = '<div row="'+panelRow+'" col="'+panelCol+'" class="chessObject enemyChess '+chess.color+'">'+eval('this.enemyChessName.'+chess.type)+'</div>';
                                }
                            }
                            document.querySelector('#position_'+panelRow+'_'+panelCol).innerHTML = html;
                        }
                    }
                }
            },
            startGame(table) {
                this.gamingTime = table.GAMING_DATA.TOTAL_TIME;
                for (let i in table.USERS) {
                    if (table.USERS[i].username == this.myName) {
                        this.myColor = table.USERS[i].color;
                        this.myUsedTime = table.USERS[i].USED_TIME;
                    } else {
                        this.enemyUsedTime = table.USERS[i].USED_TIME;
                    }
                }
                this.roundTimer = setInterval(()=>{
                    this.gamingTime ++;
                }, 1000);

                if (this.myColor == 'redChess') {
                    this.myChessName = this.redChessName;
                    this.enemyChessName = this.blackChessName;
                    this.enemyColor = 'blackChess';
                } else {
                    this.myChessName = this.blackChessName;
                    this.enemyChessName = this.redChessName;
                    this.enemyColor = 'redChess';
                }

                this.updateChessPosition(table, false);
                
                this.enabledMove(table);
            },
            disabledMove() {
                let panelDivList = document.querySelectorAll('.panelDiv');
                panelDivList.forEach(item => {
                    item.onclick = function () {};
                });
                let chessList = document.querySelectorAll('.chessObject');
                panelDivList.forEach(item => {
                    if (global.inArray('flash', item.classList)) {
                        item.classList.remove('flash');
                        this.selectedChess = null;
                        return;
                    }
                });
            },
            giveUp(flag) {
                if (flag == 0) {
                    this.$swal.fire({
                        title: '警告',
                        text: "您确定要认输吗?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: 'green',
                        confirmButtonColor: '#d33',
                        cancelButtonText: '再看看',
                        confirmButtonText: '认输了'
                    }).then((result) => {
                        if (!result.value) {
                            return;
                        }
                        this.loseGame(flag);
                    });
                } else {
                    this.loseGame(flag);
                }
            },
            loseGame(flag) {
                window.clearInterval(this.myTimer);
                window.clearInterval(this.enemyTimer);
                window.clearInterval(this.roundTimer);
                let data = {
                    oid: this.oid,
                    action: 'GAME_ACTION',
                    data: {
                        GAME_ACTION: 'GIVE_UP'
                    }
                };
                this.connector.send(JSON.stringify(data));
                if (flag == 1) {
                    this.$swal.fire('游戏结束', '局时耗尽,您输了!', 'info');
                } else {
                    this.$swal.fire('游戏结束', '您主动认输了!', 'info');
                }
            },
            enabledMove(table) {
                if (table.GAMING_DATA.TURN != this.myName) {
                    window.clearInterval(this.myTimer);
                    this.enemyTimer = setInterval(()=>{
                        this.enemyUsedTime ++;
                    }, 1000);
                    this.disabledMove();
                    return;
                } else {
                    window.clearInterval(this.enemyTimer);
                    this.myTimer = setInterval(()=>{
                        if (this.myUsedTime > this.userTotalLimitTime) {
                            this.giveUp(1);
                        }
                        this.myUsedTime ++;
                    }, 1000);
                }
                let panelDivList = document.querySelectorAll('.panelDiv');
                let chessList = document.querySelectorAll('.chessObject');
                panelDivList.forEach(item => {
                    item.onclick = () => {
                        let obj = event.target;
                        if ((global.inArray('panelDiv', obj.classList) || global.inArray('enemyChess', obj.classList)) && this.selectedChess != null) {
                            this.doMoveAction(obj);
                        } else if (global.inArray('chessObject', obj.classList) && global.inArray('myChess', obj.classList)) {
                            if (global.inArray('flash', obj.classList)) {
                                obj.classList.remove('flash');
                                this.selectedChess = null;
                            } else {
                                chessList.forEach(cl => {
                                    cl.classList.remove('flash');
                                });
                                obj.classList.add('flash');
                                this.selectedChess = obj;
                            }
                        }
                    };
                });
            },
            doMoveAction(target) {
                if (this.selectedChess == null) {
                    return;
                }
                this.disabledMove();
                let targetCol = target.getAttribute('col');
                let targetRow = target.getAttribute('row');
                let selectedCol = this.selectedChess.getAttribute('col');
                let selectedRow = this.selectedChess.getAttribute('row');
                let data = {
                    oid: this.oid,
                    action: 'GAME_ACTION',
                    data: {
                        GAME_ACTION: 'MOVE',
                        targetCol: targetCol,
                        targetRow: targetRow,
                        selectedCol: selectedCol,
                        selectedRow: selectedRow
                    }
                };
                this.connector.send(JSON.stringify(data));
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
                this.tableStatus = table.STATUS;
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
            askForDraw() {
                this.askedDraw = 1;
                let data = {
                    oid: this.oid,
                    action: 'GAME_ACTION',
                    data: {
                        GAME_ACTION: 'ASK_FOR_DRAW',
                    }
                };
                this.connector.send(JSON.stringify(data));
            },
            snedChatContent() {
                this.$refs.sendBtn.disabled = true;
                let content = this.$refs.sendContent.value;
                if (content.length > 30) {
                    return;
                }
                setTimeout(()=>{
                    this.$refs.sendBtn.disabled = false;
                }, 3000);
                let data = {
                    oid: this.oid,
                    action: 'GAME_ACTION',
                    data: {
                        GAME_ACTION: 'CHAT',
                        content: content
                    }
                };
                this.connector.send(JSON.stringify(data));
                this.$refs.sendContent.value = '';
            },
            updateChatContent(data) {
                let html = data.from == this.myName ? '<li class="chat-mine">' : '<li class="chat-other">';
                let content = data.content;
                html += '<div class="chat-user"><img src="/static/images/avatar/'+data.avatar+'"><cite>';
                if (data.from == this.myName) {
                    html += '<i>'+data.time+'</i>'+data.from+'</cite></div>';
                } else {
                    html += data.from+'<i>'+data.time+'</i></cite></div>';
                }

                html += '<div class="chat-text">'+data.content+'</div>';
                html += '</li>';
                this.$refs.chatContent.innerHTML += html;
                let height = document.getElementById('chatContent').scrollHeight;
                document.getElementById('chatContent').scrollTop = height;
            },
            gameOver(data) {
                window.clearInterval(this.myTimer);
                window.clearInterval(this.enemyTimer);
                window.clearInterval(this.roundTimer);
                this.updateChessPosition(data.data.table, true);
                this.tableStatus = 0;
                this.myStatus = 0;
                this.enemyStatus = 0;
                this.myUsedTime = 0;
                this.gamingTime = 0;
                this.askedDraw = 0;
            },
            replyForDraw() {
                this.$swal.fire({
                    title: '信息',
                    text: "对方正在向您求和!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: 'green',
                    confirmButtonColor: '#d33',
                    cancelButtonText: '不同意',
                    confirmButtonText: '同意'
                }).then((result) => {
                    let data = {
                        oid: this.oid,
                        action: 'GAME_ACTION',
                        data: {
                            GAME_ACTION: 'REPLY_FOR_DRAW',
                            ANSWER: false
                        }
                    };
                    if (result.value) {
                        data.data.ANSWER = true;
                    }
                    this.connector.send(JSON.stringify(data));
                });
            },
            actions(message){
                try {
                    let data = JSON.parse(message.data);
                    if (typeof data.result == 'undefined') {
                        console.log('server error:' + data);
                        return;
                    }
                    console.log(data);
                    switch (data.data.ACTION) {
                        case 'SEATDOWN':
                            if (data.result == false) {
                                this.$swal.fire("提示", data.message, 'info');
                                this.$router.push('/');
                                return;
                            }
                            break;
                        case 'PLAYER_LEAVE':
                            if (this.tableStatus == 1) {
                                this.$swal.fire(data.message, data.data.LEAVE + ' 逃跑了!', 'info');
                                this.gameOver(data);
                            }
                            this.tableInfo(data.data.table);
                            break;
                        case 'TABLE_UPDATE':
                            this.tableInfo(data.data.table);
                            break;
                        case 'READY':
                            this.tableInfo(data.data.table);
                            break;
                        case 'START_GAME':
                            this.tableInfo(data.data.table);
                            this.startGame(data.data.table);
                            break;
                        case 'MOVE':
                            this.updateChessPosition(data.data.table, false);
                            this.enabledMove(data.data.table);
                            break;
                        case 'GAME_OVER':
                            if (data.message, data.data.WIN != '') {
                                this.$swal.fire(data.message, data.data.WIN + ' 获得了胜利!', 'info');
                            } else {
                                this.$swal.fire(data.message, '本局打和!', 'info');
                            }
                            this.gameOver(data);
                            break;
                        case 'ASK_FOR_DRAW':
                            if (data.data.REQUEST_USER != this.myName) {
                                this.replyForDraw();
                            }
                            break;
                        case 'REFUSE_FOR_DRAW':
                            if (data.data.REPLY_USER != this.myName) {
                                this.$swal.fire('回复', '对方拒绝求和!', 'info');
                            }
                            break;
                        case 'CHAT':
                            this.updateChatContent(data.data);
                            break;
                        default:
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
                        this.keepAliveTimer = setInterval(() => {
                            this.connector.send(JSON.stringify({
                                oid: this.oid,
                                action: 'KEEP_ALIVE',
                            }));
                        }, 20000);
                    };
                    this.connector.onclose = () => {
                        window.clearInterval(this.keepAliveTimer);
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
    .opBtn {
        width: 100px;
    }

    .avatarDiv {
        height: 55px;
    }

    #userPanel td {
        border: 0;
    }

    #userPanel .avatar {
        width: 55px;
        border: 1px solid rgb(170,170,170);
        border-radius: 5px;
    }

    #userPanel .username {
        font-size: 16px;
    }

    #chineseChessTableMain {
        padding: 35px 0 0 120px;
        background-image: url(/static/images/game/chineseChess/tableBack.jpg);
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
        overflow-y: auto;
        padding: 5px;
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
        width: 770px;
        height: 855px;
        background-image: url(/static/images/game/chineseChess/panel.jpg);
        background-size: cover;
        border-radius: 8px;
        box-shadow: 1px 2px 5px 0px black;
    }

    .panelDiv {
        width: 85.5px;
        height: 85.3px;
        float: left;
    }

    body::-webkit-scrollbar {
        display: block;
    }
    body { -ms-overflow-style: block; }

</style>

<style>

    @font-face {
        font-family: 'yanti';
        src: url(/static/images/game/chineseChess/yanti.woff2);
    }

    @keyframes chessFlash {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0;
        }
        to {
            opacity: 1.0;
        }
    }

    @-webkit-keyframes chessFlash {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0;
        }
        to {
            opacity: 1.0;
        }
    }

    #chessPanel .flash {
        animation: chessFlash 1000ms infinite;
        -webkit-animation: chessFlash 1000ms infinite;
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

    #chatPanel #chatContent ul li {
        position: relative;
        font-size: 0;
        padding-left: 20px;
        min-height: 68px;
    }

    #chatPanel .chat-user {
        position: absolute;
        left: 3px;
    }

    #chatPanel .chat-user img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }

    #chatPanel .chat-user cite {
        position: absolute;
        left: 60px;
        top: -2px;
        width: 500px;
        line-height: 24px;
        font-size: 12px;
        white-space: nowrap;
        color: #999;
        text-align: left;
        font-style: normal;
    }

    #chatPanel .chat-user cite i {
        font-style: normal;
    }

    #chatPanel .chat-mine .chat-user cite {
        left: auto;
        right: 60px;
        text-align: right;
    }

    #chatPanel .chat-mine {
        text-align: right;
        padding-left: 0;
        padding-right: 20px;
    }

    #chatPanel .chat-mine .chat-user {
        left: auto;
        right: 3px;
    }

    #chatPanel .chat-other .chat-user cite i {
        padding-left: 10px;
    }

    #chatPanel .chat-mine .chat-user cite i {
        padding-right: 10px;
    }

    #chatPanel #chatContent .chat-text {
        position: relative;
        line-height: 16px;
        margin-top: 25px;
        padding: 8px 15px;
        background-color: #e2e2e2;
        border-radius: 3px;
        color: #333;
        word-break: break-all;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
    }

    #chatPanel #chatContent .chat-mine .chat-text {
        margin-left: 0;
        text-align: left;
        background-color: #5FB878;
        color: #fff;
        right: 35px;
    }

    #chatPanel #chatContent .chat-other .chat-text {
        position: absolute;
        left: 60px;
    }

    #chatPanel #chatContent .chat-text:after {
        content: '';
        position: absolute;
        left: -10px;
        top: 13px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #e2e2e2 transparent transparent;
        /* overflow: hidden; */
        border-width: 10px;
    }

    #chatPanel #chatContent .chat-mine .chat-text:after {
        left: auto;
        right: -10px;
        border-top-color: #5FB878;
    }

</style>