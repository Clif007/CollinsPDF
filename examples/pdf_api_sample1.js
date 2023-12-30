//========================================================================================
//				CollinsPDF API Example
//
//	This example creates a 200 page PDF document (%100 Client Side Generated)
//
//	A very simple example: draw a table grid (30 rows by 15 columns)
//	add some text to each cell, repeated on 200 pages 
//	time: IE11 = 7.5 seconds,   Chrome,FireFox 4.3 seconds
//
//	using HTML to PDF take 33 minutes, table calculations are complex (not optimized) 
//	for smaller PDF and complex formatting, the HTML to PDF is a better option
//	example: CollinsPDF('','<center><b>Hello World</b></center>');
//
//	see: http://CollinsSoftware.com/CollinsPDF/PDF_Spec.htm 
//
//	pdf API functions used:
//	toString, placeText, placeGrid, setLandscape, pageBreak;
//		
//			*** You can edit this text ***
//=========================================================================================

	var pdf = new myPdf(200,onComplete);

//=========================================================================================
//				onComplete
//=========================================================================================
function onComplete()
{
	var pdf,end,duration,duration1,text;

	if (! window.myTime)
	{
		window.myTime = document.createElement('div');
		window.myTime.style.position = 'absolute';
		window.myTime.style.left = '200px';
		window.myTime.style.top = '300px';
		window.myTime.style.width = '300px';
		window.myTime.style.height = '110px';
		window.myTime.style.backgroundColor = 'navy';
		window.myTime.style.color = 'white';
		window.myTime.style.padding = '10px';
		window.myTime.style.border = 'thick double white';
		window.myTime.style.boxShadow = '15px 15px 50px gray';
		window.myTime.style.borderRadius = '10px 10px';

		document.body.appendChild(window.myTime);
	}

	end = new Date();
	duration1 = (end - this.start) / 1000;

	text = this.pdf.toString();
	this.stringToFile(text,'sample.pdf');

	end = new Date();
	duration = (end - this.start) / 1000;
	window.myTime.style.display = '';
	window.myTime.innerHTML = 
	'<table style="font-family:arial;color:white;width:300px">' +
	'<tr><td align=center style="color:cornsilk;padding:10px" colspan=2><b>PDF file created</b></td></tr>' +
	'<tr><td align=right style="padding-right:30px">Load Time    </td><td>' + F(duration1)		+ ' seconds</td></tr>' +
	'<tr><td align=right style="padding-right:30px">Compile Time </td><td>' + F(duration - duration1)	+ ' seconds</td></tr>' +
	'<tr><td align=right style="padding-right:30px">Total Time   </td><td>' + F(duration)		+ ' seconds</td></tr>' +
	'</table>';
	if (window.myProgress) window.myProgress.style.display = 'none';
	setTimeout(turnoff_myTime,6 * 1000);
	return;

	function F(value) { return  Math.round(value * 100) / 100.0; };
	function turnoff_myTime() { window.myTime.style.display = 'none'; }
}

//=======================================================================
//			myPdf
//	object constructor. Auto generates sample PDF
//=======================================================================
function myPdf(pageCount,onComplete)
{
	var obj,div;

	this.start = new Date();


	this.rowData = 'Hello World,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14'.split(',');
	this.rowCounter = 0;

	this.pageCount = pageCount;
	this.currentPage = 0;

	this.onComplete = onComplete.bind(this);

	obj = new CollinsPDF$();
	obj.make.newPdf(obj.make.sys);

	this.pdf = obj.make.pdf;
	this.pdf.setLandscape(true);		// 11 by 8.5 Inches (origin top left)

	this.url = '';
	this.angle = 0;
	this.just = '';
	
//	coordinates are in inches (origin: top left)

	this.x1 = .25;
	this.y1 = 1;
	this.x2 = 11 - .25;
	this.y2 = 8.5 - 1.25;

	this.xg2 = this.x1 + 1.5;
	this.xg1 = this.x1;
	this.cols = 15;
	this.rows = 30;

	this.rowSize = (this.y2 - this.y1) / this.rows;
	this.colSize = (this.x2 - this.xg2) / (this.cols - 1);

	this.placePage		= myPdf$placePage;
	this.placeRow		= myPdf$placeRow;
	this.stringToFile	= myPdf$stringToFile;

	this.placePage_again	= this.placePage.bind(this);

	if (! window.myProgress)
	{
		div = document.createElement('div');
		div.innerHTML = '<div id="myProgress" style="width:320px;height:72px;background-color:navy;position:absolute;left:100px;top:100px;display:none;border-radius:10px 10px">' + 
				'<div id="myProgressTitle" style="width:320px;color:white;font-family:arial;padding-left:10px;padding-top:6px;"></div>' + 
				'<div id="myProgressBar" style="font-size:10pt; overflow:hidden; font-family:arial; margin:10px; width:150px;height:15px;background-color:white;"></div>' +
				'</div>';
		document.body.appendChild(div);
	}

	this.placePage();	// generate the PDF document

	return;
	
//=================================================================
//			myPdf$placePage
//	create a new PDF page with content
//=================================================================
function myPdf$placePage()
{
	var i,j,title,percent,x,y,dy,cx,fst;

//------------------ no more pages ----------------

	if (this.currentPage >= this.pageCount)
	{
		myProgressBar.innerHTML = 'STAND BY compiling PDF (5 to 40 seconds)...';
		setTimeout(this.onComplete,100);
		return;
	}
	
//--------------------page header ---------------

	this.currentPage += 1;
	if (this.currentPage > 1)  this.pdf.pageBreak(true);

	x = .3;
	y = .3;
	dy = .2;
	title = 'Page ' + this.currentPage + ' of ' + this.pageCount;
	this.pdf.placeText(x,y,title,this.url,this.angle,this.just);
	this.pdf.placeText(this.x2,y,'Created by CollinsPDF','http://CollinsSoftware.com/CollinsPDF/index.htm',this.angle,'LR');
	if (this.currentPage == 1) this.pdf.placeText(x,y+dy,new Date(),this.url,this.angle,this.just);

//---------------- table header -----------------

	x = this.x1;
	y = this.y1 - .07;
	
	this.pdf.setBold(true);
	cx = (this.xg2 + this.xg1) / 2;
	this.pdf.placeText(cx,y,'Name','',0,'LC');

	cx = this.xg2 + (this.colSize / 2);
	for (j=2; j <= this.cols; ++j)
	{
		name = 'C' + j;
		this.pdf.placeText(cx,y,name,'',0,'LC');
		cx += this.colSize;		
	}
	
//------------------- table ---------------------

	y = this.y1;
	dy = this.rowSize;
	this.pdf.setBold(false);
	
	fst = parseInt(this.rowData[1]);
		
	for (j = 1; j <= this.rows; ++j) 
	{
		if (j % 2 == 1) this.pdf.setGraphicFillColor('LightBlue'); else this.pdf.setGraphicFillColor('');

		this.pdf.drawGrid(this.xg1,y,this.xg2,y+dy,1,1);		// column 1	
		this.pdf.drawGrid(this.xg2,y,this.x2,y+dy,1,this.cols-1);	// columns 2 to 15
		this.rowData[1] = j + fst;
		this.placeRow(this.rowData,j);
		y += this.rowSize;
	}

//------------------- progress bar ------------
	
	myProgressTitle.innerHTML = 'Created Page ' + this.currentPage + ' of ' + this.pageCount;
	myProgress.style.display = '';
	percent = (this.currentPage / this.pageCount);
	myProgressBar.style.width = (300 * percent) + 'px';
	
	setTimeout(this.placePage_again,1);

}
//=================================================================
//			myPdf$placeRow
//	fill in a row of text
//=================================================================
function myPdf$placeRow(rowData,row)
{
	var xpos,ypos,i;

	xpos = this.x1 + .125;
	ypos = this.y1 + (row * this.rowSize) - .05;

	this.pdf.placeText(xpos,ypos,rowData[0],'',0,'LL');		// lower left justified (col 1)

	xpos = this.xg2 + this.colSize - .05;

	for (i=1; i < rowData.length; ++i)
	{
		this.pdf.placeText(xpos,ypos,rowData[i],'',0,'LR');	// lower right justified (cols 2 to 15)
		xpos += this.colSize;			
	}
}
//===================================================================
//			myPdf$stringToFile
//	support routine to save PDF to your download folder
//===================================================================
function myPdf$stringToFile(text, filename) 
{
	var blob, url, builder;

	if (typeof (window.saveElement) != 'object')
	{
		window.saveElement = document.createElement('a');
		saveElement.style.display = 'none';
		document.body.appendChild(saveElement);
	}
	try {
		blob = new Blob([text])
//		blob.type = 'text/plain'
	}
	catch (e) {
		builder = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)
		if (!builder) // Safari
		{
			saveElement.href = 'data:text/plain,' + encodeURIComponent(text);
			fireEvent(saveElement, 'click');
			return;
		}

		blob = new builder;
		blob.append(text);
		blob = blob.getBlob('text/plain');
	}

	if (window.navigator.msSaveBlob) return window.navigator.msSaveBlob(blob, filename);

	url = (window.URL || window.webkitURL).createObjectURL(blob)
	saveElement.href = url;
	saveElement.download = filename;
	saveElement.click()

	//---------------------- fireEvent --------------------

	function fireEvent(element, event) {
		var e;
		if (document.createEvent) {
			e = document.createEvent('MouseEvents');
			e.initEvent(event, true, false);
			element.dispatchEvent(e);
		}

		if (document.createEventObject) element.fireEvent('on' + event);
	}
}
}
