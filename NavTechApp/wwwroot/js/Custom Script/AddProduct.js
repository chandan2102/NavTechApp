
function AddNewRow(event, obj) {
    event.currentTarget.parentElement.style.display = "none";
    var length = $("#tblProduct").find('tr').length - 1;
    var strHtml = "<tr id='Row_" + length + "'>";
    strHtml += "<td><input type='text' id='txtEntNm_" + length + "' onkeypress='return filterSpclChar(event);' maxlength='50' autocomplete='off'> <br /> <span class='text-danger'></span></td > ";
    strHtml += "<td><input type='text' id='txtFldNm_" + length + "' onkeypress='return filterSpclChar(event);' maxlength='50' autocomplete='off'></br><span class='text-danger' id='spnStore_" + length + "'></span></td>";
    strHtml += "<td><input type='text' id='txtIsReq_" + length + "' onkeypress='return AllowZeroOrOne(event);' maxlength='1' autocomplete='off'></br><span class='text-danger' id='spnTermId_" + length + "' ></span></td>";
    strHtml += "<td><input type='text' id='txtMaxLen_" + length + "' onkeypress='return AllowNumber(event);' maxlength='3' autocomplete='off'></br><span class='text-danger' id='spnLoc_" + length + "'></span></td>";
    strHtml += "<td><input type='text' id='txtFldSrc_" + length + "' onkeypress='return filterSpclChar(event);' maxlength='200' autocomplete='off'></br><span class='text-danger' id='spnUpdated_" + length + "'></span></td>";
    strHtml += "<td id='tdAdd'><img style='width: 18px !important;' src='/../content/images/plus.png' id='AddRow_" + length + "' value='Add' title='Click to add new row' onclick='AddNewRow(event,this)' /></td>";
    strHtml += "<td id='removeTd'>" +
        " <a class='link' id = 'Remove_" + length + "' onclick = 'RemoveRec(this," + length + ")' title='Click to remove from list.'><img src='../content/images/trash.png' alt='Delete icon' style='width:15px;height:17px;'></a>"
        + "<span class='text-danger' id = 'spnDelete_" + length + "'></span>"
        + "</td > ";
    strHtml += "</tr>"

    event.currentTarget.parentElement.style.display = "none";
    var rowIndex = $(obj).parent().parent().index('tr');
    ValidateRowBeforeAddNew(strHtml, length, rowIndex);

}

function ValidateRowBeforeAddNew(strHtml, length, rowIndex) {
    var length = $("#tblRec").find('tr').length - 1
    var lastrow = $('#tblProduct tr:last').attr('id');
    var EntNm = $($($("#tblProduct").find('tr')[rowIndex]).find("td")[0]).find("input").val();
    var FldNm = $($($("#tblProduct").find('tr')[rowIndex]).find("td")[1]).find("input").val();
    var IsReq = $($($("#tblProduct").find('tr')[rowIndex]).find("td")[2]).find("input").val();
    var MaxLen = $($($("#tblProduct").find('tr')[rowIndex]).find("td")[3]).find("input").val();
    var FldSrc = $($($("#tblProduct").find('tr')[rowIndex]).find("td")[4]).find("input").val();

    if (EntNm == "") {
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[0]).find("span").css("display", "");
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[0]).find("span").text("EntityName is mandatory").delay(5000).fadeOut();
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
        return false;
    }
    if (FldNm == "") {
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[1]).find("span").css("display", "");
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[1]).find("span").text("FieldName week is mandatory").delay(5000).fadeOut();
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
        return false;
    }
    if (IsReq == "") {
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[2]).find("span").css("display", "");
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[2]).find("span").text("IsRequired is mandatory").delay(5000).fadeOut();
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
        return false;
    }
    if (MaxLen == "") {
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[3]).find("span").css("display", "");
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[3]).find("span").text("MaxLength is mandatory").delay(5000).fadeOut();
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
        return false;
    }
    if (FldSrc == "") {
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[4]).find("span").css("display", "");
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[4]).find("span").text("FieldSource is mandatory").delay(5000).fadeOut();
        $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
        return false;
    }
    
    if (EntNm != "" && FldNm != "") {
        $.ajax({
            url: "/Product/ValidateRecords?EntityName=" + EntNm + "&FieldName=" + FldNm,
            type: "GET",
            success: function (res) {
                if (res != null) {
                    if (JSON.stringify(res).includes("Exception")) {
                        HideProgressbar();
                        window.location.href = '/Home/Error?err=' + res;
                    }
                    else {
                        if (res == "exist") {
                            $("#lstRowDlt").css("display", "");
                            $("#lstRowDlt").text("This Entity name and Field Name already exist").delay(5000).fadeOut();
                            $($($("#tblProduct").find('tr')[rowIndex]).find("td")[5]).css("display", "");
                            return false;
                        }
                        else {
                            $("#tblProduct").append(strHtml);
                            $($($("#tblProduct").find('tr')[parseInt(rowIndex) + 1]).find("td")[1]).find("input").focus();
                            
                        }
                    }
                }
            }
        })
    }
}

function ValidateRecordBeforeSubmit() {
    var length = $("#tblProduct").find('tr').length - 1;
    var itemList = new Array();
    var lastrow = $('#tblProduct tr:last').attr('id');
    var EntNm = "";
    var FldNm = "";
    var IsReq = "";
    var MaxLen = "";
    var FldSrc = "";

    var CombArr = new Array();

    for (var i = 0; i <= length; i++) {
        if (i > 0) {

            EntNm = $($($("#tblProduct").find('tr')[i]).find("td")[0]).find("input").val();
            FldNm = $($($("#tblProduct").find('tr')[i]).find("td")[1]).find("input").val();
            IsReq = $($($("#tblProduct").find('tr')[i]).find("td")[2]).find("input").val();
            MaxLen = $($($("#tblProduct").find('tr')[i]).find("td")[3]).find("input").val();
            FldSrc = $($($("#tblProduct").find('tr')[i]).find("td")[4]).find("input").val();

            if (EntNm == "") {
                $($($("#tblProduct").find('tr')[i]).find("td")[0]).find("span").css("display", "");
                $($($("#tblProduct").find('tr')[i]).find("td")[0]).find("span").text("EntityName is mandatory").delay(5000).fadeOut();
                $($($("#tblProduct").find('tr')[i]).find("td")[5]).css("display", "");
                return false;
            }
            if (FldNm == "") {
                $($($("#tblProduct").find('tr')[i]).find("td")[1]).find("span").css("display", "");
                $($($("#tblProduct").find('tr')[i]).find("td")[1]).find("span").text("FieldName is mandatory").delay(5000).fadeOut();
                $($($("#tblProduct").find('tr')[i]).find("td")[5]).css("display", "");
                return false;
            }
            if (IsReq == "") {
                $($($("#tblProduct").find('tr')[i]).find("td")[2]).find("span").css("display", "");
                $($($("#tblProduct").find('tr')[i]).find("td")[2]).find("span").text("IsRequired is mandatory").delay(5000).fadeOut();
                $($($("#tblProduct").find('tr')[i]).find("td")[5]).css("display", "");
                return false;
            }
            if (MaxLen == "") {
                $($($("#tblProduct").find('tr')[i]).find("td")[3]).find("span").css("display", "");
                $($($("#tblProduct").find('tr')[i]).find("td")[3]).find("span").text("MaxLength week is mandatory").delay(5000).fadeOut();
                $($($("#tblProduct").find('tr')[i]).find("td")[5]).css("display", "");
                return false;
            }
            if (FldSrc == "") {
                $($($("#tblProduct").find('tr')[i]).find("td")[4]).find("span").css("display", "");
                $($($("#tblProduct").find('tr')[i]).find("td")[4]).find("span").text("FieldSource is mandatory").delay(5000).fadeOut();
                $($($("#tblProduct").find('tr')[i]).find("td")[5]).css("display", "");
                return false;
            }
            
            if (EntNm != "" && FldNm != "") {
                value = EntNm + "_" + FldNm;
                if ($.inArray(value, CombArr) == -1) {
                    CombArr.push(value);
                }
                else {
                    $("#lstRowDlt").css("display", "");
                    $("#lstRowDlt").text("This" + value.replace("_", ",") + " EntityName and FieldName are duplicate input").delay(5000).fadeOut();
                    return false;
                }
            }
        }
    }
    document.getElementById("progressModal").style.display = "block";
    document.getElementById("loading-image").style.display = "block";
    SubmitRecord();
}

function SubmitRecord() {
    var length = $("#tblProduct").find('tr').length - 1;
    var itemList = new Array();
    for (var i = 0; i <= length; i++) {
        if (i > 0) {
            var objRec = {
                EntityName: $($($("#tblProduct").find('tr')[i]).find("td")[0]).find("input").val(),
                FieldName: $($($("#tblProduct").find('tr')[i]).find("td")[1]).find("input").val(),
                IsRequired: parseInt($($($("#tblProduct").find('tr')[i]).find("td")[2]).find("input").val()),
                MaxLength: $($($("#tblProduct").find('tr')[i]).find("td")[3]).find("input").val(),
                FieldSource: $($($("#tblProduct").find('tr')[i]).find("td")[4]).find("input").val()
            }
            itemList.push(objRec);
        }
    }
    $.ajax({
        type: 'POST',
        url: '/Product/AddRecords',
        data: { itemList: JSON.stringify(itemList) },
        dataType: 'json',
        success: function (res) {
            debugger;
            if (JSON.stringify(res).includes("Exception")) {
                HideProgressbar();
                window.location.href = '/Home/Error?err=' + res;
            }
            else {
                if (res == "success") {
                    HideProgressbar();
                    ShowModal("Record/s added successfully");
                }
                else if (res == "updated") {
                    HideProgressbar();
                    ShowModal("Record/s updated successfully");
                }
                else {
                    HideProgressbar();
                    ShowModal("There was a issue while adding records");
                }
            }
        }
    });
}

function RemoveRec(obj, index) {
    var rowId = $(obj).parent().parent().index('tr');
    var length = $("#tblProduct").find('tr').length - 1;
    var lastrow = $('#tblProduct tr:last').attr('id');
    if (length > 1) {
        var lastrow = $('#tblProduct tr:last').attr('id');
        var idval = lastrow.split("_")[1];
        document.getElementById("tblProduct").deleteRow(rowId);
        if (index == idval) {
            for (var i = length; i > 0; i--) {

                if ($('#tblProduct tr').eq(i - 1).is(':visible')) {
                    $($('#tblProduct tr').eq(i - 1).find("td")[5]).css("display", "");
                    break;
                }
            }
        }
    }
    else {
        $("#lstRowDlt").css("display", "");
        $("#lstRowDlt").text("All row can not be deleted").delay(5000).fadeOut();
    }

}
