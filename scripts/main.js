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
	tableHandles: {},
	tableOptions: {}
}

var bycAnalyzer = new BycAnalyzer();

var tables = [
	{id: "crisis", title: "Crises", expansion: "basegame"},
	{id: "destination", title: "Destinations", expansion: "basegame"},
	{id: "quorum", title: "Quorum Cards", expansion: "basegame"},
	{id: "damage", title: "Damaged Locations", expansion: "basegame"},
	{id: "super", title: "Super Crises", expansion: "basegame"},
	{id: "loyalty", title: "Loyalty Cards", expansion: "basegame"},
	{id: "dradis", title: "DRADIS (Galactica)", expansion: "basegame"},
	{id: "civilian", title: "Civilians", expansion: "basegame"},
	{id: "destiny", title: "Destiny", expansion: "basegame",  privateDataTable: true},
	{id: "skill-hand", title: "Skill Cards (Players)", expansion: "basegame", privateDataTable: true},
	{id: "mutiny", title: "Mutiny Cards (Daybreak)", expansion: "daybreak"},
	{id: "mission", title: "Mission Deck (Daybreak)", expansion: "daybreak earth"},
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
	setupTables();
}

function setupHtml(){
	var parentElement = document.getElementById("tables");
	for(var i in tables){
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
		table.textContent = "Table placeholder.";
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
	var dradisOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_OWNABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var civilianOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_PLAYABLE)
			],
		}, DEFAULT_OPTIONS);
	var skillOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_SKILL),
				jQuery.extend(true, {}, COLUMN_GROUP_OWNABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_PLAYABLE),
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN_DETAILS)
			],
		}, DEFAULT_OPTIONS);
	var destinyOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
				jQuery.extend(true, {}, COLUMN_GROUP_SKILL),
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
	var missionOptions = jQuery.extend(true, {
			columns:[
				jQuery.extend(true, {}, COLUMN_GROUP_TOKEN),
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
	dradisOptions.groupBy = "owner";
	dradisOptions.initialSort=[ {column:"owner", dir:"asc"} ];
	dradisOptions.height=null;
	dradisOptions.columns[0].columns[0].title="Ship";
	dradisOptions.columns[1].title="Sector";
	dradisOptions.groupHeader = null;
	civilianOptions.columns[0].columns[0].title="Civilian";
	civilianOptions.columns[1].title="In Space";
	civilianOptions.height = null;
	skillOptions.groupBy = "owner";
	skillOptions.groupHeader = skillHeaderFormatter;
	destinyOptions.height=null;
	damageOptions.columns[0].columns[0].title="Location";
	damageOptions.columns[0].columns[0].width=COLUMN_SIZE.MEDIUM;
	damageOptions.height=null;
	mutinyOptions.height=null;
	missionOptions.height=null;
	missionOptions.columns[1].title="Active";
	
	//store table options
	setTableOptions("crisis", crisisOptions);
	setTableOptions("destination", destinationOptions);
	setTableOptions("quorum", quorumOptions);
	setTableOptions("super", superCrisisOptions);
	setTableOptions("loyalty", loyaltyOptions);
	setTableOptions("dradis", dradisOptions);
	setTableOptions("civilian", civilianOptions);
	setTableOptions("skill-hand", skillOptions);
	setTableOptions("destiny", destinyOptions);
	setTableOptions("damage", damageOptions);
	setTableOptions("mutiny", mutinyOptions);
	setTableOptions("mission", missionOptions);
}

function btnAnalyze(){
	var matched = $("#input-seed").val().match(/(\S{0,20}\-)+/);
	var stored = null;
	$("#btnExport").hide();
	if(matched){
		stored = matched[0];
	}else{
		setGameStatusText("Did not find a suitable seed");
		return false;
	}

	var unparsed = stored.replace(/-/g,'');
	var seed = window.atob(unparsed);
	var data = null
	try{
		data = JSON.parse(seed);
	}catch(e){
		setGameStatusText("Could not parse the seed");
		return false;
	}

	//check if the game is still being in the setup phase
	if(data.gameSetup){
		setGameStatusText("Game is in the setup phase");
		return false;
	}

	//success, store and update input element
	setSeed(stored);
	$("#input-seed").val(stored);
	parseData(data);
	return true;
}

function btnExport(){
	if(exporter){
		exporter.init($("body"), _staticData.tableHandles);
	}
}

function parseData(data){
	var showPrivateData = false;
	var turnInfo = "Turn " + data.round + "." + (data.turn+1) + ": ";
	if(data.gameOver){
		setGameStatusText(turnInfo + "Finished");
		showPrivateData = true;
		$("#btnExport").show();
	}else{
		if(OVERRIDE_SAFETY){
			setGameStatusText(turnInfo + "In progress (secret data included)");
			showPrivateData = true;
		}else{
			setGameStatusText(turnInfo + "In progress (public data shown)");
			showPrivateData = false;
		}
	}
	bycAnalyzer.setIncludePrivateData(showPrivateData);
	
	//Base game data
	var crisisData = bycAnalyzer.parseTokens({discards: data.crisisDiscards, deck: data.crisisDeck}, TOKEN_TYPE.CRISIS);
	var destinationData = bycAnalyzer.parseTokens({discards: data.destinationDiscards, deck: data.destinationDeck}, TOKEN_TYPE.DESTINATION);
	var quorumData = bycAnalyzer.parseTokens({hands: data.quorumHand, discards: data.quorumDiscards, deck: data.quorumDeck}, TOKEN_TYPE.QUORUM);
	var damageData = bycAnalyzer.parseTokens({discards: data.damagedLocations, deck: data.damage}, TOKEN_TYPE.DAMAGE);
	var superData = bycAnalyzer.parseTokens({hands: data.superCrisisHands, discards: data.superCrisisDiscards, deck: data.superCrisisDeck, owner: data.players}, TOKEN_TYPE.SUPER_CRISIS);
	var loyaltyData = bycAnalyzer.parseTokens({hands: data.loyaltyHands, discards: data.loyaltyDiscards, deck: data.loyaltyDeck, owner: data.players}, TOKEN_TYPE.LOYALTY);
	var dradisData = bycAnalyzer.parseTokens(bycAnalyzer.combineDradisData(data), TOKEN_TYPE.SHIP);
	var civilianData = bycAnalyzer.parseTokens(bycAnalyzer.combineCivilianData(data), TOKEN_TYPE.CIVILIAN);
	var skillHandData = bycAnalyzer.parseTokens({hands: data.skillCardHands, discards: [], deck: [], owner: data.players}, TOKEN_TYPE.SKILL, {daybreak: data.daybreak, pegasus: data.pegasus});
	var destinyData = bycAnalyzer.parseTokens({deck: data.destiny}, TOKEN_TYPE.SKILL, {daybreak: data.daybreak, pegasus: data.pegasus});
	
	var mutinyData = null; //parsed just a bit later
	var missionData = null; //parsed just a bit later
	
	//Daybreak specific data
	if(data.daybreak){
		mutinyData = bycAnalyzer.parseTokens({hands: data.mutinies, discards: data.mutinyDiscards, deck: data.mutinyDeck, owner: data.players},	TOKEN_TYPE.MUTINY);
		$(".daybreak").show();
	}else{
		$(".daybreak").hide();
	}
	if(data.destination.indexOf("Earth") >= 0){	//destination is Earth OR Ionian Earth
		var activeMission = data.activeMission ? [data.activeMission] : null;
		missionData = bycAnalyzer.parseTokens({hands: activeMission, discards: data.missionDiscards, deck: data.missionDeck}, TOKEN_TYPE.MISSION);
		$(".daybreak.earth").show();
	}else{
		$(".daybreak.earth").hide();
	}
	
	//hide/show certain tables
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
	setTableData("dradis", dradisData);
	setTableData("civilian", civilianData);
	setTableData("skill-hand", skillHandData);
	setTableData("destiny", destinyData);
	setTableData("mutiny", mutinyData);
	setTableData("mission", missionData);
	
	//TODO data.basestarDamage; data.pegasusDamage
	//TODO data skillCardDecks; skillCardDiscards;	///	skillCheckCards
	//TODO ionian 		data traumaPile; sickbayTrauma; brigTrauma; allyDeck & allies?
	//TODO new caprica 	data lockedCivilians; preparedCivilians
}

/**
 * HELPER FUNCTIONS ET AL.
 **/

function tabulate(tableId, options){
	if(tableId && options && _staticData.tableHandles[tableId] === undefined){
		_staticData.tableHandles[tableId] = $("#table-"+tableId).tabulator(options);
	}
}

function setTableData(tableId, data){
	if(_staticData.tableHandles[tableId] === undefined){
		tabulate(tableId, getTableOptions(tableId));	//prepare table
	}
	if(data){
		_staticData.tableHandles[tableId].tabulator("setData", data);
	}else{
		_staticData.tableHandles[tableId].tabulator("clearData");
	}
}

function setTableOptions(tableId, options){
	if(tableId && options){
		_staticData.tableOptions[tableId] = options;
	}
}

function getTableOptions(tableId){
	return _staticData.tableOptions[tableId];
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

function setGameStatusText(message){
	$("#game-status").text(message);
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
