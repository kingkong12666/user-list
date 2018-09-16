
<template>
  <el-table
    :data="responseUser"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="contact.email"
      label="Email"
      width="180">
    </el-table-column>
    <el-table-column
      prop="contact.phoneNumber"
      label="Phone">
    </el-table-column>
    <el-table-column
      prop="contact.countryCode"
      label="Country code">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="Create at">
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  computed: {
    responseUser () {
      return this.$store.state.users
    }
  }
}
</script>

<style scoped>

</style>
