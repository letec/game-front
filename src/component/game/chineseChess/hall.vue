<template>
    <div id="hall_main">
        <div class="col-md-12 hall-title">
            <marquee class="scroll_text">欢迎</marquee>
        </div>
        <div class="left-panel col-md-2" :style="{'height':screenHeight-30+'px'}">
            <v-jstree :data="gameList" @item-click="itemClick()"></v-jstree>
        </div>
        <div class="middle-panel col-md-7" :style="{'height':screenHeight-30+'px','background-color':'#05436C'}">
            <div v-for="(item,i) in tables" class="hall-table" v-bind:key="i">
                <img @click="seatDown(item.ID, 'PlayerA')" :ref="'tables_'+i+'_A'" class="table-user" :src="item.PlayerAImg">
                <img :ref="'tables_'+i+'_T'" class="table-table" :src="item.TableImg">
                <img @click="seatDown(item.ID, 'PlayerB')" :ref="'tables_'+i+'_B'" class="table-user" :src="item.PlayerBImg">
            </div>
        </div>
        <div class="right-panel col-md-3" :style="{'height':screenHeight-30+'px'}">
            <div class="col-md-12">
                <h4>在线: {{userList.length}}人</h4>
            </div>
            <div id="user-list" class="col-md-12">
                <table class="table table-default">
                    <tr>
                        <th>玩家</th>
                        <th>积分</th>
                        <th>胜负</th>
                        <th>状态</th>
                    </tr>
                    <tr v-for="(item,u) in userList" v-bind:key="u">
                        <td>{{item.UserName}}</td>
                        <td>{{item.Score}}</td>
                        <td>{{item.Win}} / {{item.Lose}}</td>
                        <td>{{userStatus[item.Status]}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import global from "../../../logic/global"
    export default {
        data() {
            return {
                screenHeight: document.documentElement.clientHeight,
                global: global,
                tables: [],
                gameList: [],
                userList: [],
                gameCode: "ChineseChess",
                userStatus: ["空闲中", "准备中", "游戏中"],
                dataTimer: ""
            }
        },
        created() {
            if (!this.global.checkOnline()) {
                sessionStorage.clear();
                this.$router.push("/");
                return;
            }
            this.gameList = [];
            for (let key in global.gameConfig) {
                let obj = {
                    text: global.gameConfig[key].type,
                    value: key,
                    children: []
                };
                for (let i in global.gameConfig[key].list) {
                    obj.children.push({
                        text: global.gameConfig[key].list[i].name,
                        value: global.gameConfig[key].list[i].code
                    });
                }
                this.gameList.push(obj);
            }
            this.intoHall();
            this.global.connectSocket();
            this.bindEvent();
            this.dataTimer = setInterval(this.roomInfo, 5000)
        },
        beforeDestroy() {
            clearInterval(this.dataTimer);
        },
        methods: {
            bindEvent() {
                window.socket.onmessage = (evt) => {
                    console.log(evt.data);
                }
            },
            intoHall() {
                this.$axios.post(global.apiUrl + "/intohall", JSON.stringify({
                    oid: sessionStorage.getItem("onlineToken"),
                    gameCode: this.gameCode
                })).then(resp => {
                    if (resp.data == "FAIL") {
                        this.$layer.msg("进入房间失败!");
                        this.$router.push("/")
                        return;
                    }
                    this.roomInfo();
                }).catch(error => {
                    console.log(error);
                    this.$layer.msg("进入房间失败!");
                    this.$router.push("/")
                });
            },
            itemClick() {
                let game = null;
                for (let x in this.gameList) {
                    for (let y in this.gameList[x].children) {
                        if (this.gameList[x].children[y].selected == true) {
                            game = this.gameList[x].children[y].value;
                            break;
                        }
                    }
                }
                if (!this.global.inArray(game, [null, this.gameCode])) {
                    this.$router.push("/" + game)
                }
            },
            roomInfo() {
                this.$axios.post(global.apiUrl + "/hall", JSON.stringify({
                    oid: sessionStorage.getItem("onlineToken"),
                    gameCode: this.gameCode
                })).then(resp => {
                    if (resp.result == true) {
                        this.userList = [];
                        for (let u in resp.data.users) {
                            this.userList.push(resp.data.users[u]);
                        }
                        this.tables = [];
                        for (let i = 0; i < resp.data.tables.length; i++) {
                            let obj = resp.data.tables[i];
                            obj.PlayerAImg = obj.PlayerA == "" ? require(
                                '../../../assets/images/hall/nobody.png') : require(
                                '../../../assets/avatar/' + this.displayAvatar(obj.PlayerA) + '.jpg');
                            obj.TableImg = obj.Status == "0" ? require(
                                '../../../assets/images/hall/chessready.png') : require(
                                "../../../assets/images/hall/chessgaming.png");
                            obj.PlayerBImg = obj.PlayerB == "" ? require(
                                '../../../assets/images/hall/nobody.png') : require(
                                '../../../assets/avatar/' + this.displayAvatar(obj.PlayerB) + '.jpg');
                            this.tables.push(obj);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            seatDown(tableID, seat) {
                let msg = this.$layer.msg('加载中...', {icon: 16, shade: [0.5, '#f5f5f5'], scrollbar: false, offset: '0px', time: 99999});
                this.$axios.post(global.apiUrl + "/seatdown", JSON.stringify({
                    oid: sessionStorage.getItem("onlineToken"),
                    gameCode: this.gameCode,
                    tableID: tableID,
                    seat: seat
                })).then(resp => {
                    this.$layer.close(msg);
                    this.$router.push("/chinessChessTable");
                    console.log(resp);
                }).catch(error => {
                    this.$layer.close(msg);
                    console.log(error);
                });
            },
            displayAvatar(userid){
                for (let u in this.userList) {
                    if (this.userList[u].UserID == userid) {
                        return this.userList[u].Avatar;
                    }
                }
                return "";
            }
        }
    }
</script>

<style scoped>
    .hall-title {
        height: 30px;
        background-color: papayawhip;
    }

    .hall-title marquee {
        line-height: 30px;
    }

    .left-panel,
    .middle-panel,
    .right-panel {
        float: left;
        background-color: #f0f8f6;
    }

    .left-panel {
        padding: 1% 0 0 1%;
    }

    .middle-panel {
        padding: 1.5% 0 0 1.5%;
    }

    .left_game_title {
        font-size: 16px;
        margin-left: 3%;
    }

    .left_game_title a:hover {
        text-decoration: none;
    }

    .hall-table {
        width: 20%;
        float: left;
        height: 9.1%;
        margin-bottom: 4.2%;
    }

    .hall-right h4 {
        color: yellow;
        font-weight: bold;
    }

    .table-user {
        border-radius: 3px;
        width: 18%;
    }

    .table-user:hover {
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.4);
    }

    .user-b {
        margin-left: 4%;
        margin-top: 1.5%;
    }

    .table-table {
        width: 40%;
    }

    #user-list table tr td,
    #user-list table tr th {
        border: 0px;
        font-family: '黑体';
    }
</style>