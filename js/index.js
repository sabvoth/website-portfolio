// Index.js
// by Sabrina Voth
// Why are you looking in here?


$(document).ready(function(){
    initPage();

    $("#sv-nav").on("click", ".sv-nav-item", navToggle);

});


//Presents portfolio data on init
function initPage(){
    startPorfolioDisplay([]);
}

function startPorfolioDisplay(tags){
    $("#sv-bucket .sv-bucket-item:not(#sv-bucket-templateitem)").remove();
    $("#sv-nav .sv-nav-item:not(#sv-nav-templateitem)").remove();

    getLocalData(function(data){
        displayPortfolio(tags, data);
    });
}

// Gets and displays portfolio based on tags
// tags is expected to be a string array
function displayPortfolio(tags, portfolioData){
    console.log(portfolioData);

    for(var x in portfolioData.items){
        var showItem = false;

        if(tags.toString().length > 1){
            showItem = compareTagArray(portfolioData.items[x].tags, tags);
        }
        else showItem = true;

        if(showItem){
            var item = $("#sv-bucket-templateitem").clone().appendTo("#sv-bucket").removeAttr('id');
            item.find(".card-title").text(portfolioData.items[x].name);
            //TODO: handlers for every type of portfolio item
            switch(portfolioData.items[x].type){

                case "text" :
                    item.addClass("col-md-3");
                    item.find(".card-title").after("<h6 class='card-subtitle mb-3'>by " + portfolioData.items[x].author + "</h6>");
                    break;
                case "info":
                    item.addClass("col-md-4");
                    break;
                case "img":
                    item.addClass("col-md-4");
                    item.find(".carousel-inner").append("<div class='carousel-item active'><img class='d-block w-100' src='" + portfolioData.items[x].uri +"' alt='" + portfolioData.items[x].name  + "'></div>");
                    break;
                case "file":
                    item.addClass("col-md-4");
                    item.find(".carousel-inner").append("<div class='carousel-item active'><div class='sv-filetype'><a  target='_blank' href='" + portfolioData.items[x].uri + "'>"+ portfolioData.items[x].filetype + "<div>click to download</div></a></div></div>");
                    break;
                case "proj":
                    item.addClass("col-md-6");
                    item.find(".carousel-inner").append("<div class='carousel-item active'><img class='d-block w-100' src='" + portfolioData.items[x].uri +"' alt='" + portfolioData.items[x].name  + "'></div>");
                    for(var y in portfolioData.items[x].content){
                        //This does make me very sad.
                        item.find(".carousel-inner").append("<div class='carousel-item'><img class='d-block w-100' src='" +  portfolioData.items[x].content[y].uri + "' alt='"+ portfolioData.items[x].content[y].name  + "'><div class='carousel-caption d-none d-md-block'><p>" + portfolioData.items[x].content[y].desc + "</p></div></div>");
                    }
                    break;
            }
            item.find(".card-text").html(portfolioData.items[x].htmlcontent);


            //Overriding default behaivour that requires ID href, for some dumb reason
            item.find(".carousel-control-prev").on("click", function(){
                $(this).parent().carousel("prev");
            })
            item.find(".carousel-control-next").on("click", function(){
                $(this).parent().carousel("next");
            })


            //Cleanup the carousel after all images have been added
            if(item.find(".carousel-item").length <= 0){
                item.find(".carousel").remove();
            }
            else if(item.find(".carousel-item").length == 1){
                item.find(".carousel-control-prev").remove();
                item.find(".carousel-control-next").remove();
            }

            for(var y in portfolioData.items[x].tags){

                if(!($("#sv-nav").find(".sv-nav-item").filter(function(){
                    return this.innerText === portfolioData.items[x].tags[y];
                }).length > 0)) {
                    var item = $("#sv-nav-templateitem").clone().appendTo("#sv-nav").removeAttr('id');
                    item.text(portfolioData.items[x].tags[y]);
                    if($("#sv-nav").data("activetags").split(",").includes(portfolioData.items[x].tags[y])){
                        item.addClass("sv-nav-activeitem");
                    }
                }
            }

        }
    }
}

// Takes two tag arrays and returns true if the target contains any of the src tags
function compareTagArray(targ, src){
    var res = false;
    for(var x = 0; x < src.length; x++){
        if(targ.includes(src[x])){
            res = true;
        }
    }
    return res;
}

function navToggle(){
    var activetags = $("#sv-nav").data("activetags").split(',');
    var tagName = $(this).text();

    if(activetags.includes(tagName)){
        activetags = activetags.filter(function(item) {
            return item !== tagName
        })
    }
    else activetags.push(tagName);

    $("#sv-nav").data("activetags", activetags.toString());

    startPorfolioDisplay(activetags);
}

// Grabs server stored portfolio data file
function getLocalData(callback){
    var returnData;
    $.ajaxSetup({ async: false});

    jQuery.getJSON("./res/data.json", function(data){
        returnData = data;
    });
    $.ajaxSetup({ async: true});

    callback(returnData);
}
