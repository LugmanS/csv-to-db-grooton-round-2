const uploadForm = document.getElementById('upload-form');
const saveForm = document.getElementById('save-form');
const input = document.getElementById('file-input');
const uploadStatus = document.getElementById('upload-status');
const saveOpt = document.getElementById('save-html');
const saveProgress = document.getElementById('save-progress');
const timeTake = document.getElementById('timeTaken');
const elem = document.getElementById("myBar");

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('files', input.files[0]);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();

  if (data.msg) {
    uploadStatus.style.display = "block";
    uploadStatus.innerHTML = `File uploaded, File has ${data.msg} rows.`;
    saveOpt.style.display = "block";
    uploadStatus.classList.remove('bad');
    uploadStatus.classList.add('good');
  }
  else if (data.error) {
    uploadStatus.style.display = "block";
    uploadStatus.innerHTML = data.error;
    uploadStatus.classList.add('bad');
  }
  else {
    uploadStatus.style.display = "block";
    uploadStatus.innerHTML = "Error uploading file to server!";
    uploadStatus.classList.add('bad');
  }

});

saveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/save');
  const initTime = new Date().getTime();
  const info = setInterval(getInfo, 1000);
  async function getInfo() {
    const response = await fetch('/info');
    const data = await response.json();
    let width = (data.current_completed / data.total) * 100;
    elem.style.width = width + '%';
    saveProgress.innerHTML = `Total rows uploaded : ${data.current_completed}/${data.total}`;
    if (data.current_completed == data.total) {
      const endTime = new Date().getTime();
      const timeTaken = ((endTime - initTime) / 60000).toFixed(2);
      timeTake.innerHTML = `Total time take : ${timeTaken} minute(s)`;
      clearInterval(info);
      setTimeout(() => location.reload(), 7000);
    }
  };

});



