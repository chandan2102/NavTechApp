$(document).ready(function () {
    ShowProgressbar();
    $("#spnSuccess").delay(5000).fadeOut();
    $("#spnError").delay(5000).fadeOut();
});
function ValidateRecordBeforeSave() {
    if ($("#txtEntNm").val() == "") {
        $("#spnEntNm").css("display", "");
        $("#spnEntNm").text("Entity Name required").delay(5000).fadeOut();
        return false;
    }
    if ($("#txtFldNm").val() == "") {
        $("#spnFldNm").css("display", "");
        $("#spnFldNm").text("Field Name required").delay(5000).fadeOut();
        //$("#spnFldNm").css("float", "right");
        return false;
    }
    if ($("#txtIsReq").val() == "") {
        $("#spnIsReq").css("display", "");
        $("#spnIsReq").text("Is Required value is required").delay(5000).fadeOut();
        return false;
    }
    if ($("#txtMaxLen").val() == "") {
        $("#spnMaxLen").css("display", "");
        $("#spnMaxLen").text("Max Length required").delay(5000).fadeOut();
        return false;
    }
    if ($("#txtFldSrc").val() == "") {
        $("#spnFldSrc").css("display", "");
        $("#spnFldSrc").text("Field Source required").delay(5000).fadeOut();
        return false;
    }
    
}