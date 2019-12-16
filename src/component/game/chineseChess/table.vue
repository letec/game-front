<template>
    <div>
        <div>
            
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
            this.connectSocket();
        },
        beforeDestroy() {
            this.$axios.post(global.apiUrl + "/standup", {
                oid: sessionStorage.getItem("onlineToken"),
                gameCode: this.gameCode,
                tableID: this.tableID,
                seat: this.seat
            });
            window.socket.close();
            delete window.socket;
        },
        methods: {
            bindEvent() {
                window.socket.onmessage = (evt) => {
                    console.log(evt.data);
                }
            },
            connectSocket() {
                if (typeof window.socket == 'undefined') {
                    window.socket = new WebSocket(global.websocketUrl);
                    window.socket.onopen = () => {
                        window.socket.send('{"sd":"s"}');
                    };
                    window.socket.onclose = () => {
                        setTimeout(this.connectSocket(), 3000);
                    };
                    window.socket.onerror = (error) => {
                    };
                }
            }
        }
    }
</script>