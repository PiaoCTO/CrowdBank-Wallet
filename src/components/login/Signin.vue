<template>
  <section id="login--import">
    <div class="background">
      <img src="~@/assets/img/Blurred_Bg.png">
    </div>
    <div class="header">
      <div class="back-btn" @click="goBack">
        <aph-icon name="arrow-left"></aph-icon>
      </div>
      <div class="title">
        <img src="~@/assets/img/CrowdBank.png">
<!--        <aph-icon name="word-mark"></aph-icon> -->
      </div>
    </div>
    <div class="body">
      <login-form-wrapper identifier="signinWallet">
        <aph-input :placeholder="$t('Name')" v-model="user.walletName"></aph-input>
        <aph-input :placeholder="$t('Password')" v-model="user.password" type="password"></aph-input>
        <button class="signin-btn" @click="signinWallet" >Sign In</button>
        <button class="signup-btn" @click="signupWallet" >Sign Up</button>
      </login-form-wrapper>
    </div>
  </section>
</template>

<script>
import LoginFormWrapper from './LoginFormWrapper';

export default {
  components: {
    LoginFormWrapper,
  },

  computed: {

  },

  data() {
    return {
      user:{
        password: '',
        walletName: '',
      }
    };
  },

  methods: {
    
    goBack() {
      this.$router.back();
    },

    signinWallet() {
      this.$http
        .post('http://192.168.50.134/login', JSON.stringify(this.user))
        .then(response => {
//          this.$router.push('/landing');
          console.log(response);
        }, error => {
          console.log(error);
        });
    },

    signupWallet() {
      console.log(this.user)
    },
  },
};
</script>


<style lang="scss">
#login--import {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;

  > .background {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;

    img {
      width: 100%;
    }
  }

  > .header {
    display: flex;
    flex-direction: row;
    flex: none;
    justify-content: center;
    position: relative;

    .back-btn {
      left: $space;
      position: absolute;
      top: $space;

      svg {
        height: toRem(16px);

        .fill {
          fill: white;
        }
      }
    }

    .title {
      margin-top: $space;
      svg {
        height: toRem(16px);

        .fill {
          fill: white;
        }
      }
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    padding: 0 $space-lg;

    .aph-input + .aph-input {
      margin-top: $space;
    }

    .signin-btn, .signup-btn {
      @extend %btn-outline;
      margin-top: $space-xl;
    }
  }
}
</style>

