export default function createWidgetLayout () {
  //css стили для элементов
  //виджет
  document.getElementById('email-editor').style.backgroundColor = '#DCDCDC';
  document.getElementById('email-editor').style.width = '600px';
  document.getElementById('email-editor').style.border = '3px solid black';
  //окно и заголовок

  document.getElementById('window__header').style.fontSize = '25px';
  document.getElementById('window__header').style.marginLeft = '50px';
  document.getElementById('window__header').style.fontWeight = 'normal';
  document.getElementById('window__header').style.marginTop = '0';
  document.getElementById('window__header').style.paddingTop = '20px';
  //Окно ввода емэйлов
  document.getElementById('emails').style.width = '450px';
  document.getElementById('emails').style.marginLeft  = '50px';
  document.getElementById('emails').style.height = '100px';
  document.getElementById('emails').style.border = '2px solid black';
  document.getElementById('emails').style.backgroundColor = 'white';
  document.getElementById('emails__input').style.width = '100px';
  document.getElementById('emails__input').style.outline = 'none';
  document.getElementById('emails__input').style.border = '0';
  document.getElementById('emails__placeholder').style.color = 'gray';
  document.getElementById('emails__placeholder').style.marginLeft = '3px';
  //кнопки
  document.getElementById('button_add').style.backgroundColor = '#87CEFA';
  document.getElementById('button_get').style.backgroundColor = '#87CEFA';
  document.getElementById('button_add').style.width = '150px';
  document.getElementById('button_get').style.width = '150px';
  document.getElementById('button_add').style.height = '40px';
  document.getElementById('button_get').style.height = '40px';
  document.getElementById('button_add').style.marginLeft = '50px';
  document.getElementById('button_get').style.marginLeft = '30px';
  document.getElementById('button_add').style.marginTop = '10px';
  document.getElementById('button_get').style.marginTop = '10px';
  document.getElementById('button_add').style.marginBottom = '10px';
  document.getElementById('button_get').style.marginBottom = '10px';
  document.getElementById('button_add').style.borderRadius = '8px';
  document.getElementById('button_get').style.borderRadius = '8px';
  document.getElementById('button_add').style.border = 'none';
  document.getElementById('button_get').style.border = 'none';
}