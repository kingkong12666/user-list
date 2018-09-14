<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="el-form-item__labedemo-dynamic">
        <el-form-item
          prop="login"
          label="Email"
          :rules="[
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur'] }
          ]">
          <el-input type="email" v-model="ruleForm2.login" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="[{ required: true, message: 'Please input email address', trigger: 'blur' }]"
        >
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
          <el-button @click="resetForm('ruleForm2')">Reset</el-button>
        </el-form-item>
    </el-form>
    {{info}}
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
      body: '',
      info: '',
      ruleForm2: {
        login: '',
        password: ''
      },
      rules2: {
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
          axios.post('https://sandbox.sdk.finance/api/v1/authorization',this.ruleForm2)
            .then(response => (this.info = response.data.authorizationToken.token))
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    f: {
      'pageNumber': 0,
      'pageSize': 10,
      'token': this.info
    },
  }
}

</script>

<style scoped>

</style>
