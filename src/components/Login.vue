<template>
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-full max-w p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div class="flex justify-center mb-4">
          <img src="../assets/logo.jpg" alt="Logo" class="img-Logo" />
        </div>
        <form @submit.prevent="">
          <div  class="mt-4 ml-16 items-center">
            <button  @click="IsChecked('google')" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ml-24">
              <img src="../assets/google-logo.webp" alt="Facebook" class="img-Google mr-1" />
              Entrar com o Google
            </button>
          </div>
        </form>
        <form @submit.prevent="">
          <div  class="mt-4 ml-16">
            <button  @click="IsChecked('facebook')" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ml-24">
              <img src="../assets/Facebook_icon.svg" alt="Facebook" class="img-Facebook mr-1" />
              Entrar com o Facebook
            </button>
          </div>
        </form>
        <div class="mt-4 ml-16">
            <input type="checkbox" v-model="checkbox">
            <span @click.prevent="openModal" class="cursor-pointer text-blue-500 mr-10 ml-2">Eu aceito os termos e condições</span>
            </input>
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

  const isProd=ref(true)
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;

  const isLoading = ref(false)
  let checkbox = ref(false)
  const showModal = ref(false);
  const userIP=ref('')
  let token=null

  onMounted(()=>{
    ipGet();
    if(token){
      verifytoken();
    }
  })
  const verifytoken=()=>{

  }
  const ipGet=async ()=>{
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    userIP.value = data.ip;
    console.log("User's IP address:", userIP);
  }
  const openModal = () => {
    showModal.value = true;
  };
  const closeModal = () => {
    showModal.value = false;
  };
  const IsChecked = (tipo)=>{
    console.log('Checked alert', checkbox.value)
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
    console.log(response.data)
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
            redirect_uri: 'http://mytripntour.com', //must be changed later
            grant_type: 'authorization_code'
          });
          
          const accessToken = tokenResponse.data.access_token;
          
          const userInfo = await fetchUserInfo(accessToken);
          console.log("User Info:", userInfo);

          const userEmail = userInfo.emailAddresses[0].value;
          const userName = userInfo.names[0].displayName;
          const userPicture = userInfo.photos[0].url;
          const userBirthday = userInfo.birthdays ? userInfo.birthdays[0].date : null;
          const userGender = userInfo.genders ? userInfo.genders[0].value : null;

          console.log("User Email:", userEmail);
          console.log("User Name:", userName);
          console.log("User Picture:", userPicture);
          console.log("User Birthday:", userBirthday);
          console.log("User Gender:", userGender);
          //same format
          const formattedDate = `${userBirthday.day}/${userBirthday.month}/${userBirthday.year}`;
          let backUser=[]
          let objUser = {
            Email: userEmail,
            Nome: userName,
            /* photo: userPicture, */
            password: userInfo.names[0].metadata.source.id, 
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
          };
          backUser.push(objUser)
          console.log(objUser)
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
    console.log(user)
    /* let user=[{"Nome": "Usuário 1", "IdentificadorUnico": "ID12345", "Email": "usuario1@example.com", "MetodoAutenticacao": "Google"}] */
    const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', user)
    console.log(response.data)
    localStorage.setItem('token', response.data.token)
    router.push('/mytrip/home');
    /* if(response.data.ExistUser=='1'){
      
    } */
    
  } catch (error) {
    isLoading.value=false
    alert('Erro ao logar')
  }finally{
    isLoading.value=false
  }
}

  const loginFacebook = async () => {
    console.log('Facebook login triggered');
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
    height: 40rem;
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
    width: 20rem;
  }
  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  </style>
  