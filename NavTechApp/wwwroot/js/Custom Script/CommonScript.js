function AllowNumber(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^[0-9]+$/;
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        return false;
    }
}
function AllowCharacterOnly(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^[a-zA-Z]+$/;
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        return false;
    }
}

function AllowZeroOrOne(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^[0|1]+$/;
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        return false;
    }
}

function ShowProgressbar() {
    document.getElementById("progressModal").style.display = "block";
    $('#loading-image').css("display", "");
}

function HideProgressbar() {
    document.getElementById("progressModal").style.display = "none";
    $('#loading-image').css("display", "none");
}

function ShowModal(msg) {
    $("#myDialogText").text(msg);
    document.getElementById("myModal").style.display = "block";

}

function CloseModal() {
    document.getElementById("myModal").style.display = "none";

    if (window.location.href.indexOf('?') > 0) {
        var newHref = window.location.href.split('?')[0];
        window.location.href = newHref;
    }
    else
        window.location.href = window.location.href;
}

function OpenDeleteModal(msg) {
    document.getElementById("confirmModal").style.display = "block";
}

function CloseDeleteModal() {
    document.getElementById("confirmModal").style.display = "none";
    window.location.href = window.location.href;
}

function OpenAddModal() {
    document.getElementById("AddEditModal").style.display = "block";
}

function CloseAddModal() {
    document.getElementById("AddEditModal").style.display = "none";
}

function CloseAddEditModal() {
    document.getElementById("AddEditModal").style.display = "none";
}

function GetFormattedDate(date) {
    var dateString = date;
    var Dt = new Date(dateString);
    var year = Dt.getFullYear();
    var month = Dt.getMonth() + 1;
    var day = Dt.getDate();
    if (day.toString().length == 1)
        day = "0" + day;
    if (month.toString().length == 1)
        month = "0" + month;
    return month + '-' + day + '-' + year;
}

function AllowYorN(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^(?:Y|N|y|n)$/;
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        return false;
    }
}

//Filter out following special characters as input
//33 !	34 "	36 $	42 *	58 :	60 <	61 =	62 >	63 ?	92 \	94 ^	96 `	124 |	126 ~
function filterSpclChar(event) {
    let key = event.key;
    let keyCharCode = key.charCodeAt(0);
    
    if (keyCharCode == 33 || keyCharCode == 34 || keyCharCode == 36 || keyCharCode == 42 || keyCharCode == 58 || keyCharCode == 60 || keyCharCode == 61 || keyCharCode == 62 || keyCharCode == 63 || keyCharCode == 92 || keyCharCode == 94 || keyCharCode == 96 || keyCharCode == 124 || keyCharCode == 126) {
        event.preventDefault();
    }
}

function AllowAorIorU(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^(?:A|I|U|a|i|u)$/;
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        return false;
    }
}