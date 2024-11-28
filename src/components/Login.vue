<template>
    <div class="flex justify-center items-center min-h-screen scrollable-container">
      <div class=" max-w p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div class="flex justify-center mb-4 sm:mb-8">
          <img src="../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-01.jpg" alt="Logo" class="img-Logo" />
        </div>
        <form @submit.prevent="">
          <div  class=" flex justify-center items-center">
            <button  @click="login()" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ">
              <img src="../assets/google-logo.webp" alt="Facebook" class="img-Google mr-1" />
              Entrar Com Google
            </button>
          </div>
        </form>
<!--         <form @submit.prevent="">
          <div  class=" flex justify-center items-center">
            <button  @click="loginWithFacebook" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
              <img src="../assets/Facebook_icon.svg" alt="Facebook" class="img-Facebook mr-1" />
              {{ traducao.EntrarFace }}
            </button>
          </div>
        </form> -->
        <div class="mt-4">
            <input type="checkbox" class="mr-1" v-model="checkbox"> Eu concordo com a <a href="https://roteiro.mytripntour.com/politica_privacidade">Política de Privacidade</a>
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
  import ptLang from '../data/ptlang';
  import newlang from '../data/newlang';

  const isProd=ref(true)
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;

  const isLoading = ref(false)
  const checkbox = ref(false)
  const showModal = ref(false);
  const userIP=ref('')
  let token=localStorage.getItem('token')
  const locationData = ref(null)
  let data = {
      ip: "179.221.49.176",
      hostname: "b3dd31b0.virtua.com.br",
      city: "Poços de Caldas",
      region: "Minas Gerais",
      country: "BR",
      loc: "-21.7878,-46.5614",
      postal: "37700-000",
      timezone: "America/Sao_Paulo",
    } 

  const traducao = ref(null)

  const Translate = async () => {
    isLoading.value=true
    try {
      let objUser = {
            email: 'luisalbergoni717@gmail.com',
            name: 'Luis Otavio',
            birthday: '16/6/2000',
            gender: 'male',
            sigla_idioma:navigator.language.toUpperCase() || navigator.languages[0].toUpperCase(),
            pagina:'Roteiros',
            ip_origem:userIP.value,
        };
      const responseUser = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
      console.log(responseUser.data.traducao)
      const parsed = JSON.parse(responseUser.data.traducao)
      traducao.value = parsed.Login
      console.log(parsed)
      isLoading.value=false
    } catch (error) {
      console.log(error)
    }
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
  //Translate();
  
  }
)

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
            birthday:  response.birthday ? response.birthday : null,
            gender: response.gender ? response.gender : null,
            idioma:'PT',
            ip_origem:userIP.value
          };

          await sendUser(objUser, response, 'facebook');
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
    console.log('fetchuserinfo',response)
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
const login = () => {
  const storedUser = localStorage.getItem('tokens');
  const refreshToken = storedUser ? JSON.parse(storedUser).refresh_token : null;

  if (refreshToken) {
    axios.post('https://oauth2.googleapis.com/token', {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    })
    .then(async (response) => {
      console.log('res')
      const accessToken = response.data.access_token;
      console.log(response)
      const userInfo = await fetchUserInfo(accessToken);
      processUserInfo(userInfo);
    })
    .catch((error) => {
      console.error('Error refreshing token:', error);
      requestNewGoogleLogin();
    });
  } else {
    requestNewGoogleLogin();
  }
};

const requestNewGoogleLogin = () => {
  googleSdkLoaded((google) => {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: 'email profile openid https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read',
      access_type: 'offline', 
      prompt: 'consent', 
      callback: async (response) => {
        try {
          const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code: response.code,
            client_id: clientId,
            client_secret: clientSecret, 
            redirect_uri: 'https://roteiro.mytripntour.com', 
            grant_type: 'authorization_code'
          });
          const accessToken = tokenResponse.data.access_token;
          const refreshToken = tokenResponse.data.refresh_token; 
          const userInfo = await fetchUserInfo(accessToken);
          const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken 
          }
          localStorage.setItem('tokens', JSON.stringify(tokens));
          processUserInfo(userInfo);

        } catch (error) {
          console.error('Error handling Google login response:', error);
        }
      }
    });
    client.requestCode();
  });
};
const processUserInfo = async (userInfo) => {
  console.log(userInfo)
  const userEmail = userInfo.emailAddresses[0].value;
      const userName = userInfo.names[0].displayName;
      const userPicture = userInfo.photos[0].url;
      const userBirthday = userInfo.birthdays ? userInfo.birthdays[0].date : null;
      const userGender = userInfo.genders ? userInfo.genders[0].value : null;
      const userLocale = navigator.language
      const formattedDate = userBirthday ? `${userBirthday.day}/${userBirthday.month}/${userBirthday.year}` : null;
      localStorage.setItem('lang', userLocale.toUpperCase());
      localStorage.setItem('langName', userLocale.toUpperCase());
      await saveLocation()
      //locationData.value ? console.log(locationData.value) : locationData.value=data
      let objUser = {
            email: userEmail,
            name: userName,
            birthday: formattedDate,
            gender: userGender,
            sigla_idioma:userLocale.toUpperCase(),
            ip_origem:userIP.value,
            pagina:'Roteiros',
            city: locationData.value.city ? locationData.value.city : '',
            region: locationData.value.region ? locationData.value.region : '',
            country: locationData.value.country ? locationData.value.country : '',
            loc: locationData.value.loc ? locationData.value.loc : '',
            postal: locationData.value.postal ? locationData.value.postal : '',
            timezone: locationData.value.timezone ? locationData.value.timezone : '',
          };
          await sendUser(objUser, userInfo, 'google')
};
const sendUser=async(user, userInfo, access_type)=>{ 
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
    if(response.data.ExistUser==1 || checkbox.value==true){
      localStorage.setItem('token', response.data.token)
      const tokenDecoded= jwtDecode(response.data.token)
      console.log(tokenDecoded)
      if(access_type=='facebook'){
      let LocalStorageUser = {
              email: userInfo.email,
              Email: userInfo.email,
              Nome: userInfo.name,
              photo: userInfo.picture.data.url,
              IdentificadorUnico: userInfo.id,
              MetodoAutenticacao: 'Facebook',
              birthday: userInfo.birthday ? userInfo.birthday : null,
              gender: userInfo.gender ? userInfo.gender : null,
              saldouser: response.data.saldouser,
              vlrpdf: response.data.vlrpdf,
              vlrpesquisa: response.data.vlrpesquisa,
              iduser: response.data.iduser,
            };
      
      localStorage.setItem('user', JSON.stringify(LocalStorageUser));
      localStorage.setItem('Traducao', response.data.traducao);
    } else if(access_type=='google'){
      const userEmail = userInfo.emailAddresses[0].value;
      const userName = userInfo.names[0].displayName;
      const userPicture = userInfo.photos[0].url;
      const userBirthday = userInfo.birthdays ? userInfo.birthdays[0].date : null;
      const userGender = userInfo.genders ? userInfo.genders[0].value : null;
      const formattedDate = userBirthday ? `${userBirthday.day}/${userBirthday.month}/${userBirthday.year}` : null;
      const LocalStorageUser = {
                Email: userEmail,
                name: userName,
                photo: userPicture,
                MetodoAutenticacao: 'Google',
                birthday: formattedDate,
                gender: userGender,
                ip_origem: userIP.value,
                email: userEmail,
                saldouser: response.data.saldouser,
                vlrpdf: response.data.vlrpdf,
                vlrpesquisa: response.data.vlrpesquisa,
                iduser: response.data.iduser,
                currency_data:response.data.currency_data,
                city: locationData.value.city ? locationData.value.city : '',
                region: locationData.value.region ? locationData.value.region : '',
                country: locationData.value.country ? locationData.value.country : '',
                loc: locationData.value.loc ? locationData.value.loc : '',
                postal: locationData.value.postal ? locationData.value.postal : '',
                timezone: locationData.value.timezone ? locationData.value.timezone : '',
              };
              console.log(typeof response.data.traducao)
      localStorage.setItem('languages', JSON.stringify(response.data.languages));
      localStorage.setItem('user', JSON.stringify(LocalStorageUser));
      localStorage.setItem('Traducao', response.data.traducao);
    }
      
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
  const saveLocation = async () => {
    try {
      const response = await axios.get(`https://ipinfo.io/json?token=5bad712b786115`)
      console.log('Location response',response)
      locationData.value=response.data
      localStorage.setItem('location',JSON.stringify(response.data))
    } catch (error) {
      console.log('saveLocation ERROR',error)
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
  .scrollable-container {
    overflow-y: auto;
    margin: 0 auto;
    padding: 1rem; 
}
  </style>
  