<template>
  <div class="appview-login">
    <a-card class="login-container"
      :bodyStyle="bodyStyle"
      :headStyle="headStyle"
      :title="title"
    >
      <a-tabs tab-position="bottom">
        <a-tab-pane key="sign-in">
          <template #tab><span><UserOutlined />登录</span></template>
          <SignIn />
        </a-tab-pane>
        <a-tab-pane key="sign-up">
          <template #tab><span><UserAddOutlined />注册</span></template>
          <SignUp />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { UserOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { SignIn, SignUp } from '../../components/app/login'
import { useConfig } from '../../hooks/useAppConf'
export default {
  name: 'LoginView',
  components: {
    UserOutlined,
    UserAddOutlined,
    SignIn, SignUp,
  },
  setup() {
    const { appInfo } = useConfig()
    const title = `${appInfo.name} | ${appInfo.description}`
    return {
      title,
    }
  },
  data () {
    return {
      bodyStyle: {
        paddingTop: '8px',
        paddingBottom: '0',
        // backgroundColor: '#ffffffC5'
      },
      headStyle: {
        textAlign: 'center',
        fontSize: '20px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.appview-login {
  height: 100vh;
  background-image: url(/img/background.jpg);
  background-size: cover;
}
.login-container {
  max-width: 80vw;
  width: 400px;


  border-radius: 4px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); // 基础投影
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); // 浅色投影

  // 绝对定位居中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
:deep .ant-card {
  background-color: #ffffffC5;
}
</style>
