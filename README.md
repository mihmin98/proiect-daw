Aplicatia ar fi folosita pentru a realiza managementul unei librarii.
Utilizatorul trebuie sa isi creeze un cont, air apoi sa dea login.
Dupa aceea, el va putea crea, modifica sau sterge carti, autori, tranzactii, clienti si inchirieri.

Frontend:
- servicii:
    * ApiService(src/app/api): Este folosit pentru a face requesturi catre backend
    * AuthService(src/app/auth): Este folosit pentru autentificarea in aplicatie
    * LoggerService(src/app/logger): Este folosit pentru a afisa mesaje in consola cu timestamp
- directiva:
    * HighlightDirective(src/app/directives/highlight): Adauga un efect de umbra si schimba background-ul unui element. Este folosit in componente precum `books.component.html` sau `authors.component.html`, etc.
- pipe:
    * DatePipe(src/app/pipes): Este folosit pentru a schimba formatul unei date (de ex: in `books.component.html`)
- interceptor:
    * RequestInterceptor(src/app/interceptors): Intercepteaza toate requesturile http si le adauga JWT-ul din localStorage
- guard:
    * AuthGuard(src/app/auth): Nu permite accesul la paginile aplicatiei daca utilizatorul nu este logat
