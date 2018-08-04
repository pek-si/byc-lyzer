## BYC-lyzer
### Introduction
BYC-lyzer is a simplistic tool for displaying the game state information on seeds produced by [BYC Mod-free BSG PBF][byc] (By Your Command; Battlestar Galactica; Play-by-Forum) tool. You may use this application to get an overview of the secret card information about the finalized games. It is also useful for viewing the public information about a running game.

Disclaimer: You should own the game before using this tool in order to minimize issues with the creator of the game, FFG (Fantasy Flight Games).

### Usage
Open the web-site ([index.html](index.html)) in your favourite browser. I have tested it with a desktop Chromium, but it should work on other modern browsers just as well. Browsers on mobile devices should work too but prepare to scroll a lot.

Copy and paste the game seed into the text area *BYC Current Seed* and click *Analyze* button. If everything went OK, you should see the Game status, and publicly available information. If the game is over, also the secret information is disclosed. Text area *BYC Initial Seed* is used for tracking buried cards, but that feature is not yet available.

The data contained in the seed is then displayed on the tables. The card information shown is generally divided into two groups: played cards (i.e. those that are discarded or in play) and deck cards (i.e. those still in the deck). You may re-order the data on any column by clicking the column header. Only the name of the card will be shown.

The following cards and tokens are supported by BYC-lyzer:
- Crises
- Destinations
- Quorum Cards
- Damaged Locations
- Super Crises
- Loyalty Cards
- DRADIS (Galactica)
- Civilians
- Destiny (end of game)
- Skill Cards, player hands (end of game)
- Mutiny Cards (Daybreak)
- Mission Deck (Daybreak)

The *Site Information* button will display this information in a dialog window. There are options to *Close* the dialog, *Opt-in for Persistent Data*, and *Clear Data*. The latter two options are related to the data usage of the web-site. The latest analyzed seed is always stored in the browser storage. BYC-lyzer operates completely on the client side (i.e. a browser) so no data is exchanged with other services.

By default the web-site utilizes the browser's session storage, which is wiped out after the browser tab is closed. If you click *Opt-in for Persistent Data* button, the browser's local storage is used instead of the session storage. Data in local storage does not expire on its own. You may click *Clear Data* button to remove data stored locally by this web-site, and to return to the default configuration.

Please be considerate over using this tool in a game **you** are playing in. You should not be able to see the secret information by accident, but you will see the amount of cards in each discard pile as well as the names of each discarded card.

That is about it! Good Hunting!

### License
Copyright 2018 Pekka Sillberg (Apache License, Version 2.0)

See [LICENSE](LICENSE) for more information.

### Acknowledgments
This tool is inspired by the [Battlestar Galactica: The Board Game][ffg] created by Fantasy Flight Games and [BYC Mod-free BSG PBF][byc] tool created by user [kingerc][bgg user] on [Board Game Geek][bgg].

#### Libraries and components utilized by BYC-lyzer:
- [BYC (By Your Command)][byc]; Use for non-commercial purposes granted
- [jQuery][jquery]; jQuery License/MIT
- [jQuery UI][jquery-ui]; jQuery License/MIT
- [Bootstrap][bootstrap]; MIT
- [tabulator][tabulator]; MIT
- [marked][marked]; MIT

[bgg]: https://boardgamegeek.com
[byc]: https://boardgamegeek.com/thread/1848115/your-command-mod-free-bsg-pbf
[bgg user]: https://boardgamegeek.com/user/kingerc
[ffg]: https://www.fantasyflightgames.com/en/products/battlestar-galactica/
[jquery]: https://jquery.org/
[jquery-ui]: https://jqueryui.com/
[bootstrap]: https://getbootstrap.com/
[tabulator]: https://github.com/olifolkerd/tabulator
[marked]: https://github.com/markedjs/marked



### Version History
- 0.9.0: Initial release
- 0.9.1: Added tables for DRADIS and Civilians. Value of a skill card is displayed.
- 0.9.2: Added table for Mission Deck.
- 0.9.3: Fixed an issue with piloted vipers.
- 0.9.4: Added a feature to export 'End of Game Analysis'.
