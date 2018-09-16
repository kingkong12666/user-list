<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="el-form-item__labedemo-dynamic">
        <el-form-item
          prop="login"
          label="Email"
          :rules="[
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur'] }
          ]">
          <el-input type="email" v-model="ruleForm.login" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="[{ required: true, message: 'Please input email address', trigger: 'blur' }]"
        >
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        callback()
      }
    }

    return {
      userBody: {
        'pageNumber': 0,
        'pageSize': 10
      },
      info: '',
      ruleForm: {
        login: '',
        password: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://sandbox.sdk.finance/api/v1/authorization', this.ruleForm)
            .then(response => {
              this.info = response.data.authorizationToken.token
              const HTTP = axios.create({
                baseURL: `https://sandbox.sdk.finance/`,
                headers: {
                  Authorization: 'TOKEN ' + this.info
                }
              })
              HTTP.post(`api/v1/users/view`, this.userBody)
                .then(response => (this.$store.state.users = response.data.records, this.$router.push('/user')))
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
}

</script>

<style scoped>

</style>
