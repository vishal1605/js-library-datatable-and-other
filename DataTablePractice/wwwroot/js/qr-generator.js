const formProcess = document.getElementById('form-submit');
const loader = document.getElementById('loader');
const imgSrc = document.getElementById('my-qr');
const btnDiv = document.getElementById('btn-div');
const downloadLink = document.getElementById('download-link');
const formInput = document.getElementById('data-string');


formProcess.onsubmit = function (e) {
    e.preventDefault();
    loader.style.display = '';
    $.ajax({
        type: 'POST',
        url: '/Home/ProcessQr',
        data: {
            requestData: JSON.stringify(formInput.value)
        },
        success: function (responseObject) {

            imgSrc.src = 'data:image/png;base64,' + responseObject;
            downloadLink.href = 'data:image/png;base64,' + responseObject;
            downloadLink.download = new Date().toString();
            loader.style.display = 'none';
            btnDiv.style.display = '';

        }
    });
    formInput.value = "";
}