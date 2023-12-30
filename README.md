CollinsPDF.js is a 100% Client Side PDF Generator. 
This application converts HTML source code to PDF, and it can also create PDF calling an API Interface.


----------------- Minuimum Code: HTML ==> PDF -----------------

<html>
<script src="CollinsPdf.js"></script>
<Button onclick="CollinsPDF('','<b>Hello World</b>')">CollinsPDF('','<b>Hello World</b>')</Button>

------------------- Minuimum Code: API Interface ------------------

var pdf = new CollinsPDF();
pdf.placeText(0,0,'Hello World')
pdf.show(); // or pdf.download();
