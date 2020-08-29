<template>
    <div class="main">
        <a-spin class="text-center" :spinning="oauthLoading">
            <span v-show="oauthLoading">正在登陆，请稍后...</span>
        </a-spin>
        <h1 style="margin-top: 10%;font-size: 50px">课堂管理系统</h1>
        <a-row type="flex" justify="center" style="margin-top: 100px">
            <a-col span="6">
                <a-form

                        class="user-layout-login"
                        ref="formLogin"
                        id="formLogin"
                        :form="form"
                        v-if="islogin"
                >
                    <a-tabs
                            :activeKey="customActiveKey"
                            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                            @change="handleTabClick"
                    >
                        <a-tab-pane key="tab1" tab="账号密码登录">
                            <a-form-item>
                                <a-input size="large" type="text" placeholder="学号" v-model="formLogin.account"
                                         v-decorator="[
                                'account',
                                {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'blur'}
                            ]">
                                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                </a-input>
                            </a-form-item>

                            <a-form-item
                            >
                                <a-input size="large" type="password" autocomplete="false" placeholder="密码"
                                         v-model="formLogin.password"
                                         v-decorator="[
                                'password',
                                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                            ]">
                                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                </a-input>
                            </a-form-item>
                        </a-tab-pane>
                        <!--                <a-tab-pane key="tab2" tab="手机号登录">-->
                        <!--                    <a-form-item-->
                        <!--                    >-->
                        <!--                        <a-input size="large" type="text" placeholder="手机号"-->
                        <!--                                 v-decorator="[-->
                        <!--                                'mobile',-->
                        <!--                                {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'change'}-->
                        <!--                            ]">-->
                        <!--                            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
                        <!--                        </a-input>-->
                        <!--                    </a-form-item>-->

                        <!--                    <a-row :gutter="16">-->
                        <!--                        <a-col class="gutter-row" :span="16">-->
                        <!--                            <a-form-item-->
                        <!--                            >-->
                        <!--                                <a-input size="large" type="text" placeholder="验证码"-->
                        <!--                                         v-decorator="[-->
                        <!--                                'captcha',-->
                        <!--                                {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}-->
                        <!--                            ]">-->
                        <!--                                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
                        <!--                                </a-input>-->
                        <!--                            </a-form-item>-->
                        <!--                        </a-col>-->
                        <!--                        <a-col class="gutter-row" :span="8">-->
                        <!--                            <a-button-->
                        <!--                                    class="getCaptcha"-->
                        <!--                                    tabindex="-1"-->
                        <!--                                    :disabled="state.smsSendBtn"-->
                        <!--                                    @click.stop.prevent="getCaptcha"-->
                        <!--                                    v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"-->
                        <!--                            ></a-button>-->
                        <!--                        </a-col>-->
                        <!--                    </a-row>-->
                        <!--                </a-tab-pane>-->
                    </a-tabs>

                    <a-form-item>
                        <a-checkbox v-model="formLogin.rememberMe" style="float:left;">自动登录</a-checkbox>
                        <a
                                class="forge-password"
                                style="float: right;"
                                @click="routerLink('/member/forgot')"
                        >忘记密码
                        </a>
                    </a-form-item>

                    <a-form-item style="margin-top:24px">
                        <a-button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                class="login-button"
                                :loading="loginBtn"
                                @click.stop.prevent="handleSubmit"
                                :disabled="loginBtn"
                        >登录
                        </a-button>
                    </a-form-item>

                    <!--<a>
                        <a-icon class="item-icon" type="alipay-circle"></a-icon>
                    </a>
                    <a>
                        <a-icon class="item-icon" type="taobao-circle"></a-icon>
                    </a>
                    <a>
                        <a-icon class="item-icon" type="weibo-circle"></a-icon>
                    </a>-->
                    <span class="register" @click="islogin=false">注册账户</span>
                    <!--        </a-form>-->
                    <!--            </div>-->
                </a-form>
                <a-form class="user-layout-login" v-else :form="form">
                    <a-form-model-item>

                        <a-input size="large" type="text" placeholder="帐户ID" v-model="formLogin.account"
                                 v-decorator="[
                                'account',
                                {rules: [{ required: true, message: '请输入帐户名' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}
                            ]">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item>

                        <a-input size="large" type="text" placeholder="名称" v-model="formLogin.name"
                                 v-decorator="[
                                'name',
                                {rules: [{ required: true, message: '请输入名称' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}
                            ]">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-input size="large" type="password" placeholder="密码" v-model="formLogin.password"
                                 v-decorator="[
                                'password',
                                {rules: [{ required: true, message: '输入密码' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}
                            ]">
                            <a-icon slot="prefix" type="key" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item>

                        <a-input size="large" type="password" placeholder="再次输入密码"
                                 v-decorator="[
                                'password2',
                                {rules: [{ required: true, message: '请输入密码' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}
                            ]">
                            <a-icon slot="prefix" type="key" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>
<!--                    <a-form-model-item>-->

<!--                        <a-input size="large" type="text" placeholder="输入邮箱地址" v-model="formLogin.mail"-->
<!--                                 v-decorator="[-->
<!--                                'mail',-->
<!--                                {rules: [{ required: true, message: '输入邮箱地址' },{ validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}-->
<!--                            ]">-->
<!--                            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
<!--                        </a-input>-->
<!--                    </a-form-model-item>-->
                    <a-form-item style="margin-top:24px">
                        <a-button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                class="login-button"
                                :loading="loginBtn"
                                @click.stop.prevent="handleSubmit"
                                :disabled="loginBtn"
                        >注册
                        </a-button>
                    </a-form-item>
                    <span class="register" @click="islogin=true">登录账户</span>
                </a-form>

            </a-col>
        </a-row>

    </div>
</template>

<script>
    import md5 from 'md5'
    // import {mapActions} from 'vuex'
    // import {mapState} from 'vuex'

    // eslint-disable-next-line no-unused-vars
    // import {notice} from "../js/notice";


    export default {
        components: {},
        data() {
            return {
                customActiveKey: 'tab1',
                loginBtn: false,
                oauthLoading: false,
                // login type: 0 email, 1 account, 2 telephone
                loginType: 0,
                requiredTwoStepCaptcha: false,
                stepCaptchaVisible: false, islogin: true,
                form: this.$form.createForm(this),
                // state: {
                //     time: 60,
                //     smsSendBtn: false
                // },
                formLogin: {
                    account: '',
                    password: '',
                    captcha: '',
                    mail: '', name: '',
                    rememberMe: true
                }
            }
        },
        computed: {

        },
        mounted() {

            // if (this.$route.query.logged) {
            //     this.oauthLoading = true;
            //     this.checkLogin();
            // }
            // if (this.$route.query.message) {
            //     notice({title: this.$route.query.message}, 'notice');
            //     // notice(this.$route.query.message);
            // }
        },
        methods: {

            // handler
            handleUsernameOrEmail(rule, value, callback) {
                const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                if (regex.test(value)) {
                    this.loginType = 0
                } else {
                    this.loginType = 1
                }
                callback()
            },
            handleTabClick(key) {
                this.customActiveKey = key
                // this.form.resetFields()
            },
            handleSubmit() {
                const app = this;
                let flag = false;

                let loginParams = {
                    remember_me: app.formLogin.rememberMe
                };

                // 使用账户密码登录
                if (app.customActiveKey === 'tab1') {
                    app.form.validateFields(['account', 'password'], {force: true}, (err, values) => {
                        if (!err) {
                            flag = true;
                            loginParams[!app.loginType ? 'account' : 'account'] = values.account;
                            loginParams.password = values.password
                        }
                    })
                    // 使用手机号登录
                }


                if (!flag) return;

                app.loginBtn = true;//todo:登陆函数标志
                if (app.islogin) {
                    this.$api.post('login', {
                        ID: app.formLogin.account, PassWd: md5(app.formLogin.password)
                    }).then((data) => {
                        this.loginBtn = false
                        if (data.data.code == -1) {
                            app.$notification.error({message: "登录失败"})
                            console.log(app.$shownotification)
                            // app.$shownotification("登录失败","登录失败")

                        } else {
                            let t = data.data.data
                            app.$notification.success({message: "欢迎" + t.name})
                            // app.$shownotification("登录成功", "")
                            app.$store.commit("login", t)

                            app.$router.push("/index")

                        }

                        console.log(data)
                    })
                } else {
                    this.$http.post('reg', {
                        UserId: app.formLogin.account,
                        Passwd: app.formLogin.password,
                        Mail: app.formLogin.mail,
                        UserName: app.formLogin.name
                    }).then((data) => {
                        this.loginBtn = false
                        console.log(data)
                    })
                }


            },
            requestFailed(err) {
                this.$notification['error']({
                    message: '错误',
                    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                    duration: 4
                });
                this.loginBtn = false
            }
        }
    }
</script>

<style lang="less">
    .user-layout-login {
        label {
            font-size: 14px;
        }

        .getCaptcha {
            display: block;
            width: 100%;
            height: 40px;
        }

        .forge-password {
            font-size: 14px;
        }

        button.login-button {
            padding: 0 15px;
            font-size: 16px;
            height: 40px;
            width: 100%;
        }

        .user-login-other {
            text-align: left;
            margin-top: 24px;
            line-height: 22px;

            .item-icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #1890ff;
                }
            }

            .register {
                float: right;
            }
        }
    }
</style>
