## SinglePageApplication

So war die Welt vorher :

Der Browser sendet einen Request and einen Server.  Durch die Eingabe einer URL z.B. www.google.de.   DIese URL lösten einen sog. "GET" Request aus. Konvention ist dass alle Request wenn einfach nur eine URL eingegeben wird get Reqests sind.
Es gibt im wesentlichen 4 dieser Wörter :
"GET" 
"POST"
"PUT"
"DELETE"
(Es gibt inzwischen mehr aber das sind die Wichtigsten).
GET zeigt etwas, POST legt etwas an PUT ändert etwas und DELETE löscht etwas.
Auf diesen 4 Wörter basiert das ganze Internet.  Damit kann man schon eine ganze Menge machen, allerdings hat man immer eine sog. Serverroudtrip.
Man muss neben dem Verb aber dem Server auch noch mitteilen was geändert gelöscht oder gesehen werden soll. Ein Server merkt sich das in der Regel nicht. Würde er es sich merken muss man wieder genau auf diesen Server zurück (Was es auch gibt aber ziemlich umständlich ist) .  Das Internet ist erstmal zustandslos Nun wird alles mögliche unternommen um sich den Zustand zu merken in Cookies die zum Server geschickt werden und wieder zurückgeschickt werden, in der URL selbst als Zahl oder der Browser merkt es sich einfach selbst.  
Will man aber etwas bookmarken kommt man um die URL. und den Zustand in der URL nicht drum rum.  z.B. möchte ich mir bei einem Onlineshop einen bestimmten Artikel bookmarken. Daher ist es wichtig sich über die Gestaltung der URL und wann könnte der User was bookmarken, Gedanken zu machen.
Im Router wrd dann genau das ausgewertet und die Anwendung reagiert entsprechend indem die router-view mit dem gefüllt wird was der Router bestimmt.

Single Page Applicationen (SPA) ticken da anders.  Es gibt nur einen GET Request der eine "Seite"  In dieser Seite sind nur Javascriptdaten eingebettet die eine komplette Anwendung darstellen - geholt werden nur noch die Daten und nicht mehr komplett neue Seiten, die am Server in html gerenderd werden (Es gibt da einen Zwitter : Das sind die Ruby On Rails TurboLinks -  die haben einen Rahmen und wechseln immer das body Element aus das aber am Server gerendered wird )
SPAs eröffnet bezüglich Usability viele neue Möglichkeiten.
