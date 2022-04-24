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
    {
       
        if (lat>90 || lat<-90)
            { 
                alert ('Parametro latitudine fuori intervallo (+90,-90)');
                return 
            }

        if (lon>180 || lon<-180)
            { 
                alert ('Parametro longitude fuori intervallo (+180,-180)');
                return
            }
          
		var pcfd = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var Param=[0,0];
		var Code=["",""];
		var TheCode, MyCode;
		Param[0]=(lat+90)*3600;
		Param[1]=(lon+180)*3600;
	   
		var t1;
		var a,b;
		

		for ( a = 0; a < 2; a++) 
			{
			for (let b = 0; b < 4; b++) 
				{	
				t1=Math.floor(Param[a]/(Math.pow (34,(3-b))));
				Code[a]=Code[a]+pcfd.substr(t1,1);
				Param[a]=Param[a]- (t1 * Math.pow (34,(3-b)));		
				}
        }
     
   
    
		TheCode="";
		for (a=0;a<5;a++)
			{
			TheCode=TheCode +Code[0].substr(a,1) + Code[1].substr(a,1);
			}
			

		TheCode=TheCode.substr(0,4)+'-'+TheCode.substr(4,4);
		
	    alert(TheCode);
        return TheCode;
   
    }
//========================================================================
    function decodealdo(mycode,what)
    {
        var pcfd = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var mylat;
        var a,p1,t1;
        var sChar;
        mycode=mycode.replace('-','');
        mycode=mycode.toUpperCase();
        var gap=0;
        var s1=0;
            if (what==0) { gap=90;  }
            if (what==1) { gap=180; }
            if (gap==0) 
            { alert ('il secondo parametro atteso è 0 o 1');
                return
            }
        t1=0;
        var Posizione=3;
        for (a=what; a<8; a+=2)
            {
            sChar=mycode.substr(a,1);            
            p1=pcfd.indexOf(sChar);          
            t1=t1 + p1*Math.pow(34,Posizione);
            Posizione--;
            }
           
            mylat=(t1/3600)-gap;
            var TheLat=mylat.toFixed(7);
            alert(TheLat);
    
    }