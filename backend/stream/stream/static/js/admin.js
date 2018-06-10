
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var crf_token = Cookies.get('csrftoken');
     $(document).ready(function() {
                var sendData = ev.target.id=="inactive" ? false : true;
                var url = '/api/user/' + data + '/';
                $.ajax({
                    url: url,    //Your api url
                    type: 'PATCH',   //type is any HTTP method
                    data: {
                        "is_active": sendData
                    },
                    headers:{"X-CSRFToken": crf_token},
                    success: function () {
                    }
                });
            });
}

