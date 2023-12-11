import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
function Helloworld(){
    return(<body><div><h1>Hello World</h1><img src={kotwBbutacch} alt={"Da  pan 5"}/></div></body>);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helloworld />
  </React.StrictMode>
);
const kotwBbutacch = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaekranie.pl%2Faktualnosci%2Fkot-w-butach-ostatnie-zyczenie-zwiastun-premiera-1647366708&psig=AOvVaw35M9Tw9c0VSyiM8NGjwG5A&ust=1702381388276000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC5rIGnh4MDFQAAAAAdAAAAABAE"


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

