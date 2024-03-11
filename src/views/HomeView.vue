<script setup lang="ts">
  import { useRouter } from "vue-router";
  import LogoText from '@/components/LogoText.vue';

  const router = useRouter()

  function signIn() {
    router.push('/auth')
  }
</script>

<template>
  <div class="container">
    
    <div class="break" />

    <!--logo ...-->
    <LogoText />

    <div class="break" />

    <!--Content...-->
    <div class="content">
      <h1>Hello World!</h1>
      <br>
      <h1>Follow these steps to get started</h1>
      
      <div class="notes">
        <ol>
          <li>Create a user account on Open Cider <a href="https://app.opencider.com/" target="_blank">here</a>.</li>
          <li>Go to the service tab and add your created developer service from the marketplace.</li>
          <li>Click the "Sign in" button below to proceed with the web demo.</li>
        </ol>
      </div>

      <div class="btn-class">
        <div style="height: 5em" />
        <button class="btn-outline" @click="signIn">Sign In</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-class {
  padding-top: 5em;
}

.break {
  height: 4em;
}

.content {
  margin: auto;
  width: 72%;
}

.notes {
  font-size: 14px;
  margin: auto;
  padding-top: 4%;
  text-align: start;
  width: 56%;
}
</style>
