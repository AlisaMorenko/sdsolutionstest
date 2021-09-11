const formEl = document.querySelector('#form');
const btnEl = document.querySelector('.btn');
const listEl = document.querySelector('.list');
const itemEl = listEl.children;
const btnDelEl = document.querySelector('.del');
const btnSortValueEl = document.querySelector('.btn-sort-value');
const btnSortNameEl = document.querySelector('.btn-sort-name');
const btnXMLEl = document.querySelector('.btn-XML');

formEl.addEventListener('submit', onSubmit);
btnDelEl.addEventListener('click', onDel);
btnSortValueEl.addEventListener('click', onClickValue);
btnSortNameEl.addEventListener('click', onClickName);
listEl.addEventListener('click', onChooseItem);
btnXMLEl.addEventListener('click', onXML);

let arr = [];

function onSubmit(e) {
  e.preventDefault();

  let name = e.currentTarget.elements.name.value;
  let value = e.currentTarget.elements.value.value;
  const obj = {};
  obj.name = name;
  obj.value = value;
  arr.splice(0, 0, obj);
  const liEl = document.createElement('li');
  liEl.textContent = `${obj.name}=${obj.value}`;
  listEl.append(liEl);
}

//сортирует, отрисовывает, но замещает список лишками, надо придумаьб, как сделать общий ли
function onClickValue(e) {
  const sort = [...arr].sort((a, b) => a.value - b.value);
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }
  const elements = sort.map(obj => {
    const el = document.createElement('li');
    el.textContent = obj.name + '=' + obj.value;
    return el;
  });

  listEl.append(...elements);
}

function onClickName(e) {
  //саша говорил еще указывать индекс
  // const sort = [...arr].sort((a, b) => {
  //   const result = a.name[0] - b.name[0];
  //   if (result) {
  //     return 1;
  //   }
  //   if (!result) {
  //     return -1;
  //   }
  //   return 0;

  //   // a.name.localeCompare(b.name);
  // });
  const sort = [...arr].sort(compare);
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }
  const elements = sort.map(obj => {
    const el = document.createElement('li');
    el.textContent = obj.name + '=' + obj.value;
    return el;
  });

  listEl.append(...elements);
}

function compare(a, b) {
  // check for numberhood
  const numA = !isNaN(a.name);
  const numB = !isNaN(b.name);
  if (numA && numB) {
    return numA - numB;
  }

  return a.name.localeCompare(b.name);
}

//по одному удаляются
function onDel(e) {
  document.querySelectorAll('.choose').forEach(el => el.remove());
}

function onChooseItem(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  e.target.classList.toggle('choose');
}

function onXML() {
  const string = new XMLSerializer();
  const xmlString = string.serializeToString(listEl);
  // alert(xmlString);
  // var pom = document.createElement("a");

  var filename = 'file.xml';
  var pom = document.createElement('a');
  var bb = new Blob([xmlString], { type: 'text/plain' });

  pom.setAttribute('href', window.URL.createObjectURL(bb));
  pom.setAttribute('download', filename);

  pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
  pom.draggable = true;
  pom.classList.add('dragout');

  pom.click();
}
