const uploadForm = document.querySelector('#upload-form');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);

  const svgFile = uploadForm.querySelector('#svg-file').files[0];

  if (!svgFile) {
    console.log('нема файлу');
  }

  if (svgFile.name.split('.')[1] !== 'svg') {
    console.log('не svg');
  }

  formData.append('svg', svgFile);

  fetch(window.host + '/api/vector', {
    method: 'post',
    body: formData,
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data);
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
