<template>
    <div class="footer">
        <div class="content">
            <div class="tiny_logo"></div>
            <div class="description">
                <h3>做最好的小游戏~</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 999;
        height: 100px;
        background: url(/static/icons/bg_w.png) repeat;
    }

    .content {
        height: 100%;
        width: 40%;
        margin: 0 auto;
    }

    .content div {
        float: left;
    }

    .tiny_logo {
        background: url(/static/icons/shengqu-logo.png) no-repeat 0 0;
        width: 64px;
        height: 66px;
        margin-top: 15px;
    }

    .description {
        margin-left: 160px;
        height: 100%;
    }

    .description h3 {
        line-height: 100px;
        color: aliceblue;
        display: inline;
    }
</style>