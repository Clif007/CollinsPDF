//============================================================================
//			textarea
//============================================================================
function textarea$(cell)
{
	var edit, row, cell, g, s, w, agent, numberWidth;
	var height, width;

	agent = navigator.userAgent.toLowerCase()
	this.isFirefox = agent.indexOf('firefox') > -1;
	this.isSafari = agent.indexOf('safari') > -1;

	numberWidth = '56px';
	if (this.isFirefox || this.isSafari) numberWidth = '64px'

	this.cell = cell;

	width = this.cell.clientWidth;
	height = this.cell.clientHeight;

	this.modified		= false;

	this.cell.edit = this;
	this.cell.style.overflow = 'hidden';
	this.cell.style.fontSize = '12pt';
	this.cell.style.fontFamily = 'arial';
	this.cell.style.margin = '0px';

	this.cell.innerHTML = '';
	this.cell.resize = textarea$resize.bind(this);
	this.resize = textarea$resize;

	this.table = document.createElement('table');
	this.cell.appendChild(this.table);
	this.table.style.height = '100%';
	this.table.style.width = '100%';
	this.table.style.margin = '0px';
	this.table.style.border = 'none';
	this.table.style.padding = '0px';
	this.table.style.borderSpacing = '0px';
	this.table.style.borderCollapse = 'collapse';
	this.table.style.vertialAlign = 'top';

	row = this.table.insertRow();
	row.valign = 'top';

	this.numberTD = row.insertCell(0);

	this.numberTD.style.width = numberWidth;
	this.numberTD.style.height = '100%';
//	this.numberTD.style.overflow = 'hidden';
	this.numberTD.style.verticalAlign = 'top';
	this.numberTD.style.backgroundColor = '#dfdfdf';

	this.textareaTD = row.insertCell(1);
	this.textareaTD.style.height = '100%';
	this.textareaTD.style.overflow = 'hidden';
	this.textareaTD.style.verticalAlign = 'top';

	this.numbersDiv = document.createElement('div');
	this.numbersDiv.style.overflow = 'hidden';

	this.numberTD.appendChild(this.numbersDiv);

	this.numbers = document.createElement('textarea');
	this.numbers.style.width = numberWidth;
	this.numbers.style.border = 'none';
	this.numbers.style.padding = '0px';
	this.numbers.style.margin = '0px';
	this.numbers.style.marginTop = '0px';
	this.numbers.style.borderSpacing = '0px';
	this.numbers.style.borderCollapse = 'collapse';

	this.numbers.style.backgroundColor = '#f0f0f0';
	this.numbers.style.overflow = 'hidden';

	this.textarea = document.createElement('textarea');
	this.textarea.style.height = '98%';
	this.textarea.style.width = '98%';
	this.textarea.style.padding = '0px';
	this.textarea.style.backgroundColor = '';
	this.textarea.wrap = 'off';
	
	this.numbersDiv.appendChild(this.numbers);
	this.textareaTD.appendChild(this.textarea);

	this.textarea.onkeyup = textarea$onKeydown.bind(this);
	this.textarea.oninput   = textarea$onInput.bind(this);
	this.textarea.onscroll = textarea$onScroll.bind(this);
	this.textarea.onmousewheel = textarea$onScroll.bind(this);
	this.textarea.onmousewheel = textarea$onScroll.bind(this);

	this.countLines		= textarea$countLines;

	this.cell.getValue = textarea$getValue.bind(this);
	this.cell.setValue = textarea$setValue.bind(this);

	this.cell.disable = textarea$disable.bind(this);
	this.cell.enable = textarea$enable.bind(this);

	this.getValue = textarea$getValue;
	this.setValue = textarea$setValue;
	this.disable = textarea$disable;
	this.enable = textarea$enable;

	this.numbers.style.height = height + 'px';

//	s = textarea$setValue.bind(this);
//	Object.defineProperty(this.cell, "value", { get: g, set: s } );
}
//================================================================================================
//		textarea$disable
//================================================================================================
function textarea$disable() 
{
	this.textarea.style.backgroundColor = '#f2e9e3';
	this.textarea.readOnly = true;
}
//================================================================================================
//		textarea$enable
//================================================================================================
function textarea$enable() 
{
	this.textarea.style.backgroundColor = '';
	this.textarea.readOnly = false;

}
//================================================================================================
//		textarea$resize
//================================================================================================
function textarea$resize(width,height) 
{
	this.textarea.style.height = height + 'px';
	this.numbersDiv.style.height = height + 'px';
	this.numbers.style.height = (height - 16) + 'px';
}
//==================================================================================
//				textarea$getValue
//==================================================================================
function textarea$getValue(value) 
{
	return this.textarea.value;
}
//==================================================================================
//				textarea$value
//==================================================================================
function textarea$setValue(value) 
{
	this.textarea.value = value;
	this.textarea.scrollTop = 0;
	this.countLines();
}
//==================================================================================
//				textarea$onKeydown
//==================================================================================
function textarea$onKeydown(e)
{
	var a, b, c, key, ele;

	key = e.which || e.keyCode;

	ele = e.target || e.srcElement;
	this.modified = true;
	if (this.parentOwner) this.parentOwner.modified = true;
	this.countLines();
	return true;

	if (key == 9) {
		ele = e.target || e.srcElement;
		e.preventDefault();

		ele = e.srcElement || e.target;
		a = ele.value.substr(0, ele.selectionStart);
		b = ele.value.substr(ele.selectionEnd);
		c = ele.selectionStart + 1;

		ele.value = a + '\t' + b;
		ele.selectionStart = c;
		ele.selectionEnd = c;
		return false;
	}

	return true;
}
//==================================================================================
//				textarea$onInput
//==================================================================================
function textarea$onInput(event) 
{
	if (this.parentOwner) this.parentOwner.modified = true;
	this.countLines();
}
//==================================================================================
//			textarea$onScroll
//==================================================================================
function textarea$onScroll(event) 
{
	this.numbers.scrollTop = this.textarea.scrollTop;
}
//=====================================================================================
//			textarea$countLines
//=====================================================================================
function textarea$countLines()
{
	var text, count, start, index, data,rows;
	var firstRow,top,h,dx,n,lastRow;

	text = this.textarea.value;
	this.lines = 0;
	start = 0;
	index = 0;

	data = '';
	top = this.textarea.scrollTop;

	while (index >= 0) 
	{
		this.lines += 1;
		start = index + 1;
		index = text.indexOf('\n', start);
		data += right(this.lines) + '\n';
	}

	if (data == '') data = '1';
	this.numbers.value = data;

	function right(line)
	{
		var text;

		text = '' + line;
		if (text.length == 1) return '     ' + text;
		if (text.length == 2) return '    ' + text;
		if (text.length == 3) return '   ' + text;
		if (text.length == 4) return '  ' + text;
		if (text.length == 5) return ' ' + text;
		return text;
	}
}
