<template>
    <div class="flex justify-center items-center min-h-screen">
      <div class=" max-w p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div class="flex justify-center mb-4">
          <img src="../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-01.jpg" alt="Logo" class="img-Logo" />
        </div>
        <form @submit.prevent="">
          <div  class=" flex justify-center items-center">
            <button  @click="login()" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ">
              <img src="../assets/google-logo.webp" alt="Facebook" class="img-Google mr-1" />
              Entrar com o Google
            </button>
          </div>
        </form>
        <form @submit.prevent="">
          <div  class=" flex justify-center items-center">
            <button  @click="loginWithFacebook" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
              <img src="../assets/Facebook_icon.svg" alt="Facebook" class="img-Facebook mr-1" />
              Entrar com o Facebook
            </button>
          </div>
          <!-- <button class="btn btn-primary" @click="tap">
            ModalTermsAndPolitics
          </button> -->
        </form>
        <div class="mt-4">
            <a href="https://mytripntour.com/politica_privacidade">Política de Privacidade</a>
        </div>
      </div>
      <ModalTermsAndPolitics v-if="showModal" :close-modal="closeModal"></ModalTermsAndPolitics>
      <Loading :loading="isLoading" ></Loading>
      <!-- <button @click="sendUser" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ml-24"> Logar</button> -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { googleOneTap, GoogleLogin, googleTokenLogin, googleAuthCodeLogin, googleSdkLoaded } from "vue3-google-login";
  import { decodeCredential } from 'vue3-google-login';
  import router from '../routes';
  import ModalTermsAndPolitics from './ModalTermsAndPolitics.vue';
  import axios from 'axios';
  import Loading from './Loading.vue';
  import { jwtDecode } from "jwt-decode";

  const isProd=ref(true)
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;

  const isLoading = ref(false)
  let checkbox = ref(false)
  const showModal = ref(false);
  const userIP=ref('')
  let token=localStorage.getItem('token')

  const tap = () => {
    router.push('/politica_privacidade')
  }

  onMounted(()=>{
    ipGet();
    if(token){
      const tokenDecoded = jwtDecode(token)
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (tokenDecoded.exp > currentTimestamp) {
        console.log("The 'exp' timestamp is in the future.");
        router.push('/mytrip/home');
      } else {
        console.log("The 'exp' timestamp has passed.");
      }
    }
    window.fbAsyncInit = function() {
    FB.init({
      appId: '1203498224221425',
      cookie: true,
      xfbml: true,
      version: 'v20.0'
    });

    console.log('Facebook SDK initialized');

    FB.getLoginStatus(function(response) {
      console.log('FB.getLoginStatus response:', response);
    });
  };

  // Load Facebook SDK
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  })

  const loginWithFacebook = () => {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome! Fetching your information....');
      FB.api('/me', { fields: 'name,email,birthday,gender,picture' }, async function(response) {
        console.log('facebook response', response);
        if (response && !response.error) {
          console.log('Good to see you, ' + response.name + '. Your email is ' + response.email);
          let backUser = [];
          let objUser = {
            email: response.email,
            name: response.name,
            //password: response.id, 
            birthday:  response.birthday,
            gender: response.gender,
            idioma:'PT',
            ip_origem:userIP.value
          };
          let LocalStorageUser = {
            Email: response.email,
            Nome: response.name,
            photo: response.picture.data.url,
            IdentificadorUnico: response.id,
            MetodoAutenticacao: 'Facebook',
            birthday: response.birthday,
            gender: response.gender,
          };
          localStorage.setItem('user', JSON.stringify(LocalStorageUser));
          await sendUser(objUser);
        } else {
          console.error('Error fetching email:', response.error);
        }
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, { scope: 'email,user_birthday,user_gender' });
};
  const ipGet=async ()=>{
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    userIP.value = data.ip;
  }
  const openModal = () => {
    showModal.value = true;
  };
  const closeModal = () => {
    showModal.value = false;
  };
  const IsChecked = (tipo)=>{
    if(checkbox.value==false){
      alert('Aceite os termos para continuar')
    }else{
      if(tipo=='google'){
        login();
      }
      if(tipo=='facebook'){
        loginFacebook();
      }
    }
  }
  const fetchUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders,photos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
const login = () => {
  googleSdkLoaded((google) => {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: 'email profile openid https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read',
      callback: async (response) => {
        try {
          const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code: response.code,
            client_id: clientId,
            client_secret: clientSecret, 
            redirect_uri: 'https://roteiro.mytripntour.com', //must be changed later
            grant_type: 'authorization_code'
          });
          
          const accessToken = tokenResponse.data.access_token;
          
          const userInfo = await fetchUserInfo(accessToken);

          const userEmail = userInfo.emailAddresses[0].value;
          const userName = userInfo.names[0].displayName;
          const userPicture = userInfo.photos[0].url;
          const userBirthday = userInfo.birthdays ? userInfo.birthdays[0].date : null;
          const userGender = userInfo.genders ? userInfo.genders[0].value : null;

          /* console.log("User Email:", userEmail);
          console.log("User Name:", userName);
          console.log("User Picture:", userPicture);
          console.log("User Birthday:", userBirthday);
          console.log("User Gender:", userGender); */
          //same format
          const formattedDate = `${userBirthday.day}/${userBirthday.month}/${userBirthday.year}`;
          let backUser=[]
          let objUser = {
            email: userEmail,
            name: userName,
            /* photo: userPicture, */
            //password: userInfo.names[0].metadata.source.id, 
            birthday: formattedDate,
            gender: userGender,
            idioma:'PT',
            ip_origem:userIP.value
          };
          let LocalStorageUser = {
            Email: userEmail,
            Nome: userName,
            photo: userPicture,
            password: userInfo.names[0].metadata.source.id, 
            MetodoAutenticacao:'Google',
            birthday: formattedDate,
            gender: userGender,
            ip_origem:userIP.value
          };
          backUser.push(objUser)
          localStorage.setItem('user', JSON.stringify(LocalStorageUser));
          await sendUser(objUser)
        } catch (error) {
          console.error('Error handling Google login response:', error);
        }
      }
    });
    client.requestCode();
  });
}
const sendUser=async(user)=>{
  isLoading.value=true
  try {
    /* const response = await fetch('https://newlogin-lm7edjmduq-uc.a.run.app', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(user), 
    }); */
    const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', user)
    console.log('response senduser',response.data)
    if(response.data.ExistUser==1){
      localStorage.setItem('token', response.data.token)
      const tokenDecoded= jwtDecode(response.data.token)
      console.log(tokenDecoded)
      router.push('/mytrip/home');
    } else{
      alert('Aceite os termos para continuar')
      openModal();
    }
    
  } catch (error) {
    isLoading.value=false
    alert('Erro ao logar')
  }finally{
    isLoading.value=false
  }
}

  const loginFacebook = async () => {
    if (window.loginWithFacebook) {
      window.loginWithFacebook();
    } else {
      console.error('Facebook login function is not available.');
    }
  };
  </script>
  
  <style scoped>
  .img-Logo {
    width: 40rem;
  }
  .img-Facebook {
    width: 2rem;
    height: 2rem;
  }
  .img-Google {
    width: 2.7rem;
    height: 2.7rem;
  }
  .input-box {
    width: 60%;
  }
  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  </style>
  