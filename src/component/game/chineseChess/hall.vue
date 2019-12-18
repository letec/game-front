<template>
    <div>
        <div class="col-md-12 hall-title">
            <marquee class="scroll_text">欢迎</marquee>
        </div>
        <div class="middle-panel col-md-9" :style="{'height':screenHeight-30+'px','background-color':'#05436C'}">
            <div v-for="(item,i) in tables" class="hall-table" v-bind:key="i">
                <img @click="seatDown(i+1, '1')" :ref="'tables_'+i+'_1'" class="table-user" :src="item.PlayerAImg">
                <img :ref="'tables_'+i+'_T'" class="table-table" :src="item.TableImg">
                <img @click="seatDown(i+1, '2')" :ref="'tables_'+i+'_2'" class="table-user" :src="item.PlayerBImg">
            </div>
        </div>
        <div class="right-panel col-md-3" :style="{'height':screenHeight-30+'px'}">
            <div class="col-md-12">
                <!-- <h4>在线: {{userList.length}}人</h4> -->
            </div>
            <div id="user-list" class="col-md-12">
                <table class="table table-default">
                    <tr>
                        <th>玩家</th>
                        <th>积分</th>
                        <th>胜负</th>
                        <th>状态</th>
                    </tr>
                    <!-- <tr v-for="(item,u) in userList" v-bind:key="u">
                        <td>{{item.UserName}}</td>
                        <td>{{item.Score}}</td>
                        <td>{{item.Win}} / {{item.Lose}}</td>
                        <td>{{userStatus[item.Status]}}</td>
                    </tr> -->
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
                tables: [],
                gameList: [],
                gameCode: "ChineseChess",
                userStatus: ["空闲中", "准备中", "游戏中"],
                dataTimer: ""
            }
        },
        created() {
            if (!global.checkOnline()) {
                sessionStorage.clear();
                this.$router.push("/");
                return;
            }
            this.intoHall();
            this.dataTimer = setInterval(this.roomInfo, 5000)
        },
        beforeDestroy() {
            clearInterval(this.dataTimer);
        },
        methods: {
            intoHall() {
                this.$axios.post(global.apiUrl + "/user/intohall", {
                    oid: sessionStorage.getItem("onlineToken"),
                    gameCode: this.gameCode
                }).then(resp => {
                    if (resp.result == false) {
                        this.$swal.fire("提示", "进入房间失败!", "error");
                        this.$router.push("/");
                        return;
                    }
                    this.roomInfo();
                }).catch(error => {
                    console.log(error);
                    this.$swal.fire("提示", "进入房间失败!", "error");
                    this.$router.push("/");
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
                if (!global.inArray(game, [null, this.gameCode])) {
                    this.$router.push("/" + game);
                }
            },
            roomInfo() {
                let oid = sessionStorage.getItem("onlineToken");
                this.$axios.post(global.apiUrl + "/hall", {oid: oid, gameCode: this.gameCode}).then(resp => {
                    if (resp.result == true) {
                        this.tables = [];
                        for (let i = 0; i < resp.data.tables.length; i++) {
                            let obj = resp.data.tables[i];
                            obj.PlayerAImg = obj.USERS[0].userId == "" ? '/static/images/game/chineseChess/hall/nobody.png' : 
                            '/static/images/avatar/' + obj.USERS[0].avatar;
                            obj.TableImg = obj.Status == "0" ? 'static/images/game/chineseChess/hall/chessready.png' : 
                            'static/images/game/chineseChess/hall/chessgaming.png';
                            obj.PlayerBImg = obj.USERS[1].userId == "" ? '/static/images/game/chineseChess/hall/nobody.png' : 
                            '/static/images/avatar/' + obj.USERS[1].avatar;
                            this.tables.push(obj);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            seatDown(tableID, seat) {
                this.$axios.post(global.apiUrl + "/table/seatdown", {
                    oid: sessionStorage.getItem("onlineToken"),
                    gameCode: this.gameCode,
                    tableID: tableID,
                    seat: seat
                }).then(resp => {
                    if (resp.result == true) {
                        this.$router.push({
                            name: "chinessChessTable",
                            params: { gameCode: this.gameCode, tableID: tableID, seat: seat}
                        });
                    } else {
                        this.$swal.fire("提示", resp.message, "error");
                    }
                    console.log(resp);
                }).catch(error => {
                    console.log(error);
                });
            },
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

    .middle-panel,
    .right-panel {
        float: left;
        background-color: #f0f8f6;
    }

    .middle-panel {
        padding: 1.5% 0 0 1.5%;
        overflow-y: auto;
    }

    .middle-panel::-webkit-scrollbar {
        display: block;
    }

    .hall-table {
        width: 14%;
        float: left;
        height: 9%;
        margin-bottom: 4%;
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