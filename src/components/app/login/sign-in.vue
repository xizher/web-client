<template>
  <div class="sign-in-container">
    <a-input size="large" placeholder="账户" v-model:value="username" @keydown.enter="signIn">
      <template #prefix><UserOutlined/></template>
      <template #suffix>
        <a-tooltip title="用户名 或 邮箱">
          <InfoCircleOutlined />
        </a-tooltip>
      </template>
    </a-input>
    <a-input-password size="large" v-model:value="password" placeholder="密码" @keydown.enter="signIn">
      <template #prefix><UnlockOutlined /></template>
    </a-input-password>
    <a-button size="large" type="primary" block @click="signIn">
      登录
    </a-button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, InfoCircleOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { enCrypto, setCookie } from '../../../ext/js.utils'
import { useAxios } from '../../../hooks/useAjax'
import { showMsg } from '../../../hooks/useAntd'
export default {
  name: 'SignIn',
  components: {
    UserOutlined, InfoCircleOutlined, UnlockOutlined
  },
  setup() {
    const { doAxios } = useAxios()
    const router = useRouter()

    const signInState = reactive({
      username: '',
      password: '',
      signIn () {
        const { username, password } = signInState
        doAxios({ url: '/account', data: { username, password: enCrypto(password) } }).then(data => {
          showMsg(`登录成功，【${data.username}】`, null, { type: 'success' })
          setCookie('accountInfo', JSON.stringify(data))
          router.push('/')
        }).catch(err => {
          console.warn(err.msg)
          showMsg(err.msg, null, { type: 'warning' })
        })
      }
    })

    return {
      ...toRefs(signInState)
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in-container {
  > * {
    margin-bottom: 8px;
  }
}
</style>
