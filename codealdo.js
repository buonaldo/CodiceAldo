/*
CodeAldo.js
version 2.0 (Aprile 2022)

Codifica "Address Localization for Delivery Operation"
ALDO BUONDONNO (buondonno.aldo@gmail.com)
Riferimenti Web: https://www.dove6.it 

Usa:
CodeAldo(Latitudine, Longitudine) [es. CodeAldo(41.890278, 12.492222)]
per ottenere il CodeAldo di una coppia di coordinate (es.Centro dell'arena del Colosseo EJ4N-QHVK)

Usa:
DeCodeAldo(MyCode,0) per ottenere la decodifica della Latitudine [es. DeCodeAldo('EJ4N-QHVK',0)]
DeCodeAldo(MyCode,1) per ottenere la decodifica della Longitudine[es. DeCodeAldo('EJ4N-QHVK',1)]

Note:
La codifica è univoca in ambito mondiale e raggruppa le posizioni contigue.
Per evitare errori nella trasmissione nel codice non sono presenti i caratteri "0" ed "1" 
*/

   function codealdo(lat,lon)

		
	    alert(TheCode);
        return TheCode;
   
    }
//========================================================================
    function decodealdo(mycode,what)
    {
        
            alert(mycode);
    
    }
