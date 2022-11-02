import logo from './logo.svg';
import './App.css';
import google from 'googlethis'
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [Links, setLinks] = useState([])
  const [Titles, setTitles] = useState([])

  const handleImageUpload = event => {
    console.log('event is ',event)
    console.log(event)
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID 557a0520f2b380d");
// myHeaders.append('Accept', 'application/json')

// var formdata = new FormData();
const files = event.target.files
console.log('length of files', files.length)
console.log('files ', files)
const formData = new FormData()
formData.append('image', files[0])

// for (var [key, value] of formData.entries()) { 
//   console.log(key, value);
//  }


var requestOptions = {
method: 'POST',
headers: myHeaders,
body: formData,
redirect: 'follow'
};



fetch("https://api.imgur.com/3/image", requestOptions)
.then(response => response.json())
.then(res => {
  console.log('IMGUR LINK')
  console.log(res.data.link)
    
  let yandex_link = `https://yandex.com/images/search?rpt=imageview&url=${res.data.link}`

  axios
 .get(yandex_link)
 .then(res => {
          console.log('1111')
            let html_data = res.data;
            console.log(html_data)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html_data, "text/html");
            const l = doc.getElementsByClassName('CbirSites-Items');
            let q = l[0].getElementsByTagName('li')
            let qq = [...q]
            let links = qq.map(i => i.getElementsByClassName('CbirSites-ItemTitle')[0].getElementsByTagName('a')[0].href   )
            let titles = qq.map(i => i.getElementsByClassName('CbirSites-ItemTitle')[0].getElementsByTagName('a')[0].innerText  )
          console.log('2222')
            setLinks(links)
            setTitles(titles)
            console.log(links)
            console.log(titles)
          })
          .catch(err => {
              console.log('err is ',err)
          })

} )
.catch(error => console.log('error', error));


// axios({
//   method: "POST",
//   url: "https://api.imgur.com/3/image",
//   data: formData,
//   headers: { "Authorization": "Client-ID 557a0520f2b380d", "Content-Type": "multipart/form-data" } ,
// })
//   .then(function (response) {
//     //handle success
//     console.log(response);
//   })
//   .catch(function (response) {
//     //handle error
//     console.log('err is ',response);
//   });

}

 
// ------------------ GOOGLE--------------------------
//   const google_input = 'https://www.collinsdictionary.com/images/full/apple_158989157_1000.jpg'
// console.log('--------------------------------GOOGLE------------------------------------------------')
//   google.search(google_input, { ris: true }).then(res => console.log(res.results)).catch(err => console.log('err is',err))
//   console.log('--------------------------------GOOGLE------------------------------------------------')

// -------------- YANDEX ---------------------------
  // This link comes from imgur
//   let image_link = 'https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg';
// let yandex_link = `https://yandex.com/images/search?rpt=imageview&url=${image_link}`
// // console.log(yandex_link)
 
  
// Creating Our XMLHttpRequest object 
// var xhr = new XMLHttpRequest();
  
// Making our connection  
// var url = 'https://jsonplaceholder.typicode.com/todos/1';
// let url  = yandex_link;
// xhr.open("GET", url, true);

// // function execute after request is successful 
// xhr.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//     }
// }
// // Sending our request 
// xhr.send();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

                    <h1>test</h1>
                    {/* <input type="file" id="fileUpload" onChange="handleImageUpload(event)"/> */}
                    <input type="file" id="fileUpload" onChange={(e) => handleImageUpload(e)}/>

    <ul>
      {Titles.map((element, index) => {
        return (<li><a href={Links[index]}>{element}</a></li>)
      })}
  </ul>

      </header>
    </div>
  );
}

export default App;