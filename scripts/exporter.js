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
	seed: null,
	init: function(parentElement, tableHandles, seed){
		if(!document.getElementById(this.id)){
			$(parentElement).append('<div id="'+this.id+'" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg" role="document"><div class="modal-content">\
				<div class="modal-header"><h4 class="modal-title" id="myLargeModalLabel">BGG End of Game Exporter</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>\
				<div class="modal-footer"><span>Include BGG Markup:</span><label class="switch"><input id="inputIncludeBggMarkup" type="checkbox" checked><span class="slider round"></span></label></div>\
				<div class="modal-body selectable"></div>\
			</div></div></div>');
			this.dialogHandle = $("#"+this.id);
			this.dialogHandle.find("#inputIncludeBggMarkup").on("change", this.__dialogHandler.bind(this));
		}
		this.seed = seed;
		this.__setDialogText(this.dialogHandle, this.__itemBuilder(tableHandles));
		this.dialogHandle.modal();
	},
	__setDialogText: function(dialog, items){
		var modalBody = dialog.find(".modal-body");
		modalBody.empty();
		for(var prop in items){
			var section = document.createElement("div");
			$(section).append("<h4><span class='bgg'>[b]</span>"+prop+":<span class='bgg'>[/b]</h4>");

			var orderedList = document.createElement("ol");
			for(var item in items[prop]){
				var listItem = document.createElement("li");
				listItem.textContent = items[prop][item];
				orderedList.appendChild(listItem);
			}

			if(orderedList.childNodes.length > 0){
				section.appendChild(orderedList);
			}else{
				var noData = document.createElement("span");
				noData.textContent = "Data not available";
				section.appendChild(noData);
			}
			modalBody.append(section);
			modalBody.append("<br/>");
		}
		//finally append the quick link to BYC-lyzer
		modalBody.append(this.__createURL());
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
	},
	__itemBuilder: function(tableHandles){
		var items = {};
		items["Upcoming Crises"] = this.__rowRetriever(tableHandles.crisis.tabulator("getData"));
		items["Next Destinations"] = this.__rowRetriever(tableHandles.destination.tabulator("getData"));
		items["Quorum Hand"] = this.__rowRetriever(tableHandles.quorum.tabulator("getData"), true);
		items["Remaining Quorum Deck"] = this.__rowRetriever(tableHandles.quorum.tabulator("getData"), false, true);
		items["Remaining Mutiny Deck"] = this.__rowRetriever(tableHandles.mutiny.tabulator("getData"), false, true);
		items["Mission Deck"] = this.__rowRetriever(tableHandles.mission.tabulator("getData"), false, true);
		return items;
	},
	__createURL: function(){
		var url = "[url=" + location.origin + location.pathname + "#/seed/" + this.seed + "]BYC-lyzer[/url]";
		return "<div class='form-group bgg'><hr/><label>BYC-lyzer Quick Access</label><input class='form-control' type='text' name='byc-lyzer-url' readonly value='"+url+"'><p class='help-block'>This link provides a direct access to the game state.</p></div>";
	},
	__dialogHandler: function(event){
		this.dialogHandle.find(".bgg").toggle();
	}
}
