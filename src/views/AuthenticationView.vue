<script lang="ts">
  import LogoText from '@/components/LogoText.vue';
  import { initializeAuth, completeAuth } from '../utils/client';
  
  export default {
    components: { LogoText },
    methods: {
      initializeAuth() {
        initializeAuth(this.email)
        .then(res => this.isAuthValid = res)
      },
      completeAuth() {
        completeAuth(this.otp).then(res => {
          if (res) {
            this.$router.push('/dashboard')
          } else {
            console.log("Something went wrong")
          }
        })
      }
    },
    data() {
      return {
        email: '',
        isAuthValid: false,
        otp: '',
      }
    }
  }
</script>

<template>
  <div class="container">
    <!--logo ...-->
    <LogoText />

    <div style="height: 18%;" />

    <!--sign in form ...-->
    <div class="auth-cd-header">
      <p>Sign in</p>
    </div>

    <div class="auth-cd-body">
      <div>
        <input class="input" v-model="email" type="email" placeholder="Email address" /><br>
        <input class="input" v-model="otp" v-if="isAuthValid" placeholder="OTP Number" />
      </div>
      
      <div class="btn-class">
        <button v-if="!isAuthValid" class="btn-outline" @click="initializeAuth">Get Started</button>
        <button v-if="isAuthValid" class="btn-outline" @click="completeAuth">Login</button>
      </div>  
    </div>

    <!--footer ...-->
    <div class="footer">
      <h4>An Open Cider Open Source "Hello World" Example.</h4>
    </div>
  </div>
</template>

<style scoped>
  .auth-cd-header {
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 14px;
    padding-top: 1em;
    margin: auto;
    height: 3.5em;
    width: 45%;
  }

  .auth-cd-body {
    background-color: var(--color-background);
    padding-top: 3%;
    padding-bottom: 3em;
    margin: auto;
    height: 18em;
    width: 75%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .btn-outline {
    background: var(--color-background);
    border: 2px solid var(--color-text);
    color: var(--color-heading);
    padding: 8px 16px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  }
</style>