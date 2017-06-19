$(document).ready(function () {

    var height = sessionStorage.getItem('f');
    
    function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var widthfrmUrl = getParameterByName("width");
var heightfrmUrl = parseInt(getParameterByName("height"));
if(heightfrmUrl){
height = heightfrmUrl-80;
}
    var options = {
        container: "#example",
        header: "MY CASE DIARY",
        uri: "data/data.json",
        height: height
    }
    groupedColumn(options);

});
function groupedColumn(options)
{
    var columnData = [];
    loadgroupedColumnChart(options);
//responsivenss
    $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();

            if ($(options.container).find(".switchChartDiv").find('input[type=radio][name=mode]:checked')) {
                options.groupedStacked = $(options.container).find(".switchChartDiv").find('input[type=radio][name=mode]:checked').val()
            }
            $(options.container).empty();
            new groupedColumChart(options);
        }
    })

    function loadgroupedColumnChart(options) {
        d3.json(options.uri, function (error, data) {
            columnData = handleData(data, "model", "", "bar");
            options.data = columnData;
            var exampleChart = new groupedColumChart(options);

        });
    }
//--------------------------------------------------------------------------------------------------------------
    /**
     *Function to handle data
     */
    function handleData(data, x, y, type) {
        var str = JSON.stringify(data);
        str = str.replace(/model/g, 'x');
        var object = JSON.parse(str);

        return object;
    }
}

