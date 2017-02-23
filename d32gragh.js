$('#make').click(function(){
    var data_set = "./" + $('#file')[0].files[0].name
    console.log(data_set);
    d3.csv(
        data_set, function(data_set){
            var d = data_set;
            console.log(d);
        }
    )
});
