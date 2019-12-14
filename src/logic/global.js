const apiUrl = "http://localhost:8081"

const gameConfig = {
    chess: {
        number: 1,
        type: "棋类",
        code: "CHESS",
        imgs: [
            {
                src: require("../assets/images/website/chess_t.jpg"),
                path: "/chinessChess"
            },
            {
                src: require("../assets/images/website/wuzi_t.jpg"),
                path: "/lineFive",
            }
        ],
        list: [
            {
                name: "中国象棋",
                code: "ChineseChess",
                path: "/chinessChess",
                img: require("../assets/images/website/chess_t.jpg"),
                description: "中国象棋是起源于中国的一种棋戏，属于二人对抗性游戏的一种，在中国有着悠久的历史。由于用具简单，趣味性强，成为流行极为广泛的棋艺活动。",
                statuc: 'icon_1'
            },
            {
                name: "五子棋",
                code: "LineFive",
                path: "/lineFive",
                img: require("../assets/images/website/wuzi_t.jpg"),
                description: "五子棋是世界智力运动会竞技项目之一，是一种两人对弈的纯策略型棋类游戏，通常双方分别使用黑白两色的棋子，下在棋盘直线与横线的交叉点上，先形成5子连线者获胜。",
                icon: 'icon_1'
            }
        ]
    },
    pocker: {
        number: 2,
        type: "牌类",
        code: "POCKER",
        imgs: [
            {
                src: require("../assets/images/website/dizhu_t.jpg"),
                path: "/dizhu"
            },
            {
                src: require("../assets/images/website/blackjack_t.jpg"),
                path: "/blackJack",
            }
        ],
        list: [
            {
                name: "斗地主",
                code: "Dizhu",
                path: "/dizhu",
                img: require("../assets/images/website/dizhu_t.jpg"),
                description: "斗地主，是一种在中国流行的纸牌游戏。是关于旧社会阶级斗争详见土地改革运动。 斗地主是一种扑克游戏。游戏最少由3个玩家进行，用一副54张牌（连鬼牌），其中一方为地主，其余两家为另一方，双方对战，先出完牌的一方获胜。该扑克游戏最初流行于中国湖北武汉市汉阳区，现已逐渐在全球各地流行。",
                icon: 'icon_2'
            },
            {
                name: "21点",
                code: "BlackJack",
                path: "/blackJack",
                img: require("../assets/images/website/blackjack_t_2.jpg"),
                description: "21点又名黑杰克（Blackjack），起源于法国，已流传到世界各地，有着悠久的历史。现在在世界各地的赌场中都可以看到二十一点，随着互联网的发展，二十一点开始走向网络时代。该游戏由2到6个人玩，使用除大小王之外的52张牌，游戏者的目标是使手中的牌的点数之和不超过21点且尽量大。",
                icon: 'icon_1'
            },
        ]
    },
    casual: {
        number: 3,
        type: "休闲",
        code: "CASUAL",
        imgs: [
            {
                src: require("../assets/images/website/snack_t.jpg"),
                path: "/snack"
            }
        ],
        list: [
            {
                name: "贪吃蛇",
                code: "Snack",
                path: "/snack",
                img: require("../assets/images/website/snack_t.jpg"),
                description: "贪吃蛇游戏是一款经典的益智游戏，有PC和手机等多平台版本。既简单又耐玩。该游戏通过控制蛇头方向吃蛋，从而使得蛇变得越来越长。",
                icon: 'icon_2'
            }
        ]
    },
};

function checkOnline() {
    return sessionStorage.getItem("onlineToken") != null && sessionStorage.getItem("username") != null;
}

function connectSocket() {
    if (typeof window.socket == 'undefined') {
        window.socket = new WebSocket("ws://localhost:8082/ws");
        window.socket.onopen = () => {
            window.socket.send('{"sd":"s"}');
        };
        window.socket.onclose = () => {
            setTimeout(connectSocket(), 3000);
        };
        window.socket.onerror = (error) => {
        };
    }
}

function inArray(val, arr) {
    for (let i in arr) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

export default { gameConfig, apiUrl, checkOnline, connectSocket, inArray }
