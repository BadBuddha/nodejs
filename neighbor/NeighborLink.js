var file = require("../utils/FileReader/FileReader.js").File;
var mapLoop = new Map();
var hostProperties = new Map();
var hostInfo = new Map();
var allHostInfo = new Map();
var arrayDsu = new Array();

function Neighborlink(){
    var neighborlinkFileName = "/thales/data/neighborlink.dat";
    file.setFileName(neighborlinkFileName);
}

Array.prototype.contains = function(elem)
{
    for (var i in this)
    {
        console.log("var i " + i);
        console.log("this[i] " + this[i]);
        if (this[i] == elem) return true;
    }
    return false;
}

//

Neighborlink.prototype.findLoopData = function (req, res){
    req = req.replace(/\n+/g, " ");
    var replaced = req.split(/# # Beginning of loop /g);
    for(var i = 0; i < replaced.length; i++){
        var loop = replaced[i].charAt(0);
        if ( (/[A-Z]/).test(loop) ){
            mapLoop.set(loop, replaced[i]);
        }
   }
   var allHosts = new Map();
   Neighborlink.prototype.getHostsByLoop(mapLoop, allHosts);
};

// divide hosts in a loop with deliminator as ';'

Neighborlink.prototype.getHostsByLoop = function(req, res){
    //console.log(req.get('A'));
    var loopIdi = 0;
    req.forEach(function (loopInfo, loopId) {
        loopIdi = loopId;
        //console.log("\n\n"+ value.split(";"));
        var loopInfoHosts = loopInfo.split(";");
        //var reNeighborName = new RegExp("neighborname.*=.*\"(.*)\",");
        var reHostName = /hostname.*?=.*?\"(.*?)\",?/i;
        var reNeighborName = /neighborname.*?=.*?\"(.*?)\",/i;
        var reHostPortId = /hostPortId.*?=.*?([0-9][0-9]?),/i;
        var reNeighborPortId = /neighborPortId.*?=.*?([0-9][0-9]?)/i;
        var loopHostsArray = new Array();

        for(var i = 0; i < loopInfoHosts.length-1; i++){
            var line = loopInfoHosts[i];
            // console.log("line = " + line);
            var neighborName = reNeighborName.exec(line);
            var hostName = reHostName.exec(line);
            var hostPortId = reHostPortId.exec(line);
            var neighborPortId = reNeighborPortId.exec(line);
            var hostInfo = new Map();
            if (neighborName && hostName && hostPortId && neighborPortId){
                //console.log("\n\nhostname = " + hostName[1]);
                // console.log("neighborname = " + neighborName[1]);
                // console.log("hostPortId = " + hostPortId[1]);
                // console.log("neighborPortId = " + neighborPortId[1]);
                hostInfo.set("hostName", hostName[1]);
                hostInfo.set("neighborName", neighborName[1]);
                hostInfo.set("hostPortId", hostPortId[1]);
                hostInfo.set("neighborPortId", neighborPortId[1]);
                //console.log("hostInfo : " + hostInfo.get("hostName"));
            }
            loopHostsArray.push(hostInfo);
        }
        allHostInfo.set(loopIdi, loopHostsArray);
        //console.log("loopIdi : " + loopIdi);
    });

    allHostInfo.forEach(function (loopInfo, loopId) {
        //console.log("Loop : " + loopId + " has Lrus : " + loopInfo.length );

        loopInfo.forEach(function(value, key){
            value.forEach(function(values, keys){
                //console.log(keys + ": " + values);
                if(keys == "hostName" && values.includes("DSU")){
                    if (arrayDsu.indexOf(values)==-1){
                        console.log ("DSU found :" + values);
                        arrayDsu.push(values);
                    }
                }
            });
            // console.log("\n");
            // console.log("key [" + key + "]" + value.get("hostName"));
            // console.log("key [" + key + "]" + value.length);
         });
        //console.log("hostInfo : " + loopInfo);
    });
    console.log("Number of DSUs : " + arrayDsu.length);

    //value = req.get('F');

};







var neighbor = new Neighborlink();
// getContents calls findLoopData as the callback with neighborlink.dat contents
file.getContents(null, neighbor.findLoopData);
//module.exports = File;
