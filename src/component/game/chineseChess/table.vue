<template>
    <div>
        <div>
            sadasdasdas
        </div>
    </div>
</template>

<script>
    import global from "../../../logic/global"
    export default {
        data() {
            return {
                gameCode: "",
                tableID: "",
                seat: ""
            }
        },
        created() {
            this.gameCode = this.$route.query.gameCode;
            this.tableID = this.$route.query.tableID;
            this.seat = this.$route.query.seat;
            global.connectSocket();
        },
        beforeDestroy() {
            this.$axios.post(global.apiUrl + "/standup", JSON.stringify({
                oid: sessionStorage.getItem("onlineToken"),
                gameCode: this.gameCode,
                tableID: this.tableID,
                seat: this.seat
            }));
            window.socket.close();
            delete window.socket;
        },
        methods: {
            bindEvent() {
                window.socket.onmessage = (evt) => {
                    console.log(evt.data);
                }
            },
        }
    }
</script>