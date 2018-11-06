"use strict";

var d = {
	"allyNames": ["Chief", "Doral", "Kelly", "Crashdown", "Dee", "Billy", "Hot Dog", "Cavil", "Cally", "Six", "D'Anna", "Seelix", "Cottle", "Ellen", "Gaeta", "Baltar", "Cain", "Starbuck", "Helo", "Kendra", "Roslin", "Apollo", "Leoben", "Kat", "Hoshi", "Racetrack", "Elosha", "Romo", "Anders", "Tigh", "Boomer", "Simon", "Zarek", "Tory", "Adama"],
	"characters" : ["Adama", "Apollo", "Baltar", "Boomer", "Chief", "Helo", "Roslin", "Starbuck", "Tigh", "Zarek", "Cain", "Dee", "Ellen", "Kat", "Cavil", "Leoben", "Six", "Anders", "Cally", "Gaeta", "Tory", "Cottle", "Hoshi", "Hot Dog", "Romo", "D'Anna", "Simon", "Doral", "Athena", "Gaius", "Karl", "Lee", "Tom", "Elosha", "Kelly", "Racetrack", "Seelix", "Kendra", "Billy", "Crashdown"],
	"destinationNames": ["Asteroid Field", "Asteroid Field", "Barren Planet", "Barren Planet", "Barren Planet", "Barren Planet", "Cylon Ambush", "Cylon Refinery", "Deep Space", "Deep Space", "Deep Space", "Desolate Moon", "Icy Moon", "Icy Moon", "Ragnar Anchorage", "Remote Planet", "Remote Planet", "Remote Planet", "Tylium Planet", "Tylium Planet", "Tylium Planet", "Tylium Planet", "A Civilian Convoy", "Binary Star", "Gas Cloud", "Mining Asteroid", "Misjump", "Algae Planet", "Cylon Raiders", "Derelict Basestar", "Dying Star", "Gas Giant", "Lion's Head Nebula", "Radioactive Cloud", "Legendary Discovery", "Digging up the Past", "The Search for Home"],
	"crisisNames": ["A Traitor Accused", "Admiral Grilled", "Ambush", "Analyze Enemy Fighter", "Besieged", "Boarding Parties", "Bomb Threat", "Build Cylon Detector", "Colonial Day", "Crash Landing", "Crippled Raider", "Cylon Accusation", "Cylon Screenings", "Cylon Swarm", "Cylon Tracking Device", "Cylon Virus", "Declare Martial Law", "Detector Sabotage", "Elections Loom", "Food Shortage", "Food Shortage", "Food Shortage", "Food Shortage", "Forced Water Mining", "Fulfiller of Prophecy", "Guilt by Collusion", "Hangar Accident", "Heavy Assault", "Informing the Public", "Jammed Assault", "Jump Computer Failure", "Keep Tabs on Visitor", "Legendary Discovery", "Loss of a Friend", "Low Supplies", "Mandatory Testing", "Missing G4 Explosives", "Network Computers", "Prison Labor", "Prisoner Revolt", "Raiding Party", "Requested Resignation", "Rescue Caprica Survivors", "Rescue Mission (B/*)", "Rescue Mission (R/*)", "Rescue the Fleet", "Resistance", "Riots (B/*)", "Riots (L/-)", "Scouting for Fuel", "Scouting for Water", "Security Breach", "Send Survey Team", "Sleep Deprivation", "Surrounded", "Tactical Strike", "Terrorist Bomber", "Terrorist Investigations", "The Olympic Carrier", "Thirty-Three", "Unexpected Reunion", "Unidentified Ship", "Water Sabotaged", "Water Shortage (B/-)", "Water Shortage (B/*)", "Water Shortage (B/*)", "Water Shortage (B/*)", "Water Shortage (R/*)", "Weapon Malfunction", "Witch Hunt", "A Verdict of Guilty", "An Offer of Peace", "Assassination Plot", "Civilian Ship Nuked", "Code Blue", "Defending a Prisoner", "Dogfight", "Food Hoarding in the Fleet", "Medical Breakthrough", "Pressure the Supply Ships", "Reunite the Fleet", "Review Galactica's Log", "Sabotage Investigated", "Scar", "Standoff with Pegasus", "Suspicious Election Results", "The Black Market", "The Guardians", "Training Snafu", "Unsettling Stories", "Airlock Leak", "Ambushed by the Press", "Appoint Head of Security", "Centurion Assault", "Consult the Prisoner", "Controversial Manuscript", "Cylon Genocide", "Detente", "Divisive Behavior", "Familiar Face", "Guilty Conscience", "Haunted by the Past", "Hera Rescued", "Hidden Explosives", "Hidden Identity", "In the Ring", "Interrogation", "Joe's Bar", "Labor Dispute", "Medal of Distinction", "Mysterious Guide", "Mysterious Message", "Power Failure", "Raiders Inbound", "Raptor Malfunction", "Return to Duty", "Review Camera Footage", "Set a Trap", "Strange Beacon", "Temple of the Five", "The Circle", "The Passage", "Threat of a Super Nova", "Tracked by Radiation", "Training a Rookie", "Truth and Reconciliation", "Unexplained Deaths", "Unfair Bias", "Unwelcome Faces", "Widespread Starvation", "A Desperate Pact", "Abandon Galactica", "An Ambitious Operation", "Blindsided", "Consult the Hybrid", "Dangerous Plots", "Dishonest Tactics", "Domestic Dispute", "Earth in Ruins", "Enemy of my Enemy", "Event Horizon", "Galactica Falling Apart", "Give In To Despair", "Hornet's Nest", "Hybrid in Panic", "Incitement to Mutiny", "Insubordinate Crew", "Lockdown", "One Last Cocktail", "Question Procedure", "Quorum in Uproar", "Rallying Support", "Reactor Critical", "Rebuild Trust", "Religious Turmoil", "Reprisal", "Requisition for Demetrius", "Secret Meetings", "Starvation in Dogsville", "Trial by Fire", "Bomb on Colonial One", "Cylon Intruders", "Fleet Mobilization", "Inbound Nukes", "Massive Assault", "'Demand Peace' Manifesto", "Footage Transmitted", "Lured into a Trap", "Psychological Warfare", "The Farm", "Fighting Blind", "Fire All Missiles", "Human Prisoner", "A Cylon Ally", "Arrests at Night", "Attack on the Power Plant", "Betrayed From Within", "Brutal Treatment", "Centurion Ambush", "Contact Informant", "Contact Raptor", "Decode Cylon Maps", "Demanded Surrender", "Dissent Among Cylons", "Establish Sanitation", "Execution List", "Held for Questioning", "Hiding Underground", "Intra-Atmos Entry", "Keeping Hera Hidden", "Labor Union Strike", "Marine Reinforcements", "Meet Liaison Officer", "NCP Graduation", "NCP Recruitment", "Organize the Pilots", "Playing with Emotions", "Prepare for a Fight", "Prepare the Civilians", "Recover Launch Keys", "Rescue Detainees", "Resistance Bombing", "Second Thoughts", "Attack on the Colony", "Cylon Civil War", "Destroy the Hub", "Digging up the Past", "Needs of the People", "Rescue Hera", "The Red Stripes", "The Search for Home"],
	"quorumNames": ["Accept Prophecy", "Arrest Order", "Arrest Order", "Assign Arbitrator", "Assign Mission Specialist", "Assign Vice President", "Authorization of Brutal Force", "Authorization of Brutal Force", "Encourage Mutiny", "Food Rationing", "Food Rationing", "Inspirational Speech", "Inspirational Speech", "Inspirational Speech", "Inspirational Speech", "Presidential Pardon", "Release Cylon Mugshots", "Assign Chief of Staff", "Civilian Self Defense", "Consult the Oracle", "Enact Production Quotas", "Eulogy", "Execute Prisoner", "Probation", "Resources for Galactica", "Unsavory Connections", "Establish Dogsville", "Presidential Order", "Resignation"],
	"mutinyNames": ["Armed Resistance", "Assume Command", "Bait and Switch", "Betrayal of Trust", "Blackmail", "Clipped Wings", "Controversial Speech", "Feed the People", "Impeachment", "Make a Deal", "Necessary Risk", "Panic", "Peaceful Resistance", "Ruined Reputation", "Scavenging for Parts", "Selfish Act", "Send a Message", "Set the Agenda", "The Strong Survive", "Unauthorized Usage", "Violent Protest", "Weapons Armed"],
	"activation": ["R", "R", "B", "R", "R", "H", "R", "H", "B", "H", "R", "R", "R", "B", "R", "L", "B", "H", "H", "R", "R", "R", "R", "R", "B", "R", "H", "R", "R", "R", "L", "R", "L", "H", "R", "H", "R", "R", "R", "H", "R", "B", "R", "B", "R", "R", "H", "B", "L", "R", "R", "L", "R", "B", "B", "R", "H", "H", "H", "R", "R", "L", "R", "B", "B", "B", "B", "R", "L", "H", "B", "L", "B", "R", "H", "H", "R", "R", "H", "R", "R", "R", "H", "R", "L", "R", "R", "B", "B", "R", "H", "R", "L", "L", "B", "R", "R", "L", "H", "R", "H", "H", "R", "R", "L", "H", "B", "R", "B", "B", "R", "R", "H", "H", "R", "R", "B", "R", "R", "L", "R", "R", "H", "B", "L", "B", "R", "R", "R", "R", "R", "B", "R", "R", "H", "B", "R", "R", "R", "R", "R", "R", "H", "R", "H", "H", "R", "H", "B", "B", "L", "R", "L", "R", "R", "R", "B", "R", "R", "R", "", "", "", "", "", "", "", "", "", "", "", "", "", "R/O", "L", "L", "R", "B/O", "R", "R/O", "R", "H/O", "B/O", "L", "R", "H/O", "H/O", "R/O", "H", "R/O", "R/O", "R", "R", "H", "R", "B", "L", "R/O", "R", "B", "H/O", "B/O", "B/O", "", "", "", "", "", "", "", ""],
	"jumpIcon": [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	"loyaltyNames": ["You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "You Are NOT A Cylon", "[col" + "or=red]You are a Cylon - Can Send a Character to Sickbay[/col" + "or]", "[col" + "or=red]You are a Cylon - Can Send a Character to the Brig[/col" + "or]", "[col" + "or=red]You are a Cylon - Can Reduce Morale by 1[/col" + "or]", "[col" + "or=red]You are a Cylon - Can Damage Galactica[/col" + "or]", "You Are A Sympathizer", "You Are NOT A Cylon (P)", "You Are A Sympathetic Cylon", "[col" + "or=red]You are a Cylon - Can Make Players Draw Treachery[/col" + "or]", "You Are NOT A Cylon (X)", "You Are NOT A Cylon (X)", "You Are NOT A Cylon (X)", "You Are NOT A Cylon (X)", "You Are NOT A Cylon (X)", "[col" + "or=green]Personal Goal - Stand and Fight: 10 or More Raiders (else -1 Population)[/col" + "or]", "[col" + "or=green]Personal Goal - Sacrifice: 6 Vipers Damaged or Destroyed (else -1 Fuel)[/col" + "or]", "[col" + "or=green]Personal Goal - Devastation: Admiral has no Remaining Nuke Tokens (else -1 Morale)[/col" + "or]", "[col" + "or=green]Personal Goal - Use Caution: The Fleet has made a 1-Distance Jump (else -1 Population)[/col" + "or]", "[col" + "or=green]Personal Goal - Acquire Power: 2 or More Title Cards at the Same Time (else -1 Food)[/col" + "or]", "[col" + "or=green]Personal Goal - Political Intrigue: The President is in the Brig (else -1 Food)[/col" + "or]", "[col" + "or=green]Personal Goal - Selfish: Discard Skill Cards Equal to 20 Strength (else -1 Fuel)[/col" + "or]", "[col" + "or=green]Personal Goal - Self-Destruction: In the Brig or Sickbay (else -1 Morale)[/col" + "or]", "[col" + "or=darkgreen]Final Five - Whoever Examines this Card is Executed[/col" + "or]", "[col" + "or=darkgreen]Final Five - If this Card is Examined, Cylon Ships are Activated[/col" + "or]", "[col" + "or=darkgreen]Final Five - If this Card is Examined, Galactica is Damaged Twice[/col" + "or]", "[col" + "or=darkgreen]Final Five - If this Card is Examined, You are Executed[/col" + "or]", "[col" + "or=darkgreen]Final Five - Whoever Examines this Card is Sent to the \"Brig\"[/col" + "or]", "[col" + "or=red]You are a Cylon - Can Place a Centurion Token on the Boarding Party Track[/col" + "or]", "[col" + "or=red]You are a Cylon - Can Decrease the Jump Preparation Track by 2[/col" + "or]", "You Are NOT A Cylon (D)", "You Are the Mutineer", "[col" + "or=blue]Human Agenda: Convert the Infidels[/col" + "or]", "[col" + "or=blue]Human Agenda: Join the Colonials[/col" + "or]", "[col" + "or=blue]Human Agenda: Guide them to Destiny[/col" + "or]", "[col" + "or=blue]Human Agenda: Prove their Worth[/col" + "or]", "[col" + "or=brown]Cylon Agenda: The Illusion of Hope[/col" + "or]", "[col" + "or=brown]Cylon Agenda: Salvage Their Equipment[/col" + "or]", "[col" + "or=brown]Cylon Agenda: Show Their True Nature[/col" + "or]", "[col" + "or=brown]Cylon Agenda: Siege Warfare[/col" + "or]", "[col" + "or=brown]Cylon Agenda: Reduce Them To Ruins[/col" + "or]", "[col" + "or=brown]Cylon Agenda: Genocide[/col" + "or]", "[col" + "or=blue]Human Agenda: Grant Mercy[/col" + "or]", "[col" + "or=blue]Human Agenda: Mutual Annihilation[/col" + "or]", "[col" + "or=blue]Human Allegiance: End the Chase[/col" + "or]", "[col" + "or=blue]Human Allegiance: Make an Ally[/col" + "or]", "[col" + "or=blue]Human Allegiance: Remove the Threat[/col" + "or]", "[col" + "or=blue]Human Allegiance: Improve Efficiency[/col" + "or]", "[col" + "or=blue]Human Allegiance: Learn to Cherish[/col" + "or]", "[col" + "or=blue]Human Allegiance: Pressure their Leaders[/col" + "or]", "[col" + "or=blue]Human Allegiance: Keep them Docile[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: A Justified Response[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: No Unnecessary Force[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: Savor Their Demise[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: Fight With Honor[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: Subjects for Study[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: A False Sense of Security[/col" + "or]", "[col" + "or=brown]Cylon Allegiance: Harvest Their Resources[/col" + "or]"]
}

function cardValue(id, z) {
	if(!!!z){
		z = {};
	}

	var mod = id % 35;
	if (Math.floor(id / 35) === 5) {
		if (z.daybreak) {
			if (mod >= 23) {
				return 5;
			} else if (mod >= 20) {
				return 4;
			} else if (mod >= 12) {
				return 3;
			} else {
				return 0;
			}
		} else if (z.pegasus) {
			if (mod >= 20) {
				return 3;
			} else if (mod >= 12) {
				return 2;
			} else {
				return 1;
			}
		}
	}
	switch (mod) {
	case 34:
	case 25:
	case 20:
		return 5;
	case 33:
	case 24:
		return 4;
	case 32:
	case 23:
		return 3;
	case 31:
	case 30:
	case 28:
	case 27:
	case 26:
		return 0;
	case 29:
		return 6;
	case 22:
		return 2;
	case 21:
		return 1;
	default:
		if (mod >= 18) {
			return 4;
		} else if (mod >= 14) {
			return 3;
		} else if (mod >= 8) {
			return 2;
		} else if (mod >= 0) {
			return 1;
		} else {
			return -1;
		}
	}
}

function cardName(id, z) {
	if(!!!z){
		z = {};
	}
	
	var mod = id % 35;
	switch (Math.floor(id / 35)) {
	case 5:
		if (z.daybreak) {
			if (mod >= 23) {
				return "Exploit Weakness";
			} else if (mod >= 20) {
				return "Violent Outbursts";
			} else if (mod >= 16) {
				return "A Better Machine";
			} else if (mod >= 12) {
				return "Personal Vices";
			} else if (mod >= 6) {
				return "Dradis Contact";
			} else {
				return "Bait";
			}
		} else if (z.pegasus) {
			if (mod >= 24) {
				return "Human Weakness";
			} else if (mod >= 20) {
				return "Sabotage";
			} else if (mod >= 17) {
				return "God's Plan";
			} else if (mod >= 12) {
				return "Special Destiny";
			} else if (mod >= 8) {
				return "By Your Command";
			} else {
				return "Broadcast Location";
			}
		}
	case 0:
		if (mod === 34) {
			return "Negotiation";
		} else if (mod >= 32) {
			return "Popular Influence";
		} else if (mod >= 30) {
			return "Force Their Hand";
		} else if (mod === 29) {
			return "Political Prowess";
		} else if (mod >= 26) {
			return "Red Tape";
		} else if (mod >= 23) {
			return "Preventative Policy";
		} else if (mod >= 21) {
			return "Support the People";
		} else if (mod >= 14) {
			return "Investigative Committee";
		} else {
			return "Consolidate Power";
		}
	case 1:
		if (mod === 34) {
			return "Change of Plans";
		} else if (mod >= 32) {
			return "Restore Order";
		} else if (mod >= 30) {
			return "All Hands on Deck";
		} else if (mod === 29) {
			return "State of Emergency";
		} else if (mod >= 26) {
			return "Iron Will";
		} else if (mod >= 23) {
			return "At Any Cost";
		} else if (mod >= 21) {
			return "Major Victory";
		} else if (mod >= 14) {
			return "Declare Emergency";
		} else {
			return "Executive Order";
		}
	case 2:
		if (mod === 34) {
			return "A Second Chance";
		} else if (mod >= 32) {
			return "Unorthodox Plan";
		} else if (mod >= 30) {
			return "Quick Thinking";
		} else if (mod === 29) {
			return "Scout for Fuel";
		} else if (mod >= 26) {
			return "Trust Instincts";
		} else if (mod >= 23) {
			return "Critical Situation";
		} else if (mod >= 21) {
			return "Guts and Initiative";
		} else if (mod >= 14) {
			return "Strategic Planning";
		} else {
			return "Launch Scout";
		}
	case 3:
		if (mod === 34) {
			return "Launch Reserves";
		} else if (mod >= 32) {
			return "Combat Veteran";
		} else if (mod >= 30) {
			return "Dogfight";
		} else if (mod === 29) {
			return "Best of the Best";
		} else if (mod >= 26) {
			return "Protect the Fleet";
		} else if (mod >= 23) {
			return "Run Interference";
		} else if (mod >= 21) {
			return "Full Throttle";
		} else if (mod >= 14) {
			return "Maximum Firepower";
		} else {
			return "Evasive Maneuvers";
		}
	case 4:
		if (mod === 34) {
			return "Test the Limits";
		} else if (mod >= 32) {
			return "Raptor Specialist";
		} else if (mod >= 30) {
			return "Install Upgrades";
		} else if (mod === 29) {
			return "Build Nuke";
		} else if (mod >= 26) {
			return "Establish Network";
		} else if (mod >= 23) {
			return "Calculations";
		} else if (mod >= 21) {
			return "Jury Rigged";
		} else if (mod >= 14) {
			return "Scientific Research";
		} else {
			return "Repair";
		}
	default:
		return "No such card.";
	}
}
