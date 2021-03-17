### QuasarDirectoryStructure

Die Quasar Verzeichnisstrucktur ist ähnlich der von vue, jedoch mit einigen Erweiterungen.

Hier die Erklärung zu der Struktur und was darin zu finden ist.

├── assets         
├── boot            
├── components  
├── css    
├── i18n  
├── layouts
├── pages
├── router
└── store
└── services   --> not generated

#### assets  
Bilder und andere ressourcen.  Ein Verzeichniss höher liegt noch ein ähnlicher Ordner "public"  Beide können .z.b. Bilder enthalten. Der Unterschied ist dass in asset Dinge liegen , die von Webpack behandelt werden. (siehe auch https://v0-17.quasar-framework.org/guide/app-handling-assets.html  und https://cli.vuejs.org/guide/html-and-static-assets.html)

#### boot
Quasar hat ein boot Konzept.   Alles was zum bootZeitpunkt ausgeführt wird liegt bei VUE normalerweise in der App.js.  Hier wurde die App.js so gebaut dass es module aus diesem Verzeichniss läd.

#### components
Hier werden die vue Componenten zu finden sein.
Da wir hier normalerweise einige bekommen werden ist es gut diese in Unterverzeichnisse zu strukturieren :
z.B.
shared --> Wird wieder von anderen Komponenten genutzt
photo    --> Komponenten die die Businesslogik beinhalten


#### css. 
Wie der Name schon sagt. Wir haben aber damit sehr wenig zu tun weil Quasar 160 Komponenten mitbringt und das CSS dazu.

#### [[i18n]]
Internationalisiserung
Am Besten fängt man gleich mit Internationalisiserung an. Die dann später einzubauen ist schwieriger als von Anfang an mehrere Sprachen vorzusehen.
Je Sprache existiert wieder ein Underverzeichnis mit der Länderkennung.
Darin dann eine Datei index.js mit der Übersetzung.

#### layouts
Hier ist das [[mainLayout]].
Diese Datei wird später näher erklärt, da sie Dreh und Angelpunkt für viele andere Begebenheiten ist

#### pages
In pages findet wir, genauso wie in components Komponenten.  Der Unterschied ist rein organisatorischer Natur :

In "components" sind kleine Einheiten aus denen Seiten zusammen gebaut werden.
In "pages" sind Seiten.
Auf Seiten wird aus dem Menü. oder von urls aus verwiesen.  Sie sind also größere Einheiten, die "gebookmarked"  werden können.
Hier später auch mehr.

### [[Router]]
Im Routerverzeichniss sind die Routes.....
Tja was sonst.  Was sind Routes ?   Es sind die Pfade unter denen die Seiten zu erreichen sind.  
Die Routen (Pfade)  haben einen bestimmten Aufbau und eine sehr große Bedeutung, die aus der sog. Restful Welt kommt.  

### Store
im Storeverzeichniss is der Store der Application definiert. der Store , den man bei jeder SPA findet Ist in VUE VUEX.

### services --- ein zusätzliches Verzeichnis

Ich lege noch ein weiteres Verzeichnis an, das services" heisst.  Hier sind alle Hilfsfunktionen und zusätzlichen Dinge, wie z.B.  Zugriffsmodule auf AWS.

Hintergrund dieser Zwischenschicht ist, dass alles was propietär ist, und das ist eben nun mal Amazon, an einer Stelle gekapselt ist.
































