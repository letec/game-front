<template>
    <div>
        <header-view></header-view>
        <div id="settingPanel">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">邮箱地址</label>
                        <input type="email" class="form-control" ref="email" disabled>
                    </div>
                    <div class="form-group">
                        <label for="oldPassword">旧密码</label>
                        <input type="password" class="form-control" id="oldPassword" ref="oldPassword">
                    </div>
                    <div class="form-group">
                        <label for="newPassword">新密码</label>
                        <input type="password" class="form-control" id="newPassword" ref="newPassword">
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">再次输入密码</label>
                        <input type="password" class="form-control" id="confirmPassword" ref="confirmPassword">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-success">确定</button>
                    </div>
                </form>
            </div>
            <div class="col-md-7">
                <div id="avatarPanel">
                    <img :src="item" v-for="(item,i) in avatars" v-bind:key="i">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #settingPanel {
        margin: 0 auto;
        padding: 50px;
    }

    #avatarPanel {
        height: auto;
    }
</style>

<script>
    import global from "../../logic/global"
    export default {
        data() {
            return {
                avatars: []
            }
        },
        created() {
            this.imgList();
        },
        methods: {
            imgList() {
                for (let i = 31; i < 221; i++) {
                    let flag = i;
                    if (i < 100) {
                        flag = '0' + flag.toString();
                    }
                    this.avatars.push('../../assets/avatar/20190703' + flag + '.jpg');
                }
            }
        }
    }

</script>