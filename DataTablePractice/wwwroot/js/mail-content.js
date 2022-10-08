const emailForm = document.getElementById('email-form');

emailForm.onsubmit = function (e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    let toEmail = formData.get('to');
    let subject = formData.get('subject');
    let attachment = formData.get('attachment');

    console.log(attachment)
    //$.ajax({
    //    type: 'POST',
    //    url: '/Home/SendMail',
    //    data: {
    //        requestData: JSON.stringify(newFile)
    //    },

    //    success: function (data) {
    //        console.log(data)
    //    }
    //});
}
//async function fileToArray(file) {
//    const buffer = await file.arrayBuffer();
//    let byteArray = new Int8Array(buffer);
//    console.log(byteArray)

//}