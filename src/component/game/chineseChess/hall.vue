<template>
    <div id="hall_main">
        <header-view></header-view>
        <div class="middle-panel col-md-12" :style="{'height':screenHeight-90+'px','background-color':'#05436C'}">
            <div class="col-md-12">
                <marquee class="scroll_text">欢迎</marquee>
            </div>
            <div v-for="(item,i) in tables" class="hall-table" v-bind:key="i">
                <img @click="seatDown(i+1, '1')" :ref="'tables_'+i+'_1'" class="table-user" :src="item.PlayerAImg">
                <img :ref="'tables_'+i+'_T'" class="table-table" :src="item.TableImg">
                <img @click="seatDown(i+1, '2')" :ref="'tables_'+i+'_2'" class="table-user" :src="item.PlayerBImg">
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
            this.dataTimer = setInterval(this.roomInfo, 2500);
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
                            obj.PlayerAImg = obj.USERS[0].userId == "" ? '/static/images/avatar/nobody.png' : 
                            '/static/images/avatar/' + obj.USERS[0].avatar;
                            obj.TableImg = obj.Status == "0" ? 'static/images/game/chineseChess/hall/chessready.png' : 
                            'static/images/game/chineseChess/hall/chessgaming.png';
                            obj.PlayerBImg = obj.USERS[1].userId == "" ? '/static/images/avatar/nobody.png' : 
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

    .scroll_text {
        height: 50px;
        line-height: 50px;
        background-color: inherit;
        color: antiquewhite;
    }

    .middle-panel {
        overflow-y: auto;
    }

    .middle-panel::-webkit-scrollbar {
        display: block;
    }

    .middle-panel, .right-panel {
        float: left;
        background-color: #f0f8f6;
    }

    .hall-table {
        width: 10%;
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
        cursor: pointer;
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

</style>