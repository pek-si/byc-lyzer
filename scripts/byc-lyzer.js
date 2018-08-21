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

var BycAnalyzer = function(){
	this.includePrivateData = false;
}

BycAnalyzer.prototype.getIncludePrivateData = function(){
	return this.includePrivateData;
}

BycAnalyzer.prototype.setIncludePrivateData = function(includePrivateData){
	this.includePrivateData = Boolean(includePrivateData);
}

BycAnalyzer.prototype.parseTokens = function(data, cardType, extraData){
	var ordinal = 1;
	var tableData = [];
	var buried;
	var ownerArray = data.owner ? data.owner : [];
	var handArray = data.hands ? data.hands : [];
	var discarded = data.discards ? data.discards : [];
	var inDeck = data.deck ? data.deck : [];
	
	if(!this.getIncludePrivateData()){	//eliminates disclosure of secret information
		if(cardType !== TOKEN_TYPE.MISSION){	//except in this case (active missions)
			handArray = [];
		}
		inDeck = [];
	}
	
	for(var i=0; i < handArray.length; ++i){	//natural order
		if(handArray[i] instanceof Array){
			var oneHand = handArray[i];
			for(var j=0; j < oneHand.length; ++j){
				var card = this.parseToken(cardType, oneHand[j], extraData);
				if(card){
					card.setOrdinal(ordinal++);
					card.setDiscarded(true);
					card.setOwner(ownerArray[i]);
					card.setInPlay(true);
					tableData.push(card.toData());		
				}
			}
		}else{
			var card = this.parseToken(cardType, handArray[i], extraData);
			if(card){
				card.setOrdinal(ordinal++);
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
				var card = this.parseToken(cardType, oneHand[j], extraData);
				if(card){
					card.setOrdinal(ordinal++);
					card.setDiscarded(true);
					card.setOwner(ownerArray[i]);
					card.setInPlay(false);
					tableData.push(card.toData());		
				}
			}
		}else{
			var card = this.parseToken(cardType, discarded[i], extraData);
			if(card){
				card.setOrdinal(ordinal++);
				card.setDiscarded(true);
				tableData.push(card.toData());		
			}
		}
	}
	for(var i=inDeck.length-1; i >= 0; --i){	//inverse order
		var card = this.parseToken(cardType, inDeck[i], extraData);
		if(card){
			card.setOrdinal(ordinal++);
			card.setDiscarded(false);
			tableData.push(card.toData());		
		}
	}
	
	return tableData;
}

BycAnalyzer.prototype.parseToken = function(type, tokenId, extraData){
	var token = null;
	switch(type){
		case TOKEN_TYPE.CIVILIAN:
			token = new Ship(tokenId, tokenId);
			break;
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
		case TOKEN_TYPE.MISSION:
			token = new MissionCard(tokenId, d.crisisNames[tokenId]);
			break;
		case TOKEN_TYPE.MUTINY:
			token = new MutinyCard(tokenId, d.mutinyNames[tokenId]);
			break;
		case TOKEN_TYPE.SHIP:
			token = new Ship(tokenId, this.shipName(tokenId));
			break;
		case TOKEN_TYPE.SKILL:
			token = new SkillCard(tokenId, cardName(tokenId, extraData), cardValue(tokenId, extraData));
			break;
		case TOKEN_TYPE.SUPER_CRISIS:
			token = new MultiHandCard(tokenId, d.crisisNames[tokenId]);
			break;
		case TOKEN_TYPE.TRAUMA:
			token = new Trauma(tokenId, traumaName(tokenId));
			break;
		case TOKEN_TYPE.QUORUM:
			token = new QuorumCard(tokenId, d.quorumNames[tokenId]);
			break;
		default:
			break;
	}
	return token;
}

BycAnalyzer.prototype.seedMatcher = function(string){
	if(string){
		var matched = string.match(/(\S{0,20}\-)+/);
		if(matched && matched[0]){
			return matched[0];
		}else{
			return null;
		}
	}else{
		return null;
	}
}

/**
 * Performs a few rudimentary checks to determine whether the given seeds are from the same game.
 * @param {Object} seed the initial seed. Note: flag 'gameOver' must be true.
 * @param {Object} anotherSeed the seed to be compared. Note: flag 'gameSetup' must be false.
 * @return {Boolean} returns true if the games are a match. Otherwise return false.
 */
BycAnalyzer.prototype.compareSeeds = function(seed, anotherSeed){
	if(seed && anotherSeed && seed.gameOver && !anotherSeed.gameSetup){
		if(seed.destination !== anotherSeed.destination){
			return false;
		}
		if(seed.pegasus !== anotherSeed.pegasus){
			return false;
		}
		if(seed.exodus !== anotherSeed.exodus){
			return false;
		}
		if(seed.daybreak !== anotherSeed.daybreak){
			return false;
		}
		if(seed.pegasusIC !== anotherSeed.pegasusIC){
			return false;
		}
		//check whether the last 50 die rolls are identical
		for(var roll = 0; roll < 50; ++roll){
			if(seed.dieRolls[roll] !== anotherSeed.dieRolls[roll]){
				return false;
			}
		}
		//if we got up here, it is quite probable that the seeds are matching
		return true;
	}else{
		return false;
	}
}

BycAnalyzer.prototype.shipName = function(id){
	var shipId = id.match(/[a-z]{1,2}\d{0,1}/i)[0];
	var shipName;
	var characterName = "";
	if(id.indexOf("#") == 4){	//special case for piloted vipers
		characterName = " (" + id.substring(5) + ")";
	}
	switch(shipId){
		case "V2": shipName = "Viper Mark II" + characterName; break;
		case "V7": shipName = "Viper Mark VII" + characterName; break;
		case "AR": shipName = "Assault Raptor" + characterName; break;
		case "C": shipName = "Civilian " + id.substring(2); break;
		case "R": shipName = "Raider"; break;
		case "H": shipName = "Heavy Raider"; break;
		case "B": shipName = "Basestar"; break;
		case "O": shipName = "Occupation Force"; break;
		case "L": shipName = "Launch Raiders"; break;
		default: shipName = "Unknown"; break;
	}
	return shipName;
}

BycAnalyzer.prototype.combineCivilianData = function(data){
	var civilians = { hands: [], discards: [], deck: [] };
	if(!data.spaceCivilians){
		return civilians;
	}else{
		civilians.discards = data.destroyedCivilians;
	}

	for(var i in data.spaceCivilians){
		var civs = data.spaceCivilians[i];
		for(var j in civs){
			var civ = civs[j];
			var civId;
			if(this.getIncludePrivateData()){
				civId = civ[1] + " (Civilian " + civ[0] + "; Sector "+(Number(i)+1)+")"; //Sector count begins from 1
			}else{
				civId = "Civilian " + civ[0];
			}
			civilians.hands.push(civId);
		}
	}
	var letters = jQuery.extend(true, [], data.civilianLetters);
	for(var i=data.civilianPile.length-1; i >= 0; --i){	//inverse order
		var civ = data.civilianPile[i];
		var civId;
		if(this.getIncludePrivateData()){
			civId = civ + " (Civilian " + letters.shift() + ")";
		}else{
			civId = "Civilian " + letters.shift();
		}
		civilians.deck.unshift(civId);
	}
	return civilians;
}

BycAnalyzer.prototype.combineDradisData = function(data){
	var ships = { discards: [], owner: [] };

	for(var i=1; i<7; ++i){
		var sector = [];
		var charactersInSpace = [];	//check character locations in this sector
		for(var character in data.playerLocations){
			if(data.playerLocations[character] == "Sector "+i){	//a character is in space (hopefully in a space ship.)
				charactersInSpace.push(data.players[character]);	//store the name of that player
			}
		}
		dradisHelper(i, sector, "B_", data.basestars);
		dradisHelper(i, sector, "H_", data.heavies);
		dradisHelper(i, sector, "R_", data.raiders);
		dradisHelper(i, sector, "AR_", data.assaultRaptors, charactersInSpace);
		dradisHelper(i, sector, "V7_", data.vipersVII, charactersInSpace);
		dradisHelper(i, sector, "V2_", data.vipersII, charactersInSpace);
		if(data.spaceCivilians){
			dradisHelper(i, sector, "C_", data.spaceCivilians[i-1]);	//civilian ship array begins from 0
		}
		ships.discards.push(sector);
		ships.owner.push("Sector "+i);
	}
	return ships;
}

BycAnalyzer.prototype.combineTraumaData = function(data){
	var traumaTokens = { hands: [], owner: [] };

	if(data.benevolent && data.antagonistic && !data.lateCrossroads){
		for(var player in data.players){
			var playerTrauma = [];
			for(var i=0; i < data.benevolent[player]; ++i){
					playerTrauma.push(1);
			}
			for(var i=0; i < data.antagonistic[player]; ++i){
					playerTrauma.push(0);
			}
			if(playerTrauma.length > 0){
				traumaTokens.hands.push(playerTrauma);
				traumaTokens.owner.push(data.players[player]);
			}
		}
	}

	var traumas = [];       //reordering the trauma pile for processing
	for(var trauma in data.traumaPile){
		traumas.unshift(data.traumaPile[trauma]);
	}
	traumaTokens.hands.push(traumas);
	traumaTokens.owner.push("Trauma Tokens");

	traumaTokens.hands.push([data.sickbayTrauma]);
	traumaTokens.owner.push("Sickbay");

	traumaTokens.hands.push([data.brigTrauma]);
	traumaTokens.owner.push("Brig");

	for(var ally in data.allies){
		var allyArray = data.allies[ally];
		traumaTokens.hands.push([allyArray[1]]);
		traumaTokens.owner.push(d.allyNames[allyArray[0]]);
	}

	return traumaTokens;
}


function dradisHelper(sectorId, sectorArray, shipPrefix, shipData, charactersInSpaceArray){
	for(var shipIndex in shipData){
		if(shipPrefix === "C_"){	//special case for handling the civilians
			var civId = "C_" + shipData[shipIndex][0];
			sectorArray.push(civId);
		}else if(shipData[shipIndex] == sectorId){
			sectorArray.push(shipPrefix+shipIndex);
		}else if(charactersInSpaceArray){		//another special case for players in space
			for(var character in charactersInSpaceArray){
				if(shipData[shipIndex] == charactersInSpaceArray[character]){
					sectorArray.push(shipPrefix+shipIndex+"#"+shipData[shipIndex]);
				}
			}
		}
	}
}

function traumaName(id){
	var traumaName;
	switch(id){
		case -1: traumaName = "DISASTER"; break;
		case 0: traumaName = "Antagonistic"; break;
		case 1: traumaName = "Benevolent"; break;
		default: traumaName = "Unknown"; break;
	}
	return traumaName;
}

function base64seedToJson(base64seed){
	if(base64seed === null){
		return null;
	}
	var unparsed = base64seed.replace(/-/g,'');
	if(unparsed.length % 4 == 1){
		return null;
	}
	var seed = window.atob(unparsed);
	var data = null
	try{
		data = JSON.parse(seed);
	}catch(e){
		//failed to parse the seed...
		console.log("Could not parse the seed");
	}
	return data;
}
