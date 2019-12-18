<template>
    <div>
        <header-view></header-view>
        <div id="settingPanel">
            <div id="leftPanel" class="col-md-7">
                <p><strong>请选择您的头像:</strong></p>
                <div id="avatarPanel">
                    <img :class="{'active':item.active}" class="avatar" @click="chooseAvatar(item.fileName)" 
                    :src="item.url" v-for="(item,i) in avatars" v-bind:key="i">
                </div>
            </div>
            <div id="rightPanel" class="col-md-5">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">邮箱地址</label>
                        <input type="email" class="form-control" ref="email" disabled>
                    </div>
                    <div class="form-group">
                        <label for="oldPassword">旧密码</label>
                        <input type="password" class="form-control" id="oldPassword" ref="oldPassword" placeholder="不修改无需填写">
                    </div>
                    <div class="form-group">
                        <label for="newPassword">新密码</label>
                        <input type="password" class="form-control" id="newPassword" ref="newPassword" placeholder="不修改无需填写">
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">再次输入密码</label>
                        <input type="password" class="form-control" id="confirmPassword" ref="confirmPassword" placeholder="不修改无需填写">
                    </div>
                    <div class="form-group">
                        <button id="btnSubmit" @click="submit()" type="button" class="btn btn-success">确 定</button>
                    </div>
                </form>
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

    #leftPanel {
        padding: 50px 100px 100px 100px;
        float: left;
    }

    #rightPanel {
        padding: 50px 100px 100px 0px;
        float: left;
    }

    #btnSubmit {
        width: 80px;
        float: right;
    }

    .avatar {
        display: inline-block;
        border-radius: 5px;
        margin: 4px 4px 4px 0px;
        cursor: pointer;
    }

    .active {
        box-shadow: 0 0 0 3px rgb(228, 91, 255);
    }
</style>

<script>
    import global from "../../logic/global"
    export default {
        data() {
            return {
                avatars: [],
                myAvatar: ''
            }
        },
        created() {
            this.imgList();
            this.userInfo();
        },
        methods: {
            userInfo() {
                this.$axios.post(global.apiUrl + "/user/info", {oid: sessionStorage.getItem("onlineToken")}).then(resp => {
                    console.log(resp)
                    if (resp.result == true) {
                        if (resp.data.Email == "") {
                            this.$refs.email.removeAttribute('disabled');
                        } else {
                            this.$refs.email.value = resp.data.Email;
                            this.$refs.email.setAttribute('disabled', true);
                        }
                        for (let i = 0; i < this.avatars.length; i++) {
                            if (this.avatars[i].fileName == resp.data.Avatar) {
                                this.avatars[i].active = true;
                                this.myAvatar = resp.data.Avatar;
                                break;
                            }
                        } 
                    }
                    this.$refs.oldPassword.value = '';
                    this.$refs.newPassword.value = '';
                    this.$refs.confirmPassword.value = '';
                }).catch(error => {
                    console.log(error);
                });
            },
            imgList() {
                this.avatars = [];
                for (let i = 31; i < 221; i++) {
                    let flag = i;
                    let obj = {
                        url: '/static/images/avatar/20190703' + flag + '.jpg',
                        fileName: '20190703' + flag + '.jpg',
                        active: false
                    }
                    this.avatars.push(obj);
                }
            },
            chooseAvatar(fileName) {
                document.querySelectorAll(".avatar").forEach(function(item){
                    item.classList.remove("active");
                });
                event.target.classList.add("active");
                this.myAvatar = fileName;
            },
            submit() {
                let data = {
                    oid: sessionStorage.getItem("onlineToken"),
                    avatar: this.myAvatar,
                    email: this.$refs.email.value,
                    oldPassword: this.$refs.oldPassword.value,
                    newPassword: this.$refs.newPassword.value,
                    confirmPassword: this.$refs.confirmPassword.value
                };
                this.$axios.post(global.apiUrl + "/user/update", data).then(resp => {
                    if (resp.result == true) {
                        this.$swal.fire("提示", resp.message, "success");
                    } else {
                        this.$swal.fire("错误", resp.message, "error");
                    }
                    this.userInfo();
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

</script>