<template>
    <div class="flex justify-center items-center scrollable-container">
      <div class=" max-w p-8  bg-white rounded-lg shadow-md">
        <div class="flex justify-center mb-4 sm:mb-8">
          <a href="https://mytripntour.com/" target="_blank" rel="noopener noreferrer">
            <img src="../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-1.png" alt="Logo" class="img-Logo" />
          </a>
        </div>


        <div class=" flex justify-center items-center">
          <input 
          type="text" 
          class="form-control google-btn input-box py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          v-model="Email"
          id="emaillogin"
          placeholder="Email"
          >
        </div>
        <div  class=" flex justify-center items-center">
          <button  @click="sendEmailOnly()" class="google-btn input-box w-full py-2 px-4 bg-[#27b3cc] text-white border border-gray-300 rounded-md shadow-sm hover:bg-[#184f58] ">
            
            Entrar
          </button>
        </div>
        <span class=" mb-3">Ou</span>
        <form @submit.prevent="">
          <div  class=" flex justify-center items-center mt-3">
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
            <input type="checkbox" class="mr-1" v-model="checkbox"> Eu concordo com a <a href="/roteiro/politica_privacidade">Política de Privacidade</a>
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
  import moment from 'moment';
  import ptLang from '../data/ptlang';
  import newlang from '../data/newlang';

  const isProd=ref(true)
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const isLoading = ref(false)
  const checkbox = ref(true)
  const showModal = ref(false);
  const userIP=ref('')
  let token=localStorage.getItem('token')
  const locationData = ref(null)
  const Email = ref('')

  const traducao = ref(null)
  

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
/*     gtag('js', new Date());
    gtag('config', 'G-5BTZ1093SB'); */
  }
)
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
            redirect_uri: 'https://roteiro.mytripntour.com', //mudar dependente do url
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
          localStorage.setItem('google',true)
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
      const formattedDate = userBirthday ? `${userBirthday.day || 1}/${userBirthday.month || 1}/${userBirthday.year || 2000}` : null;
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
            /* pagina:'Roteiros', */
            city: locationData.value.city ? locationData.value.city : '',
            region: locationData.value.region ? locationData.value.region : '',
            country: locationData.value.country ? locationData.value.country : '',
            loc: locationData.value.loc ? locationData.value.loc : '',
            postal: locationData.value.postal ? locationData.value.postal : '',
            timezone: locationData.value.timezone ? locationData.value.timezone : '',
            flg_auth:'G'
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
    localStorage.setItem('token', response.data.token)
    const tokenDecoded= jwtDecode(response.data.token)
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
                birthday: moment.utc(response.data.dtnascimento).format('DD/MM/YYYY'),
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
              console.log('LocalStorageUser',LocalStorageUser)
      localStorage.setItem('languages', JSON.stringify(response.data.languages));
      localStorage.setItem('user', JSON.stringify(LocalStorageUser));
      localStorage.setItem('Traducao', response.data.traducao);
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
                birthday: moment.utc(response.data.dtnascimento).format('DD/MM/YYYY'),
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
              console.log('LocalStorageUser',LocalStorageUser)
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
    console.log(error)
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
  const sendEmailOnly = async () => {
    if (document.getElementById("emaillogin").value == null || document.getElementById("emaillogin").value == ""){
      alert('Preencha um email para continuar!')
    }
    else if(document.getElementById("emaillogin").value.indexOf("@") == -1) {
      alert('Preencha um email valido para continuar!')
    }
    else{
      isLoading.value=true
      await saveLocation()
      const userLocale = navigator.language
      let objUser={
        email:Email.value,
        flg_auth:'E',
        name: Email.value,
        sigla_idioma:userLocale.toUpperCase(),
        ip_origem:userIP.value,
        city: locationData.value.city ? locationData.value.city : '',
        region: locationData.value.region ? locationData.value.region : '',
        country: locationData.value.country ? locationData.value.country : '',
        loc: locationData.value.loc ? locationData.value.loc : '',
        postal: locationData.value.postal ? locationData.value.postal : '',
        timezone: locationData.value.timezone ? locationData.value.timezone : '',
      }
      const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
      if(response.data.ExistUser==1 || checkbox.value==true){
        localStorage.setItem('token', response.data.token)
        const LocalStorageUser = {
          email:Email.value,
          flg_auth:'E',
          name: Email.value,
          sigla_idioma:userLocale.toUpperCase(),
          ip_origem:userIP.value,
          city: locationData.value.city ? locationData.value.city : '',
          region: locationData.value.region ? locationData.value.region : '',
          country: locationData.value.country ? locationData.value.country : '',
          loc: locationData.value.loc ? locationData.value.loc : '',
          postal: locationData.value.postal ? locationData.value.postal : '',
          timezone: locationData.value.timezone ? locationData.value.timezone : '',
          saldouser: response.data.saldouser,
          vlrpdf: response.data.vlrpdf,
          vlrpesquisa: response.data.vlrpesquisa,
          iduser: response.data.iduser,
          currency_data:response.data.currency_data,
        }
        localStorage.setItem('languages', JSON.stringify(response.data.languages));
        localStorage.setItem('user', JSON.stringify(LocalStorageUser));
        localStorage.setItem('Traducao', response.data.traducao);
        console.log('responseEmailSend',response)
        isLoading.value=false
        router.push('/mytrip/home');
      }else{
        alert('Aceite os termos para continuar')
        openModal();
      }
    }
  }
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
  