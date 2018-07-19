	$(document).ready(function () {
	    $('#table_id').dataTable({
	        "bJQueryUI": true,
	        "sPaginationType": "full_numbers",
	        "iDisplayLength": 50,
	        "bServerSide": false,
	        "bProcessing": true,
	        "sAjaxDataProp": "feed.entry",
	        "sAjaxSource": "https://spreadsheets.google.com/feeds/list/0AsrjFAXlY190dFd1dmxNdi1jUW0yTVJ6Mi1xMzQ2YVE/od6/public/values?alt=json",
	        "aoColumns": [{
	            "mData": "gsx$series.$t",
	            "bVisible": false,
	            "mRender": function (data, type, row) {
	                return row.gsx$sort.$t + '_' + data;
	            }
	        }, {
	            "mData": "gsx$published.$t",
	            "sWidth": "4em"
	        }, {
	            "mData": "gsx$title.$t",
	            "mRender": function (data, type, row) {
	                if (row.gsx$url.$t) {
	                    return '<a href="' + row.gsx$url.$t + '"' + (row.gsx$star.$t ? ' class="star"':'') + '>' + data + '</a>';
	                } else {
	                    return data;
	                }
	            }
	        }, {
	            "mData": "gsx$media.$t",
	            "sWidth": "10em"
	        }],
	        "bSort": true,
	        "aaSortingFixed": [
	            [0, "desc"]
	        ],
	        "aaSorting": [
	            [1, "desc"]
	        ],
	        "fnDrawCallback": function (oSettings) {
	            if (oSettings.aiDisplay.length == 0) return;
	            var nTrs = $('#table_id tbody tr');
	            var iColspan = nTrs[0].getElementsByTagName('td').length;
	            var sLastGroup = "";
	            for (var i = 0; i < nTrs.length; i++) {
	                var iDisplayIndex = oSettings._iDisplayStart + i;
	                var sGroup = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData.gsx$series.$t;
	                if (sGroup != sLastGroup) {
	                    var nGroup = document.createElement('tr');
	                    var nCell = document.createElement('td');
	                    nCell.colSpan = iColspan;
	                    nCell.className = "group";
	                    nCell.innerHTML = sGroup;
	                    nGroup.appendChild(nCell);
	                    nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);
	                    sLastGroup = sGroup;
	                }
	            }
	        },
	    });
	});