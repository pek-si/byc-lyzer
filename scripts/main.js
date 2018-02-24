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

var _staticData = {
	mdContent: null,
	tableHandles: {}
}

var tables = [
	{id: "crisis", title: "Crises", expansion: "basegame"},
	{id: "destination", title: "Destinations", expansion: "basegame"},
	{id: "quorum", title: "Quorum Cards", expansion: "basegame"},
	{id: "damage", title: "Damaged Locations", expansion: "basegame"},
	{id: "super", title: "Super Crises", expansion: "basegame"},
	{id: "loyalty", title: "Loyalty Cards", expansion: "basegame"},
	{id: "destiny", title: "Destiny", expansion: "basegame",  privateDataTable: true},
	{id: "skill-hand", title: "Skill Cards (Players)", expansion: "basegame", privateDataTable: true},
	{id: "mutiny", title: "Mutiny Cards (Daybreak)", expansion: "daybreak"},
];

function init(){
	if(getUrlParameter(OVERRIDE) === "true"){
		if (window.confirm("Are you sure you want to enable secret information?")) {
			OVERRIDE_SAFETY = true;
		} else {
			OVERRIDE_SAFETY = false;
		}
	}
	
	$("#myModal").on('show.bs.modal', moreInformationModal);
	
	var inputSeed = getSeed();
	if(inputSeed){
		$("#input-seed").val(inputSeed);
	}
	if(SHOW_BURIED_CARDS){	//a switch to hide buried column
		$("#input-seed-initial").parent().show();
	}else{
		$("#input-seed-initial").parent().hide();	
	}
	setupHtml();
	setTimeout(setupTables, 200);
}

function setupHtml(){
	var parentElement = document.getElementById("tables");
	for(var i=0; i < tables.length; ++i){
		var tableData = tables[i];
		var formGroup = document.createElement("div");
		var label = document.createElement("label");
		var table = document.createElement("div");
		formGroup.className = "form-group col-12 pagebreak " + tableData.expansion;
		if(tableData.privateDataTable){
			formGroup.className += " privateDataTable";
		}
		label.textContent = tableData.title;
		table.id = "table-" + tableData.id;
		formGroup.appendChild(label);
		formGroup.appendChild(table);
		parentElement.appendChild(formGroup);
	}
}
	
function setupTables(){
	var crisisOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_CRISIS),
				jQuery.extend(true, {}, COLUMN_GROUP_BURYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var destinationOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_BURYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var quorumOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_PLAYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_BURYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var superCrisisOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_OWNABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_PLAYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var loyaltyOptions = jQuery.extend(true, {}, superCrisisOptions)	//has similar properties with super crisis cards
	var skillOptions = jQuery.extend(true, {}, superCrisisOptions)	//has similar properties with super crisis cards
	var destinyOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var damageOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN)
			],
		}, DEFAULT_OPTIONS);
	var mutinyOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_OWNABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_PLAYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_BURYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	
	//modify some titles & options
	crisisOptions.columns[0].columns[0].title="Turn";
	destinationOptions.columns[0].columns[0].title="Jump";
	superCrisisOptions.height=null;
	loyaltyOptions.height=null;
	loyaltyOptions.initialSort=[ {column:"owner", dir:"asc"} ];
	skillOptions.groupBy = "owner";
	skillOptions.groupHeader = null;
	destinyOptions.height=null;
	damageOptions.columns[0].columns[0].title="Location";
	damageOptions.columns[0].columns[0].width=COLUMN_SIZE.MEDIUM;
	damageOptions.height=null;
	mutinyOptions.height=null;
	
	//tabulate
	_staticData.tableHandles["crisis"] = $("#table-crisis").tabulator(crisisOptions);
	_staticData.tableHandles["destination"] = $("#table-destination").tabulator(destinationOptions);
	_staticData.tableHandles["quorum"] = $("#table-quorum").tabulator(quorumOptions);
	_staticData.tableHandles["super"] = $("#table-super").tabulator(superCrisisOptions);
	_staticData.tableHandles["loyalty"] = $("#table-loyalty").tabulator(loyaltyOptions);
	_staticData.tableHandles["skill-hand"] = $("#table-skill-hand").tabulator(skillOptions);
	_staticData.tableHandles["destiny"] = $("#table-destiny").tabulator(destinyOptions);
	_staticData.tableHandles["damage"] = $("#table-damage").tabulator(damageOptions);
	_staticData.tableHandles["mutiny"] = $("#table-mutiny").tabulator(mutinyOptions);
}

function btnAnalyze(){
	var matched = $("#input-seed").val().match(/(\S{0,20}\-)+/);
	var stored = null;
	if(matched){
		stored = matched[0];
	}else{
		return;
	}
	var unparsed = stored.replace(/-/g,'');
	var seed = window.atob(unparsed);
	var data = JSON.parse(seed);
	
	//success, store and update input element
	setSeed(stored);
	$("#input-seed").val(stored);
	parseData(data);
}

function parseData(data){
	var showPrivateData = false;
	if(data.gameOver){
		$("#game-status").text("Finished");
		showPrivateData = true;
	}else{
		if(OVERRIDE_SAFETY){
			$("#game-status").text("In progress (secret data included)");
			showPrivateData = true;
		}else{
			$("#game-status").text("In progress (public data shown)");
			showPrivateData = false;
		}
	}
	
	//Base game data
	var crisisData = parseTokens({discards: data.crisisDiscards, deck: data.crisisDeck}, TOKEN_TYPE.CRISIS, showPrivateData);
	var destinationData = parseTokens({discards: data.destinationDiscards, deck: data.destinationDeck}, TOKEN_TYPE.DESTINATION, showPrivateData);
	var quorumData = parseTokens({hands: data.quorumHand, discards: data.quorumDiscards, deck: data.quorumDeck}, TOKEN_TYPE.QUORUM, showPrivateData);
	var damageData = parseTokens({discards: data.damagedLocations, deck: data.damage}, TOKEN_TYPE.DAMAGE, showPrivateData);
	var superData = parseTokens({hands: data.superCrisisHands, discards: data.superCrisisDiscards, deck: data.superCrisisDeck, owner: data.players},
			TOKEN_TYPE.SUPER_CRISIS, showPrivateData);
	var loyaltyData = parseTokens({hands: data.loyaltyHands, discards: data.loyaltyDiscards, deck: data.loyaltyDeck, owner: data.players}, 
			TOKEN_TYPE.LOYALTY, showPrivateData);
	var skillHandData = parseTokens({hands: data.skillCardHands, discards: [], deck: [], owner: data.players}, 
			TOKEN_TYPE.SKILL, showPrivateData, {daybreak: data.daybreak, pegasus: data.pegasus});
	var destinyData = parseTokens({deck: data.destiny}, 
			TOKEN_TYPE.SKILL, showPrivateData, {daybreak: data.daybreak, pegasus: data.pegasus});
	
	var mutinyData = null; //parsed just a bit later
	
	//Daybreak specific data
	if(data.daybreak){
		mutinyData = parseTokens({hands: data.mutinies, discards: data.mutinyDiscards, deck: data.mutinyDeck, owner: data.players}, 
				TOKEN_TYPE.MUTINY, showPrivateData);
		$(".daybreak").show();
	}else{
		$(".daybreak").hide();
	}
	
	//hide certain tables
	if(showPrivateData){
		$(".privateDataTable").show();
	}else{
		$(".privateDataTable").hide();
	}
	
	setTableData("crisis", crisisData);
	setTableData("destination", destinationData);
	setTableData("quorum", quorumData);
	setTableData("damage", damageData);
	setTableData("super", superData);
	setTableData("loyalty", loyaltyData);
	setTableData("skill-hand", skillHandData);
	setTableData("destiny", destinyData);
	setTableData("mutiny", mutinyData);
	
	//TODO data.basestarDamage
	//TODO data civilianPile; destroyedCivilians; civilianLetters; spaceCivilians
	//TODO data skillCardDecks; skillCardDiscards;	///	skillCheckCards
	//TODO data.dieRolls
	//TODO ionian 		data traumaPile; sickbayTrauma; brigTrauma; allyDeck & allies?
	//TODO new caprica 	data lockedCivilians; preparedCivilians
	
}

function parseTokens(data, cardType, showPrivateData, extraData){
	var turn = 1;
	var tableData = [];
	var buried;
	var ownerArray = data.owner ? data.owner : [];
	var handArray = data.hands ? data.hands : [];
	var discarded = data.discards ? data.discards : [];
	var inDeck = data.deck;
	
	if(!Boolean(showPrivateData)){	//eliminates disclosure of secret information
		handArray = [];
		inDeck = [];
	}
	
	for(var i=0; i < handArray.length; ++i){	//natural order
		if(handArray[i] instanceof Array){
			var oneHand = handArray[i];
			for(var j=0; j < oneHand.length; ++j){
				var card = parseToken(cardType, oneHand[j], extraData);
				if(card){
					card.setOrdinal(turn++);
					card.setDiscarded(true);
					card.setOwner(ownerArray[i]);
					card.setInPlay(true);
					tableData.push(card.toData());		
				}
			}
		}else{
			var card = parseToken(cardType, handArray[i], extraData);
			if(card){
				card.setOrdinal(turn++);
				card.setDiscarded(true);
				card.setInPlay(true);
				tableData.push(card.toData());
			}
		}
	}
	for(var i=0; i < discarded.length; ++i){	//natural order
		if(discarded[i] instanceof Array){
			var oneHand = discarded[i];
			for(var j=0; j < oneHand.length; ++j){
				var card = parseToken(cardType, oneHand[j], extraData);
				if(card){
					card.setOrdinal(turn++);
					card.setDiscarded(true);
					card.setOwner(ownerArray[i]);
					card.setInPlay(false);
					tableData.push(card.toData());		
				}
			}
		}else{
			var card = parseToken(cardType, discarded[i], extraData);
			if(card){
				card.setOrdinal(turn++);
				card.setDiscarded(true);
				tableData.push(card.toData());		
			}
		}
	}
	for(var i=inDeck.length-1; i >= 0; --i){	//inverse order
		var card = parseToken(cardType, inDeck[i], extraData);
		if(card){
			card.setOrdinal(turn++);
			card.setDiscarded(false);
			tableData.push(card.toData());		
		}
	}
	
	return tableData;
}

function parseToken(type, tokenId, extraData){
	var token = null;
	switch(type){
		case TOKEN_TYPE.CRISIS:
			token = new CrisisCard(tokenId, d.crisisNames[tokenId], d.activation[tokenId], d.jumpIcon[tokenId]);
			break;
		case TOKEN_TYPE.DAMAGE:
			token = new Token(tokenId, tokenId);
			break;
		case TOKEN_TYPE.DESTINATION:
			token = new DestinationCard(tokenId, d.destinationNames[tokenId]);
			break;
		case TOKEN_TYPE.LOYALTY:
			var name = String(d.loyaltyNames[tokenId]).replace(/(?:\[(.+?)\])/g, '');
			token = new MultiHandCard(tokenId, name);
			break;
		case TOKEN_TYPE.MUTINY:
			token = new MutinyCard(tokenId, d.mutinyNames[tokenId]);
			break;
		case TOKEN_TYPE.SKILL:
			token = new MultiHandCard(tokenId, cardName(tokenId, extraData));
			break;
		case TOKEN_TYPE.SUPER_CRISIS:
			token = new MultiHandCard(tokenId, d.crisisNames[tokenId]);
			break;
		case TOKEN_TYPE.QUORUM:
			token = new QuorumCard(tokenId, d.quorumNames[tokenId]);
			break;
		default:
			break;
	}
	return token;
}


/**
 * HELPER FUNCTIONS ET AL.
 **/

function setTableData(tableId, data){
	if(data){
		_staticData.tableHandles[tableId].tabulator("setData", data);
	}
}

/**
 * Get URL Parameters Using Javascript
 * Reference: http://www.netlobo.com/url_query_string_javascript.html
 * @param {String} parameterName
 * @return {String} the requested parameter value, or null if not found.
 */
function getUrlParameter(parameterName){
	var name = parameterName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(window.location.href);
	if(results === null){
		return null;
	}
	return results[1];
}

/**
 * @param {String} data markdown document
 * @return {Element} returns parsed markdown document encapsulated into a DOM element 
 */
var parseMarkdownContent = function(data){
	var mdElement = document.createElement("div");
	
	var parsedContent = marked(data);
	mdElement.innerHTML = parsedContent;
	return mdElement;
};

function moreInformationModal(event) {
	var modalBody = $(this).find('.modal-body');
	
	if(optedIn()){
		$(this).find("#btnPersistent").hide();
	}else{
		$(this).find("#btnPersistent").show();
	}
	
	if(window.location.protocol !== "file:"){
		if(_staticData.mdContent === null){
			$.ajax({
				url: "README.md"
			}).done(function(data){
				_staticData.mdContent = data;
				modalBody.empty();
				modalBody[0].innerHTML = marked(data);
			});
		}
	}
}

function setSeed(seed){
	getStorage().setItem("inputSeed", seed);
}
function getSeed(){
	return getStorage().getItem("inputSeed");
}
function getStorage(){
	if(optedIn()){
		return localStorage;
	}else{
		return sessionStorage;
	}
}
function optedIn(){
	if(localStorage.getItem("cookies")){
		return true;
	}else{
		return false;
	}
}
function optInForLocalStorage(){
	if(optedIn()){
		return; //already opted in
	}else{
		var tempSeed = getSeed();
		clearStorage();
		localStorage.setItem("cookies", true);
		$("#btnPersistent").hide();
		if(tempSeed){
			setSeed(tempSeed);
		}
	}
}
function clearStorage(){
	var storage = getStorage();
	storage.clear();
}