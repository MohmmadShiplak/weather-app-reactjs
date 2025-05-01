import logo from './logo.svg';
import './App.css';
import Test from './Test';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//Material UI component
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

//React 
import { useEffect,useState } from 'react';

//External Libraries
import axios from "axios"
import moment from "moment";
import { useTranslation } from 'react-i18next';
import "moment/min/locales"
moment.locale("ar")
const theme=createTheme({

typography:{
  fontFamily:["IBM"]
}


})
let CancelAxios =null;
function App() {

  const { t, i18n } = useTranslation();





const [dateAndTime,setDateandTime]=useState("")
const [temp,setTemp]=useState({

number:null,
description:"",
min:null,
max:null,
icon:null
})

const [locale,setLocal]=useState("ar")

const direction = locale == "ar"? "rtl":"ltr";
// ============ Event Handlers =============
function handleLangaugeClick()
{

  if(locale == "en")
{
setLocal("ar")
i18n.changeLanguage("ar")
moment.locale("ar")
}
else
{
setLocal("en")
i18n.changeLanguage("en")
moment.locale("en")
}

setDateandTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
}



 
useEffect(()=>{
  i18n.changeLanguage("ar")
setDateandTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
  axios.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=875d6d1411ace0e950098bd01b55e721',{

    cancelToken : new axios.CancelToken((c)=>{
CancelAxios =c;
    })


  })
  .then( (response)=>{
   const responseTemp =Math.round(response.data.main.temp-272.15)
  

const min =Math.round(response.data.main.temp_min-272.15);
const max =Math.round(response.data.main.temp_max-272.15);
const description =response.data.weather[0].description;
const iconresponse =response.data.weather[0].icon;

    setTemp({
      number:responseTemp,min:min, max:max,description:description,icon:`https://openweathermap.org/img/wn/${iconresponse}@2x.png`
    })
  
  })
  .catch( (error)=> {
    // handle error
    console.log(error);
  })

return ()=>{
CancelAxios();
}



},[])


  return (
    <div className="App">
      <ThemeProvider theme={theme} >
      <Container maxWidth="sm" >
    
{/* content Container  */}
<div style={{height:"100vh", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

{/*CARD */}
<div dir={direction} style={{background:"#3f51b5",color:'white',padding:"10px",borderRadius:"15px", boxShadow:"0px 11px 1px rgpa(0,0,0,0,0.05)",width:"100%"}} >

{/*content */}
<div>

{/*city & time */}

<div style={{display:"flex",alignItems:"end",justifyContent:"start"}} dir={direction}>

<Typography variant="h2" style={{marginRight:"20px", fontWeight:"600"}} >
   {t("Riyadh")}
      </Typography>

      <Typography variant="h5" style={{marginRight:"20px"}} >
{dateAndTime}
      </Typography>


</div>

{/*==city & time==*/}

<hr/>
{/*Container of degree + cloud Icons    */}
<div style={{display:"flex", justifyContent:"space-around"

}}>
{/* degree & description*/}
<div>

{/* Degree & Description */}
<div>

{/* Temp */}
<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"10px"}}>    
    <Typography variant="h1" style={{textAlign:"right"}} >
{temp.number}
      </Typography>

{/* Todo: Temp image   */}

<img 

src={
temp.icon
}
/>



</div>
{/* Temp */}

<Typography variant="h6"  >
{t(temp.description)}
      </Typography>

{/* MIN & MAX   */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

<h6>  {t("min")}:{temp.min}</h6>
<h6>|</h6>
<h6>  {t("max")}:{temp.max}</h6>
</div>

</div>
{/* Degree & Description */}

</div>

{/* ==degree & description==*/}

< CloudIcon  style ={{fontSize:"200px",color:"white"}}/>
</div>
{/* === degree & description ===*/}
</div>

{/*==content==*/}



</div>
{/*==CARD===*/}

{/* Translation Container*/}


<div dir={direction} style={{display:"flex",justifyContent:"end",width:"100%",marginTop:"20px"}}>

<Button onClick={handleLangaugeClick} style={{color:"white"}} variant="text">{locale == "en"?"Arabic":"أنجليزي"}</Button>

</div>

{/*=== Translation Container ===*/}

{/*===content Container=== */}

</div>
      </Container>
      </ThemeProvider>

    </div>
  );
}

export default App;
