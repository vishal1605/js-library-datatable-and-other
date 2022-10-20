var editor;
$(document).ready(function () {
    editor = new $.fn.dataTable.Editor({

        table: "#user_id",
        ajax: {
            type: 'POST',
            url: "/Home/AllPostRequest",
            data: function (editorData) {
                console.log(editorData);
                return {

                    requestData: JSON.stringify(editorData)
                };
            },
            success: function (result) {
                console.log($('#user_id').DataTable().data().count());
                console.log(result);

            }

        },
        /*idSrc: 'id',*/
        fields: [


            {
                label: "Email:",
                name: "email"
            },
            {
                label: "Name:",
                name: "name"
            },
            {
                label: "Password:",
                name: "psw"
            }
        ]

    });
    $('#user_id').DataTable({
        //order:[[0,'desc']],
        stateSave: true,
        searchBuilder: {
            //columns:[3],
            conditions: {
                "date": {
                    '=': {
                        conditionName: 'Equals',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            var el = $('<input/>')
                                .addClass("dtsb-value")
                                .addClass("dtsb-input")
                                .dtDateTime({
                                    attachTo: 'input',

                                })
                                .on('input change', function () { fn(that, this); });
                            // Add mechanism to apply preDefined values that may be passed in
                            if (preDefined !== null) {
                                $(el).val(preDefined[0]);
                            }

                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return $(el[0]).val();
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder

                            console.log();

                            return new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')).toString() === moment(comparison[0]).toDate().toString();
                        }

                    },
                    '<': {
                        conditionName: 'Before',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            var el = $('<input/>')
                                .addClass("dtsb-value")
                                .addClass("dtsb-input")
                                .dtDateTime({
                                    attachTo: 'input',

                                })
                                .on('input change', function () { fn(that, this); });

                            // Add mechanism to apply preDefined values that may be passed in
                            if (preDefined !== null) {
                                $(el).val(preDefined[0]);
                            }

                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return $(el[0]).val();
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder

                            return new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) < moment(comparison[0]).toDate();
                        }

                    },
                    '>': {
                        conditionName: 'After',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            var el = $('<input/>')
                                .addClass("dtsb-value")
                                .addClass("dtsb-input")
                                .dtDateTime({
                                    attachTo: 'input',

                                })
                                .on('input change', function () { fn(that, this); });

                            // Add mechanism to apply preDefined values that may be passed in
                            if (preDefined !== null) {
                                $(el).val(preDefined[0]);
                            }

                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return $(el[0]).val();
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder

                            return new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) > moment(comparison[0]).toDate();
                        }

                    },
                    '!=': {
                        conditionName: 'Not',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            var el = $('<input/>')
                                .addClass("dtsb-value")
                                .addClass("dtsb-input")
                                .dtDateTime({
                                    attachTo: 'input',

                                })
                                .on('input change', function () { fn(that, this); });

                            // Add mechanism to apply preDefined values that may be passed in
                            if (preDefined !== null) {
                                $(el).val(preDefined[0]);
                            }

                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return $(el[0]).val();
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder

                            console.log();

                            return +new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) != +moment(comparison[0]).toDate();
                        }

                    },
                    'between': {
                        conditionName: 'Between',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            let el = [
                                $('<input/>')
                                    .addClass("dtsb-value")
                                    .addClass("dtsb-input")
                                    .dtDateTime({
                                        attachTo: 'input',

                                    })
                                ,
                                $('<span>')
                                    .addClass(that.classes.joiner)
                                    .text('and'),
                                $('<input/>')
                                    .addClass("dtsb-value")
                                    .addClass("dtsb-input")
                                    .dtDateTime({
                                        attachTo: 'input',

                                    })
                                    .on('input change', function () { fn(that, this); })
                            ];

                            // If there are and preDefined values then add them


                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return [$(el[0]).val(), $(el[2]).val()];
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder
                            console.log(new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) > moment(comparison[0]).toDate() && new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) < moment(comparison[1]).toDate())

                            return new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) >= moment(comparison[0]).toDate() && new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) <= moment(comparison[1]).toDate();
                        }

                    },
                    '!between': {
                        conditionName: 'Not Between',
                        init: function (that, fn, preDefined = null) {
                            // Declare the input element and set the listener to trigger searching
                            let el = [
                                $('<input/>')
                                    .addClass("dtsb-value")
                                    .addClass("dtsb-input")
                                    .dtDateTime({
                                        attachTo: 'input',

                                    })
                                ,
                                $('<span>')
                                    .addClass(that.classes.joiner)
                                    .text('and'),
                                $('<input/>')
                                    .addClass("dtsb-value")
                                    .addClass("dtsb-input")
                                    .dtDateTime({
                                        attachTo: 'input',

                                    })
                                    .on('input change', function () { fn(that, this); })
                            ];

                            // If there are and preDefined values then add them


                            return el;
                        },
                        inputValue: function (el) {
                            // Return the value within the input element

                            return [$(el[0]).val(), $(el[2]).val()];
                        },
                        isInputValid: function (el, that) {
                            // If there is text in the input element then it is valid for searching
                            return $(el[0]).val().length !== 0;
                        },
                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder
                            console.log(new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) > moment(comparison[0]).toDate() && new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) < moment(comparison[1]).toDate())

                            return !(new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) >= moment(comparison[0]).toDate() && new Date(moment(value, 'DD/MM/YY').format('YYYY/MM/DD')) <= moment(comparison[1]).toDate());
                        }

                    },
                    'null': {
                        conditionName: 'Empty',


                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder


                            return (value === '-');
                        }

                    },
                    '!null': {
                        conditionName: 'Not Empty',


                        search: function (value, comparison) {
                            // Use the modulo (%) operator to check that there is no remainder


                            return !(value === '-');
                        }

                    }


                }

            }
        },
        dom: 'QBfrtip',
        //select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit", editor: editor },

            //{
            //    extend: 'remove',
            //    editor: editor,
            //    action: function (e, dt, node, config) {
            //        $.ajax({
            //            type: 'GET',
            //            url: "/Home/FakeData",
            //            data: {
            //                requestType: 'jgvuyhium',
            //                requestData: JSON.stringify(dt.rows({ selected: true }).data()["0"].id)
            //            },
            //            success: function (data) {
            //                if (data == 0) {
            //                    editor.remove($('#user_id').DataTable().row({ selected: true }).index(), {
            //                        title: 'Delete',
            //                        buttons: 'delete',
            //                        message: 'Are you sure you want to delete 1'
            //                    });
            //                } else {
            //                    alert("Not possible")
            //                }
            //            }

            //        })

            //    },


            //}

        ],

        ajax: {
            type: 'GET',
            url: "/Home/GetData",
            data: 'data',
        },
        columns: [

            //{ data: 'id' },
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'email' },
            { data: 'name' },
            { data: 'psw' },
            {
                data: 'registerDate',
                searchBuilderType: 'date',
                render: function (date) {
                    return moment(date).format('DD/MM/YY')
                },

            },
            //{
            //    data: 'updatedate',
            //    searchBuilderType: 'date',
            //    render: function (date) {
            //        return (date == null) ? "-" : moment(date).format('DD/MM/YY')
            //    },

            //},
            {
                data: '',
                render: function () {
                    return '<button class="btn btn-danger">Delete</button>'
                }
            }


        ],







    });
    $('#user_id tbody').on('click', 'button', function () {
        editor.remove($('#user_id').DataTable().row($(this).parents('tr'))).submit();


    });
    $('#user_id tbody').on('click', 'td.dt-control', function () {
        
        var tr = $(this).closest('tr');
        var row = $('#user_id').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(`
<table id="child_id" class="display" style="width:100%">
            <thead>
                <tr>
                    
                    
                    <th>Email</th>
                    <th>Name</th>
                    <th>Psw</th>
                    <th>Register Date</th>
                    

                </tr>
            </thead>
        </table>

                `).show();
            tr.addClass('shown');
        }
        var table = $('#child_id').DataTable({
            ajax: {
                type: 'GET',
                url: "/Home/GetData",
                data: 'data',
            },
            "paging": false,
            "columns": [
                { data: 'email' },
                { data: 'name' },
                { data: 'psw' },
                {
                    data: 'registerDate',
                    searchBuilderType: 'date',
                    render: function (date) {
                        return moment(date).format('DD/MM/YY')
                    },

                },
            ],
            //"order": [[1, 'asc']],
            "dom": 'rtip'
        });
    });

});

function format() {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' +
        Vishal +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' +
        guhuhiu +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
    );
}

//////////////////////////////////////////////////Email Form Operation//////////////////////////////

//emailForm.onsubmit = function (e) {
//    e.preventDefault();
//    var formData = new FormData(e.target);
//    let toEmail = formData.get('to');
//    let subject = formData.get('subject');
//    let attachment = formData.get('attachment');
//    fileToArray(attachment);

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
//}
//async function fileToArray(file) {
//    const buffer = await file.arrayBuffer();
//    let byteArray = new Int8Array(buffer);
//    console.log(byteArray)

//}