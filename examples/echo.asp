<%@ language=jscript %>
<%
try
{
	Response.Expires = -1
	execute();
}
catch (e) { if (typeof(e) == 'object') 
			       { Response.Write("|Error=" + e.message);}
			  else { Response.Write("|Error=" + e); } 
			  Session.Abandon();
			  throw e;
        }

//=============================================================
//						execute
//=============================================================
function execute()
{
	var data, BinaryData, command, type, ext, size;
	var stream, chunkSize, bytesLeft;

	var command = '' + Request.QueryString('command');
	command = command.toLowerCase();

    try {

        if (command == 'keep')
        {
            size = Request.TotalBytes;
            stream = Server.createObject("adodb.stream")
            stream.type = 1; // adTypeBinary
            stream.mode = 3; // adModeReadWrite
            stream.open();

            chunkSize = 48000;
            bytesLeft = size;

            while (bytesLeft > 0) {
                if (bytesLeft < chunkSize) chunkSize = bytesLeft;
                stream.Write(Request.BinaryRead(chunkSize));
                stream.Position = stream.size;
                bytesLeft = bytesLeft - chunkSize;
            }

            stream.Position = 0;
            Response.Write(stream.size);
            data = stream.Read(stream.size);
            stream.Close();
            Session('myData') = data;
            return;

        }
        if (command == 'get')
        {
            data = Session('myData');
            type = '' + Request.QueryString('type');
            ext = 'txt';
            if (type.toLowerCase() == 'application/pdf') ext = 'pdf';
            Response.ContentType = type + "; charset=ISO-8859-1";
            Response.AddHeader("content-disposition", "inline; filename=sample." + ext);
            Response.BinaryWrite(data);
            Session.Abandon();
            return;
        }
    }
    catch (e) { }
}
%>