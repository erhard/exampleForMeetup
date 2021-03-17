Wozu ist bei einer [[SPA]] (SinglePAgeApplication) eigentlich noch ein Router gut ?

Eigentlich gar nicht für die SPA selbst.  Weil der Zustand der Anwendung in der Anwendung selbst gehalten wird Wo ? etweder in einem Store wie VUEX oder in Variablen, die den Komponenten mitgegeben werden Dies ist bei anderen , normalen Webanwendungen nicht der Fall.

Hierzu muss man verstehen was singe Page Anwendungen sind und was sie von anderen Anwendungen unterscheidet.  ---> [[SPA]]

In dem Router wird definiert mit welcher URL welche Komponeten gerufen wird.  Gibt man die URL direkt ein erfolgt ein Pagerefresh und die SinglePAgeApplikation landet da wohin die Url sie schickt. Das führt dazu dass man sich darüber gedanken machen muss woher die Daten in genau diesem Zustand kommen.  Diese können nun aus unterschiedlichsten Quellen kommen : Aus der Url selbst aus, ausgelesen vom Router und der Komponente mitgegeben (Als Property).  In dem mountHook lesend aus einem lokalem Speicher. Oder ebenfalls im mounted hook vom Server selbst.




LifezykleHooks :
https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle








Ein Beispiel für das setzten und beinflussen der Routes ist die Sprache der Anwendung.

Die Routes verweisen auf Komponenten in dem Verzeichnis "Pages".  Eine Komponente in Pages umfasst einen fachlichen Sachverhalt z. B. Login oder Upload.

Einer Route können die Parameter aus der URL einer Komponente mitgegeben werden.









