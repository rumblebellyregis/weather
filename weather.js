



Vue.component('linechart', {
    extends: VueChartJs.Line,
    props:["options","beta"],
    mounted(){
        this.buf()
    },
  
 methods : {
     buf:function(){
    this.renderChart({
        
      labels: this.options,
        
      datasets: [
        { 
          label: 'Temperature for five days',
          data: this.beta
        }
      ]
    }, {responsive: true, maintainAspectRatio: false,})},
  },
  watch: {
    "beta"() {
     if(this.beta.length>0)   {
    this.buf()
     }
        
      
    }
  }
})


    

var app =new Vue({

    el: '#vue-app',

    data: {
        buttons:false,
        fivey:false,
        close:false,
        closecity:null,
        search:"",
        info: null,
        ok:false,
        loading: true,
        map:false,
        url:"",
        current:false,
        currentw:null,
        fiveday:null,
        id:"",
        chart:false,
        chartx: null,
        charty:null,
        position:"",
        
     /*api.openweathermap.org/data/2.5/weather?id=&APPID=60238def406768de161c9c0ff12fb209
    api.openweathermap.org/data/2.5/weather?id=2172797*/

    },
    mounted() {
        
                   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition,errorCallback);
               
        
                
    } else { 
         urlCurrrent="https: //api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl&APPID=60238def406768de161c9c0ff12fb209"
        {axios
                .get(urlCurrrent,)
                .then(response => {
                app.currentw = response.data;
            console.log("c")
                app.loading=false;
                app.current=true;
                                     })
            .catch(r => console.log(r))}
    }
           function showposition(position)
        {
            lat=position.coords.latitude;
        long=position.coords.longitude
                console.log(long,lat)
            urlcloseten="https://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+long+"&cnt=10&APPID=60238def406768de161c9c0ff12fb209"
            console.log(urlcloseten)
            {axios
                                     .get(urlcloseten,)
                .then(response => {
                    app.closecity = response.data;
                    console.log("a")
                    app.loading=false;
                    app.close=true;
                console.log(app.loading)
                console.log(long,lat)
                                     })
            .catch(r => console.log(r))
        }}
        function errorCallback(error) {
    if (error.code == error.PERMISSION_DENIED) {
        console.log("d")
        urlCurrrent="https://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl&APPID=60238def406768de161c9c0ff12fb209"
        //https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
        {axios
                .get(urlCurrrent,)
                .then(response => {
                app.currentw = response.data;
            console.log("c")
                app.loading=false;
                app.current=true;
                                     })
            .catch(r => console.log(r))}
        // pop up dialog asking for location
    }
            console.log("b")


        
    }},
    methods:{
        location:function(){ console.log(this.loading)
    
},

fivedaydata:function(){
          urlForecast="https://api.openweathermap.org/data/2.5/forecast?q="+this.search+"&APPID=60238def406768de161c9c0ff12fb209"
    //"https://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+long+"&cnt=10&APPID=60238def406768de161c9c0ff12fb209"
        console.log(this.search)
    {axios
                .get(urlForecast,)
                .then(response => {
                    this.fiveday = response.data;
                              this.fivey=true;
                              this.buttons=true;
                              this.chartbuilder()
                             
                         })
                                    
                
                
                    
               
            .catch(r => alert("Something went terribly wrong \n and we wont tell you reasion\n probably we cannot find what are you looking for\n try search city name,two letter country code"))}
                     
    },
 classbuilder:function(deg){
     deg=parseInt(deg)
     console.log(deg)
     //class="wi wi-wind towards-23-deg 240
     deg="wi wi-wind from-"+deg+"-deg"
     return deg
 },
         
            
                   
        urlbuilder:function(c){
            url1="http://openweathermap.org/img/w/"+c+".png"
            return url1
        
    },
        temp:function(a){
            a=(a-273.15).toFixed(2)
            //console.log(a)
            return a
        },
date:function(b){
    months=["Jan", "Feb","Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    date=new Date(b*1000)
    
    month=date.getMonth()
    month=months[month]
    day=date.getDate()
    if (day<10){
        day="0"+day
    }
    else{
        day=day.toString()
    }
    console.log(day, month)
    hour=date.getHours()
    if(hour<10){
        hour="0"+hour
    }
    else{
       hour= hour.toString()
    }
    minute=date.getMinutes()
     if(minute<10){
        minute="0"+minute
    }
    else{
       minute=minute.toString()
    }
    date=day+"-"+month+" "+hour+":"+minute
    return date
    
},
  chartbuilder:function(){
      chartx=[]
      charty=[]
      
      for(i=0; i<this.fiveday.list.length; i++){
          //console.log(i)
             date=new Date(this.fiveday.list[i].dt*1000)
           hour=date.getHours()
         if(hour<10){
           hour="0"+hour
    }
       minute=date.getMinutes()
     if(minute<10){
        minute="0"+minute
    }
    date=hour+":"+minute
          date=date.toString()
          //console.log(typeof(date))
          //console.log(typeof((this.fiveday.list[i].main.temp-273.15)))
          
          chartx.push(date)
          charty.push((this.fiveday.list[i].main.temp-273.15))
      }
      this.chartx=chartx
      this.charty=charty

      this.chart=true
      
  },      
    },
})
