
const uploadForm = document.querySelector('#upload-form');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);

  const svgFile = uploadForm.querySelector('#svg-file').files[0];

  if (!svgFile) {
    uploadForm.classList.add('error');
    return;
  }

  if (svgFile.name.split('.')[1] !== 'svg') {
    uploadForm.classList.add('error');
    return;
  }

  formData.append('svg', svgFile);

  fetch(window.host + '/api/vector', {
    method: 'post',
    body: formData,
  }).then((res) => {
    return res.json();
  }).then((data) => {
    if (!data.success) {
      return uploadForm.classList.add('error');
    }
    uploadForm.classList.remove('error');

    const svgList = document.querySelector('.svg_list');
    const svgTile = document.createElement('div');
    svgTile.innerHTML = `<div data-file-id="${data.svgData.id}">
        <img src="${data.svgData.path}" width="100" height="100">
         <a href="/api/vector/${data.svgData.id}">show</a>
        <a href="#" class="remove_file">remove</a>
    </div>`;

    const firsChild = svgList.firstElementChild;

    svgList.insertBefore(svgTile, firsChild);

  });

});

const removeBtn = document.querySelectorAll('.remove_file');

removeBtn.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const svgElem = this.parentNode;
    const svgId = svgElem.dataset.fileId;

    fetch(window.host + `/api/vector?id=${svgId}`, {
      method: 'delete',
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success) {
        svgElem.remove();
      }
    });
  });
});
