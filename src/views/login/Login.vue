<template>
  <div class="login-container">
    <div class="login-form">
      <a-form ref="formRef"
              :model="formState"
              :rules="rules"
      >
        <a-form-item
          class="login-username"
          :label-col="formStyle.labelCol"
          :wrapper-col="formStyle.wrapperCol"
          :label="loginStaticInfo.userLabel"
        >
          <a-input
            v-model:value="formState.username"
            :placeholder="loginStaticInfo.userPlaceHolder"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          class="login-password"
          :label-col="formStyle.labelCol"
          :wrapper-col="formStyle.wrapperCol"
          :label="loginStaticInfo.passLabel"
        >
          <a-input-password
            v-model:value="formState.password"
            :placeholder="loginStaticInfo.passPlaceHolder"
            defaultValue=""
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button class="login-submit" type="primary" @click="loginSubmit">
            {{ loginStaticInfo.submitLabel }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
  import { defineComponent, reactive, ref, toRaw, getCurrentInstance } from "vue";

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const formRef = ref();

    const formState = reactive({
      username: '',
      password: '',
    })

    const formStyle = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    const loginStaticInfo = {
      userLabel: "用户名",
      passLabel: "密码",
      userPlaceHolder: "请输入用户名",
      passPlaceHolder: "请输入密码",
      submitLabel: "登录",
    };

    const rules = {
      username: [
        {required: true, message: 'Please input username', trigger: 'blur'},
        {min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur'},
      ],
      password: [
        {required: true, message: 'Please input password', trigger: 'blur'},
        {min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur'},
      ],
    };

    const formInfo = {
      redirect: undefined,
      // otherQuery: {}
    }

    const { ctx } = getCurrentInstance();

    const loginSubmit = () => {
      formRef.value
              .validate()
              .then(() => {
                ctx.$http
                        .post("/user/login", toRaw(formState))
                        .then((response) => {
                          if (response.code == 0) {
                            ctx.$store.commit("user/setUser", {
                              userId: response.data,
                              userName: formState.username,
                            });
                            ctx.$router.push({path: formInfo.redirect || '/',})
                            // if(ctx.$route.query){
                            //   if(ctx.$route.query.redirect){
                            //     ctx.$router.push(ctx.$route.query.redirect);
                            //   }else{
                            //     ctx.$router.push("/home");
                            //   }
                            // } else{
                            //   ctx.$router.push("/home");
                            // }
                          } else {
                            alert("用户名或密码有误");
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
              })
              .catch(error => {
                console.log('error', error)
              })
    };

    // const getOtherQuery = (query) => {
    //   return Object.keys(query).filter(x => x).reduce((acc, cur) => {
    //     if(cur !== 'redirect'){
    //       acc[cur] = query[cur]
    //     }
    //     return acc
    //   })
    // }

    return {
      formRef,
      formState,
      formStyle,
      loginStaticInfo,
      rules,
      formInfo,
      loginSubmit,
      // getOtherQuery
    };
  },
  watch: {
    $route: {
      handler: function(route){
        const query = route.query
        if(query){
          this.formInfo.redirect = query.redirect
          // this.formInfo.otherQuery = this.getOtherQuery(query)
        }
      }
    }
  }
});
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 30%;
  height: 30%;
  box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-submit {
  left: 40%;
  width: 320%;
}
</style>
