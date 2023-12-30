<%@ language=jscript%>
<%
<!-- ************************************************************************
// Receive_Report
// Author: Clif Collins Date: Feb 2012
//
// Copyright (c) 2012 Clifford L. Collins 
// All rights are reserved 
//
//************************************************************************ -->

try
{
Response.Expires = -1

execute();
}
catch (e) { if (typeof(e) == 'object') 
{ Response.Write("|Error=" + e.description + ' ' + e.message); }
else { Response.Write("|Error=" + e); } 
}

//===========================================================
// execute
//===========================================================
function execute()
{
    var i,text;

    Response.Write('<html>\r\n<head><title>' +
                   'Collins Software PDF Form Echo</title></head>\r\n');
    Response.Write('<body bgcolor=LightSteelblue>\r\n'); 
    Response.Write('<font face=arial size=3>\r\n'); 
    Response.Write('<center><a href="http://collinssoftware.com">' +
                   'Collins Software</a> Echo of PDF Form Values\r\n'); 

    Response.Write('<br>\r\n'); 
    Response.Write('<table border=1 cellspacing=0 cellpadding=5>\r\n'); 

    text = '<tr><td width=120 align=center><b>' +
            'Name</b></TD><TD width=300 align=center><b>Value</b></td></tr>\r\n';
    Response.Write(text + '<br>\r\n');

    for (i=1; i <= Request.Form.Count; ++i)
    {
      text = '<tr style="background-color:white"><td align=center>' +
                Request.Form.Key(i) + '</TD><TD>' + Request.Form.Item(i) + 
                '&nbsp;</td></tr>';
      Response.Write(text + '\r\n');
    }

    Response.Write('</table>\r\n'); 
    Response.Write('</body>\r\n</html>');

}
%>

