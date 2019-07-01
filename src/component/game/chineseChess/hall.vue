<template>
    <div id="hall_main">
        <div class="col-md-12 hall-title">
            <marquee class="scroll_text">欢迎</marquee>
        </div>
        <div class="left-panel col-md-2" :style="{'height':screenHeight-30+'px'}">
            <v-jstree :data="gameList" allowBatch wholeRow allow-batch whole-row @item-click="itemClick()"></v-jstree>
        </div>
        <div class="middle-panel col-md-7" :style="{'height':screenHeight-30+'px','background-color':'#05436C'}">
            <div v-for="(item,i) in tables" class="hall-table" v-bind:key="i">
                <img id="" class="table-user" :src="require('../../../assets/images/hall/nobody.png')">
                <img id="" class="table-table" :src="require('../../../assets/images/hall/chessready.png')">
                <img id="" class="table-user" :src="require('../../../assets/images/hall/nobody.png')">
            </div>
        </div>
        <div class="right-panel col-md-3" :style="{'height':screenHeight-30+'px'}">
            <div class="col-md-12">
                <h4>在线: {{onlineNumbers}}人</h4>
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
                        <td>{{item.username}}</td>
                        <td>{{item.point}}</td>
                        <td>{{item.result}}</td>
                        <td>{{item.status}}</td>
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
                onlineNumbers: 0,
                gameCode: "chineseChess"
            }
        },
        created() {
            if (!this.global.checkOnline()) {
                sessionStorage.clear();
                this.$router.push("/");
                return;
            }
            this.roomList();
            this.global.connectSocket();
            this.bindEvent();
        },
        methods: {
            bindEvent() {
                window.socket.onmessage = (evt) => {
                    console.log(evt.data)
                }
            },
            itemClick() {},
            roomList() {
                let params = {
                    oid: sessionStorage.getItem("onlineToken")
                }
                this.$axios.post(global.apiUrl + "/hall", JSON.stringify(params), resp => {
                    console.log(resp)
                    if (resp.data.result == true) {
                        for (let i = 0; i < 35; i++) {
                            this.tables.push({});
                        }
                        for (let key in global.gameConfig) {
                            let obj = {
                                text: global.gameConfig[key].type,
                                value: key,
                                children: []
                            };
                            for (let i in global.gameConfig[key].list) {
                                obj.children.push({
                                    text: global.gameConfig[key].list[i].name,
                                    value: global.gameConfig[key].list[i].code,
                                    children: []
                                });
                            }
                            this.gameList.push(obj);
                        }
                    }
                }).catch(error=>{

                });
            },
            getUserList() {

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
        width: 18%;
    }

    .table-user:hover {
        border-radius: 3px;
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