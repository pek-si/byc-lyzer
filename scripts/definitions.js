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

/** 
 * DATA TYPES 
 **/
// Buryable "interface"
var Buryable = function(){
	this.buried = false;
}
Buryable.prototype.setBuried = function(buried){
	this.buried = buried;
}

// Discardable "interface"
var Discardable = function(){
	this.discarded = false;
}
Discardable.prototype.setDiscarded = function(discarded){
	this.discarded = discarded;
}

// Playable "interface"
var Playable = function(){
	this.inPlay = false;
}
Playable.prototype.setInPlay = function(inPlay){
	this.inPlay = inPlay;
}

// Ownable "interface" (e.g. player, sector, area)
var Ownable = function(){
	this.owner = false;
}
Ownable.prototype.setOwner = function(owner){
	this.owner = owner;
}

// Token class
var Token = function(identifier, name){
	Discardable.call(this);
	this.id = identifier;
	this.name = name;
	this.ordinal = 0;
}
Token.prototype = Object.create(Discardable.prototype);
Token.prototype.constructor = Token;
Token.prototype.setOrdinal = function(ordinal){
	this.ordinal = ordinal;
};
Token.prototype.toData = function(){
	var object = {};
	for(var propertyName in this) {
		if(this.hasOwnProperty(propertyName)){
			object[propertyName] = this[propertyName];
		}
	}
	return object;
}

// Card class
var Card = function(identifier, name){
	Token.call(this, identifier, name);
}
Card.prototype = Object.create(Token.prototype);
Card.prototype.constructor = Card;

//SingleHand Card class
var SingleHandCard = function(identifier, name){
	Card.call(this, identifier, name);
	Playable.call(this);
}
SingleHandCard.prototype = Object.create(Card.prototype);
Object.assign(SingleHandCard.prototype, Playable.prototype);
SingleHandCard.prototype.constructor = SingleHandCard;

//MultiHand Card class, e.g. Super Crisis, Skill Card...
var MultiHandCard = function(identifier, name){
	Card.call(this, identifier, name);
	Playable.call(this);
	Ownable.call(this);
}
MultiHandCard.prototype = Object.create(Card.prototype);
Object.assign(MultiHandCard.prototype, Playable.prototype);
Object.assign(MultiHandCard.prototype, Ownable.prototype);
MultiHandCard.prototype.constructor = MultiHandCard;

// Ship class
var Ship = function(identifier, name){
	Token.call(this, identifier, name);
	Playable.call(this);
	Ownable.call(this);
}
Ship.prototype = Object.create(Token.prototype);
Object.assign(Ship.prototype, Playable.prototype);
Object.assign(Ship.prototype, Ownable.prototype);
Ship.prototype.constructor = Ship;


//Crisis Card class
var CrisisCard = function(identifier, name, activation, prep){
	Card.call(this, identifier, name);
	Buryable.call(this);
	this.activation = activation;
	this.prep = prep;
}
CrisisCard.prototype = Object.create(Card.prototype);
Object.assign(CrisisCard.prototype, Buryable.prototype);
CrisisCard.prototype.constructor = CrisisCard;

//Destination Card class
var DestinationCard = function(identifier, name){
	Card.call(this, identifier, name);
	Buryable.call(this);
}
DestinationCard.prototype = Object.create(Card.prototype);
Object.assign(DestinationCard.prototype, Buryable.prototype);
DestinationCard.prototype.constructor = DestinationCard;

// Quorum Card class
var QuorumCard = function(identifier, name){
	SingleHandCard.call(this, identifier, name);
	Buryable.call(this);
}
QuorumCard.prototype = Object.create(SingleHandCard.prototype);
Object.assign(QuorumCard.prototype, Buryable.prototype);
QuorumCard.prototype.constructor = QuorumCard;

// Skill Card class
var SkillCard = function(identifier, name, value){
	MultiHandCard.call(this, identifier, name);
	Buryable.call(this);
	this.value = value;
}
SkillCard.prototype = Object.create(MultiHandCard.prototype);
Object.assign(SkillCard.prototype, Buryable.prototype);
SkillCard.prototype.constructor = SkillCard;

// Mutiny Card class
var MutinyCard = function(identifier, name){
	MultiHandCard.call(this, identifier, name);
	Buryable.call(this);
}
MutinyCard.prototype = Object.create(MultiHandCard.prototype);
Object.assign(MutinyCard.prototype, Buryable.prototype);
MutinyCard.prototype.constructor = MutinyCard;

// Mission Card class
var MissionCard = function(identifier, name){
	SingleHandCard.call(this, identifier, name);
	Buryable.call(this);
}
MissionCard.prototype = Object.create(SingleHandCard.prototype);
Object.assign(MissionCard.prototype, Buryable.prototype);
MissionCard.prototype.constructor = MissionCard;

/**
 * DEFINITIONS
 **/
var COLUMN_SIZE = {
	NARROW: 85,
	MEDIUM: 105,
	WIDE: 125
}
var NO_DATA = "Data unavailable";
var OVERRIDE = "override";
var OVERRIDE_SAFETY = false;	//be careful what you wish for!
var SHOW_BURIED_CARDS = false;

var TOKEN_TYPE = {
	CIVILIAN: "civilian",
	CRISIS: "crisis",
	DAMAGE: "damage",
	DESTINATION: "destination",
	LOYALTY: "loyalty",
	MISSION: "mission",
	MUTINY: "mutiny",
	SHIP: "ship",
	SKILL: "skill",
	SUPER_CRISIS: "super",
	QUORUM: "quorum"
};


//Tabulator related options
var DEFAULT_OPTIONS = {
	autoResize: false,
	columnVertAlign: "bottom",
	groupBy:["discarded"],
	groupHeader: headerFormatter,
	height: "500px",
	initialSort:[
		{column:"ordinal", dir:"asc"},
	],
	layout:"fitColumns",
	persistenceMode: true,
	placeholder: NO_DATA,
	resizableColumns: false,
	resizableRows: false,
	selectableRollingSelection: false,
	selectablePersistence: false,
	tooltips:true,
};
var COLUMN_GROUP_TOKEN = {
	title:"Basic Information",
	columns:[
		{title:"Card", field:"ordinal", align:"right", sorter:"number", width: COLUMN_SIZE.NARROW},
		{title:"Name", field:"name", minWidth: COLUMN_SIZE.WIDE}
	]
};
var COLUMN_GROUP_CRISIS = {
	title:"Crisis Information",
	columns:[
		{title:"Cylon Activation", field:"activation", width: COLUMN_SIZE.MEDIUM},
		{title:"Jump", field:"prep", align:"center", sorter:"boolean", formatter: "star", formatterParams:{stars:1}, width: COLUMN_SIZE.NARROW},
	]
};
var COLUMN_GROUP_PLAYABLE = {
	title:"In Hand", field:"inPlay", align:"center", sorter:"boolean", formatter: "tickCross", width: COLUMN_SIZE.NARROW
};
var COLUMN_GROUP_OWNABLE = {
	title:"Player", field:"owner", width: COLUMN_SIZE.MEDIUM
};
var COLUMN_GROUP_SKILL = {
	title:"Value", field:"value", align:"right", sorter:"number", width: COLUMN_SIZE.NARROW
};
var COLUMN_GROUP_BURYABLE = {
	title:"Buried", field:"buried", align:"center", sorter:"boolean", formatter: "tickCross", width: COLUMN_SIZE.NARROW, visible: SHOW_BURIED_CARDS
};
var COLUMN_GROUP_TOKEN_DETAILS = {
	title:"BYC Details",
	columns:[
		{title:"Played", field:"discarded", align:"center", sorter:"boolean", formatter: "tickCross", width: COLUMN_SIZE.NARROW, visible: false},
		{title:"ID", field:"id", align:"right", sorter:"number", width: COLUMN_SIZE.NARROW}
	]
};

function headerFormatter(value, count, data, group){
	return (value ? "Cards in Play/Tokens in Play" : "Cards in Deck/Tokens in Reserve")
		+ "<span style='color:#d00; margin-left:10px;'>("
		+ count + " item" + plural(count) + ")</span>";
}

function skillHeaderFormatter(value, count, data, group){
	var strength = 0;
	for(var i=0; i<data.length; ++i){
		strength += data[i].value;
	}
	return value
		+ " <span style='color:#d00; margin-left:10px;'>(" + strength + " point" + plural(strength)
		+ ", " + count + " item" + plural(count) + ")</span>";
}

function plural(count){
	return count > 1 ? "s" : "";
}
