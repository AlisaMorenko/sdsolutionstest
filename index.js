const formEl = document.querySelector('#form');
const listEl = document.querySelector('.list');
const itemEl = listEl.children;
const btnDelEl = document.querySelector('.del');
const btnSortValueEl = document.querySelector('.btn-sort-value');
const btnSortNameEl = document.querySelector('.btn-sort-name');
const btnXMLEl = document.querySelector('.btn-XML');
//
formEl.addEventListener('submit', onSubmit);
btnDelEl.addEventListener('click', onDel);
btnSortValueEl.addEventListener('click', onClick);
btnSortNameEl.addEventListener('click', onClick);
listEl.addEventListener('click', onChooseItem);
btnXMLEl.addEventListener('click', onXML);

//create and add list of name/value pairs that were received from the end-user.
// Also set attributes for each value in a pair for the next sorting

function onSubmit(e) {
  e.preventDefault();
  let name = e.currentTarget.elements.name.value;
  let value = e.currentTarget.elements.value.value;
  const liEl = document.createElement('li');
  liEl.textContent = `${name}=${value}`;
  liEl.setAttribute('data-name', name.toLowerCase());
  liEl.setAttribute('data-value', value.toLowerCase());
  listEl.append(liEl);
  formEl.reset();
}

// function for sorting.
function onClick(e) {
  let sort;
  e.target.textContent === 'Sort by value'
    ? (sort = [...itemEl].sort(compareByValue))
    : (sort = [...itemEl].sort(compareByName));
  listEl.append(...sort);
}

function compareByValue(a, b) {
  const prevValue = Number(a.getAttribute('data-value'));
  const nextValue = Number(b.getAttribute('data-value'));
  const numA = !isNaN(prevValue);
  const numB = !isNaN(nextValue);
  if (numA && numB) {
    return prevValue - nextValue;
  }
  return a
    .getAttribute('data-value')
    .localeCompare(b.getAttribute('data-value'));
}

function compareByName(a, b) {
  const prevName = Number(a.getAttribute('data-name'));
  const nextName = Number(b.getAttribute('data-name'));
  const numA = !isNaN(prevName);
  const numB = !isNaN(nextName);
  if (numA && numB) {
    return prevName - nextName;
  }
  return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
}

// add active class on chosen elements in the list
function onChooseItem(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  btnDelEl.removeAttribute('disabled');
  e.target.classList.toggle('chosen');
}

// function for deleting chosen elements
function onDel() {
  document.querySelectorAll('.chosen').forEach(el => {
    el.remove();
  });
  btnDelEl.setAttribute('disabled', 'disabled');
}

//function for downloading xml-file
function onXML() {
  const string = new XMLSerializer();
  const xmlString = string.serializeToString(listEl);
  const fileName = 'file.xml';
  const link = document.createElement('a');
  const bb = new Blob([xmlString], { type: 'text/plain' });

  link.setAttribute('href', window.URL.createObjectURL(bb));
  link.setAttribute('download', fileName);

  link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
  link.draggable = true;
  link.classList.add('dragout');

  link.click();
}
