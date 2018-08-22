/*
   Copyright 2018 Pekka Sillberg

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

"use strict";

var exporter = {
	id: "bggExportDialog",
	dialogHandle: null,
	init: function(parentElement, tableHandles){
		if(!document.getElementById(this.id)){
			$(parentElement).append('<div id="'+this.id+'" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg" role="document"><div class="modal-content">\
				<div class="modal-header"><h4 class="modal-title" id="myLargeModalLabel">BGG End of Game Exporter</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>\
				<div class="modal-body"></div>\
			</div></div></div>');
			this.dialogHandle = $("#"+this.id);
		}
		this.__setDialogText(this.dialogHandle, tableHandles);
		this.dialogHandle.modal();
	},
	__setDialogText: function(dialog, tableHandles){
		var items = {};
		items["Upcoming Crises"] = this.__rowRetriever(tableHandles.crisis.tabulator("getData"));
		items["Next Destinations"] = this.__rowRetriever(tableHandles.destination.tabulator("getData"));
		items["Quorum Hand"] = this.__rowRetriever(tableHandles.quorum.tabulator("getData"), true);
		items["Remaining Quorum Deck"] = this.__rowRetriever(tableHandles.quorum.tabulator("getData"), false, true);
		items["Remaining Mutiny Deck"] = this.__rowRetriever(tableHandles.mutiny.tabulator("getData"), false, true);

		var modalBody = dialog.find(".modal-body");
		modalBody.empty();
		for(var prop in items){
			var content = "<div><h5>"+prop + ":</h5><ol>";
			for(var item in items[prop]){
				content += "<li>"+items[prop][item]+"</li>";
			}
			content += "</ol></div>";
			modalBody.append(content);
		}
	},
	__rowRetriever: function(tableData, includeHand, includeWholeDeck){
		var itemArray = [];
		for(var row in tableData){
			if(includeHand){
				if(tableData[row].inPlay){
					itemArray.push(tableData[row].name);
				}
			}else{
				if(!tableData[row].discarded){
					itemArray.push(tableData[row].name);
					if(!includeWholeDeck && itemArray.length >= 10){
						break;
					}
				}
			}
		}
		return itemArray;
	}	
}
